import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Axis = 'metaphysics' | 'politics' | 'epistemology' | 'technology' | 'humanNature';

interface Answer {
  text: string;
  scores: Partial<Record<Axis, number>>;
}

interface Question {
  text: string;
  answers: Answer[];
}

const QUESTIONS: Question[] = [
  {
    text: "Parlak bir bilim insanı insan ömrünü iki katına çıkarabilecek bir teknoloji keşfediyor, ancak bunun adil bir şekilde dağıtılması için küresel bir yönetim organı gerekiyor. Sizi en çok endişelendiren nedir?",
    answers: [
      { text: "İnsan hayatını optimize edilecek teknik bir sorun olarak görmemiz", scores: { technology: -5 } },
      { text: "Yönetim organının, belirtilen amacı ne olursa olsun kaçınılmaz olarak zalimleşeceği", scores: { technology: -4, politics: -2 } },
      { text: "Erişimin bir komitenin kararına göre kısıtlanmasının bireysel hakları ihlal edeceği", scores: { technology: 4 } },
      { text: "Ömrü uzatmanın, bir hayatı yaşanmaya değer kılan şeyin ne olduğu gibi daha zor bir soruyu sadece ertelediği", scores: { technology: -4 } }
    ]
  },
  {
    text: "İki tarihçi tartışıyor. Biri, büyük kitapların yalnızca dikkatli okuyucular için gizli öğretiler içerdiğini söylüyor. Diğeri ise anlayışın, insanlık kolektif olarak ilerledikçe yüzyıllar boyunca geliştiğini söylüyor. İçgüdüsel olarak kimin tarafını tutarsınız?",
    answers: [
      { text: "Birincisi — en derin gerçekler her zaman kısmen gizlenmiştir ve iyi okumak çok az kişinin ustalaştığı bir sanattır", scores: { epistemology: -5 } },
      { text: "İkincisi — her nesil bir öncekinden gerçekten daha fazlasını anlar; ilerleme tam olarak budur", scores: { epistemology: 5 } },
      { text: "İkisi de kısmen haklı, ancak gizli anlamların anahtarına sahip olduğunu iddia eden herkesten şüphe duyarım", scores: { epistemology: 2 } },
      { text: "Hiçbiri — anlam keşfedilmez veya ortaya çıkarılmaz, onu dayatacak güce sahip olan kişi tarafından yaratılır", scores: { epistemology: -2, metaphysics: 2 } }
    ]
  },
  {
    text: "Bir arkadaşınız şöyle diyor: 'Hayatımla ne yapmam gerektiğini bilmiyorum.' İlk içgüdünüz nedir?",
    answers: [
      { text: "Herkesin bir doğası ve doğal kapasiteleri vardır — asıl görev sizinkilerin ne olduğunu keşfetmek ve onları geliştirmektir", scores: { humanNature: -5 } },
      { text: "Yapman 'gereken' hiçbir şey yok. Seçersin, adanırsın ve hayatına şekil veren şey bu seçimdir", scores: { humanNature: 5 } },
      { text: "Tarihin ve durumunuzun sizden ne talep ettiğine bakın — amaç, daha büyük hikayedeki yerinizden gelir", scores: { humanNature: 2 } },
      { text: "İçe bakmayı bırakın ve etrafınızdaki dünyada gerçekten neyin yapılması gerektiğine bakmaya başlayın", scores: { humanNature: -4 } }
    ]
  },
  {
    text: "Yakın bir arkadaşınız, yanlış yönlendirildiğini düşündüğünüz siyasi bir harekete derinden dahil oldu. Tutkulu, samimi ve giderek ulaşılamaz hale geliyorlar. Gerçekte ne olduğunu düşünüyorsunuz?",
    answers: [
      { text: "Düşünmeyi bırakıp inanmaya başladılar. Hareket, felsefenin yerini ideolojiyle değiştirdi", scores: { politics: -5 } },
      { text: "Ana akımın ele almaktan korktuğu gerçek bir şey buldular. Belki de daha dikkatli dinlemeliyim", scores: { politics: -4 } },
      { text: "Herkesin kendi siyasi taahhütlerine sahip olma hakkı vardır. Yargılamak bana düşmez", scores: { politics: 5 } },
      { text: "Tarih böyle ilerler — herkesi ileriye veya geriye sürükleyen tutkulu azınlıklar aracılığıyla", scores: { politics: 2 } }
    ]
  },
  {
    text: "Yozlaşmış ama etkili bir hükümet, bir ülkeye 20 yıl boyunca refah ve istikrar getirdi. Onun yerini almak için demokratik bir hareket yükseliyor. Geçiş neredeyse kesinlikle ekonomik çöküşe ve yıllarca sürecek istikrarsızlığa neden olacak. Sizin duruşunuz nedir?",
    answers: [
      { text: "Demokratik hareketi destekleyin. Bedeli yüksek olsa bile meşruiyet sonuçlardan daha önemlidir.", scores: { politics: 5 } },
      { text: "Mevcut hükümeti koruyun. İstikrar ve refah, gücün nasıl elde edildiğinden daha önemlidir.", scores: { politics: -5 } },
      { text: "Sorunun kendisi sahte bir seçimi ortaya koyuyor. Gerçekten bilge bir lider, devrim olmadan reform yapmanın bir yolunu bulurdu.", scores: { politics: -3 } },
      { text: "İki tarafın da doğru cevabı yok. Tarih karar verecek ve ortaya çıkacak olan şey, halkın gerçekten inşa etme gücüne sahip olduğu şey olacaktır.", scores: { politics: 2, metaphysics: 3 } }
    ]
  },
  {
    text: "Yapay zeka sistemleri artık şiir yazıyor, müzik besteliyor ve insan işinden ayırt edilemeyen sanat eserleri üretiyor. Nasıl hissediyorsunuz?",
    answers: [
      { text: "Huzursuz. İnsan yaratıcılığına dair temel bir şey hesaplamaya indirgeniyor", scores: { technology: -5 } },
      { text: "Heyecanlı. Bunlar, henüz hayal edemediğimiz yaratıcı olasılıkların kilidini açacak araçlar", scores: { technology: 5 } },
      { text: "'Dahi' dediğimiz şeyin hiçbir zaman mistik olmadığını kanıtlıyor — başından beri sadece örüntü ve eğitimdi", scores: { technology: 4 } },
      { text: "Sanatın kendisi değişmez. Güzel bir şiir, kökeni ne olursa olsun güzeldir", scores: { technology: -2 } }
    ]
  },
  {
    text: "Kimse düşünmeden önce de doğru olan bir gerçek diye bir şey var mıdır?",
    answers: [
      { text: "Evet — matematiksel ve ahlaki gerçekler insan zihninden bağımsız olarak var olur", scores: { metaphysics: -5 } },
      { text: "Hayır — gerçek, insanların dil, güç ve yorumlama yoluyla yarattığı bir şeydir", scores: { metaphysics: 5 } },
      { text: "Gerçek vardır, ancak tarihsel olarak ortaya çıkar — yalnızca biz ona hazır olduğumuzda bize ulaşabilir hale gelir", scores: { metaphysics: 2 } },
      { text: "Sorunun kendisi gerçeklerden çok soran kişi hakkında bilgi veriyor. Bu sizin için neden önemli?", scores: { metaphysics: 3 } }
    ]
  },
  {
    text: "Olağanüstü müzik yeteneğine sahip genç bir insan, acilen bir doktora ihtiyaç duyan küçük bir toplulukta doğar. Tıp fakültesi mevcuttur; müzik konservatuarı ise yoktur. Ne yapmalıdır?",
    answers: [
      { text: "Tıp okumalıdır. Yetenekleriniz sizi yetiştiren topluluğa hizmet etmek için vardır. İnsani mükemmelliğin asıl anlamı budur.", scores: { humanNature: -5 } },
      { text: "Ne pahasına olursa olsun müziğin peşinden gitmenin bir yolunu bulmalıdır. Başkalarının beklentilerini karşılamak için en derin yeteneğinizi feda etmek, kendinize ihanettir.", scores: { humanNature: 5 } },
      { text: "Şimdilik tıp okumalıdır, ama çalmayı asla bırakmamalıdır. Hayat her ikisi için de yeterince uzundur.", scores: { humanNature: -2 } },
      { text: "Tüm çerçeveleme yanlış. Topluluk neden bir kişinin kariyer seçiminin krize yol açacağı kadar küçük? Sistemi düzeltin.", scores: { humanNature: 2, technology: 2 } }
    ]
  },
  {
    text: "Güçlü birine — bir CEO'ya, bir başkana, binlerce insanın hayatını şekillendiren birine — tavsiyede bulunuyorsunuz. Anlamalarını isteyeceğiniz en önemli şey nedir?",
    answers: [
      { text: "Açıkça söyleyebilecekleri ile özel olarak düşünmeleri gerekenler arasındaki fark. Her gerçeği söylemek güvenli değildir", scores: { epistemology: -5 } },
      { text: "Güçlerinin ancak yönettikleri kişiler buna rıza gösterirse meşru olduğu. Geri kalan her şey zorbalıktır", scores: { epistemology: 4 } },
      { text: "Her kararın insan doğasına dair bir anlayışı ortaya çıkardığı — ve çoğu liderin kendi anlayışını hiç sorgulamadığı", scores: { epistemology: -4 } },
      { text: "Dünyayı şekillendiren güçlerin herhangi bir bireyden daha büyük olduğu. Asıl soru, dalgayı sürüp süremeyecekleri veya altında ezilip ezilmeyecekleridir", scores: { epistemology: 5 } }
    ]
  },
  {
    text: "İki filozof tartışıyor. Biri şöyle diyor: 'Adalet, kimse kabul etse de etmese de her yerde ve her zaman aynıdır.' Diğeri ise şöyle diyor: 'Adalet, en güçlü topluluğun ne olduğuna karar verdiği şeydir — her medeniyetle birlikte değişir.' Kim haklı?",
    answers: [
      { text: "Birincisi. Herhangi bir kültürün ne dediğinden bağımsız olarak bazı şeyler doğru veya yanlıştır. Aksi takdirde kölelik veya soykırım eleştirisi sadece kültürel bir tercihtir.", scores: { metaphysics: -5 } },
      { text: "İkincisi. Her medeniyet adaleti farklı tanımlar ve hiçbiri evrensel otorite iddia edemez. Aksini düşünmek emperyalist bir kibirdir.", scores: { metaphysics: 5 } },
      { text: "İkisi de kısmen haklı. Evrensel ilkeler olabilir, ancak bunlar her zaman belirli kültürler aracılığıyla kendini gösterir.", scores: { metaphysics: -2 } },
      { text: "Tartışmanın kendisi bir güç oyunudur. Kim kazanırsa, diğer herkesin yaşayacağı kuralları o belirler.", scores: { metaphysics: 3 } }
    ]
  }
];

const DIMENSIONS: Record<Axis, { name: string; poleA: string; poleB: string; descA: string; descB: string; descMixed: string }> = {
  metaphysics: {
    name: "Metafizik",
    poleA: "Platoncu",
    poleB: "Nietzscheci",
    descA: "Gerçeğin insan fikrinden bağımsız olarak var olduğuna inanıyorsunuz. Ahlaki, matematiksel, doğal şeylerin gerçek bir düzeni vardır ve bizim görevimiz onu icat etmek değil, keşfetmektir. Platon'dan Skolastiklere ve Strauss'a uzanan felsefi gelenek, kendinizi evinizde hissettiğiniz yerdir.",
    descB: "Gerçeği bulunan değil, yaratılan bir şey olarak görüyorsunuz. 'Gerçeklik' dediğimiz şey irade, dil ve güç tarafından şekillendirilir. Sabit özler yanılsamadır. Nietzsche, Foucault ve metafizik sonrası gelenek sizin dilinizi konuşuyor.",
    descMixed: "Gerçeğin bağımsız olarak var olduğuna inanmak ile insan perspektifi tarafından şekillendirildiğinden şüphelenmek arasındaki gerilimde yaşıyorsunuz. Kalıcılığa ilgi duyuyorsunuz ancak yorumlamanın yaratıcı gücünü de tamamen göz ardı edemiyorsunuz.",
  },
  politics: {
    name: "Siyaset",
    poleA: "Klasik",
    poleB: "Liberal",
    descA: "Klasik soruya ilgi duyuyorsunuz: En iyi rejim hangisidir? Siyasi düzenin sadece bireysel tercihleri değil, doğal hiyerarşiyi, erdemi ve ortak iyiyi yansıtması gerektiğini düşünüyorsunuz. Aristoteles, Platon ve klasik siyaset felsefesi geleneği sizinle yankı buluyor.",
    descB: "Bireysel haklara, usule ilişkin adalete ve yönetilenlerin rızasına öncelik veriyorsunuz. Siyasi bir düzenin meşruiyeti, erdem veya doğal rütbe iddialarından değil, özgürlüğü korumaktan gelir. Locke'tan Amerikan kurucularına uzanan gelenekte düşünüyorsunuz.",
    descMixed: "Hem en iyi rejimle ilgili klasik soruya hem de bireysel haklara yapılan liberal vurguya değer veriyorsunuz. Hem hiyerarşide hem de usulde değer görüyorsunuz — ve her ikisine de tamamen bağlı olan herkesten şüphe duyuyorsunuz.",
  },
  epistemology: {
    name: "Epistemoloji",
    poleA: "Straussçu",
    poleB: "Hegelci",
    descA: "En derin düşünürlerin genellikle gerçek öğretilerini gizlediklerine inanıyorsunuz. İyi okumak, satır aralarını okumak demektir. Büyük kitaplar ezoterik ve ekzoterik katmanlar içerir ve çoğu insan sadece yüzeyi görür. Leo Strauss ve dikkatli okuma sanatı yaklaşımınızı tanımlıyor.",
    descB: "Bilgiyi tarihsel olarak ilerici görüyorsunuz. Her dönem bir öncekinin üzerine inşa edilir. Gerçek gizli değildir — diyalektik gelişim yoluyla zamanla ortaya çıkar. Hegel, Marx ve tarihselci gelenek, anlamayı nasıl düşündüğünüzü yakalar.",
    descMixed: "Dikkatli okumayı ve gizli anlamları takdir ediyorsunuz, ancak aynı zamanda anlayışın zamanla gerçekten geliştiğini de kabul ediyorsunuz. Ne saf Straussçuluk ne de saf tarihselcilik sizi tam olarak ikna etmiyor.",
  },
  technology: {
    name: "Teknoloji",
    poleA: "Heideggerci",
    poleB: "Prometheci",
    descA: "Teknolojik zihniyetten şüphe duyuyorsunuz. Her şey optimize edilecek bir kaynak haline geldiğinde, insan deneyiminin temel bir yönü kaybolur. Heidegger'in 'çerçeveleme' eleştirisi — teknolojinin dünyayı nasıl bir yedek kaynağa indirgediği — sizinle derinden yankı buluyor.",
    descB: "Teknolojiyi kurtuluş olarak görüyorsunuz. İnsan zekası en büyük gücümüzdür ve inşa etme, yaratma ve doğal sınırları aşma dürtüsü bizi biz yapan şeydir. Bacon'dan transhümanistlere uzanan Prometheci gelenek içgüdülerinize hitap ediyor.",
    descMixed: "Teknoloji konusunda hem temkinli hem de heyecanlı hissediyorsunuz. Her şey optimizasyona dönüştüğünde bir şeylerin kaybolduğunu hissediyorsunuz, ancak insan zekasının gerçek gücünü de inkar edemezsiniz.",
  },
  humanNature: {
    name: "İnsan Doğası",
    poleA: "Aristotelesçi",
    poleB: "Varoluşçu",
    descA: "İnsanların bir doğası — bir telos'u, doğal bir amacı — olduğuna inanıyorsunuz. Ne olduğumuza uygun yaşadığımızda, kapasitelerimizi mükemmelliğe doğru geliştirdiğimizde gelişiriz. Aristoteles'in etiği ve doğal hukuk geleneği, iyi bir hayatın neye benzediğine dair görüşünüzü yakalar.",
    descB: "Varoluşun özden önce geldiğine inanıyorsunuz. Sabit bir doğa ile doğmuyoruz — kendimizi seçimler ve taahhütler yoluyla yaratıyoruz. Özgürlük ve özgünlük, önceden belirlenmiş bir amacı yerine getirmekten daha önemlidir. Sartre, Kierkegaard ve Heidegger'in varoluşsal analitiği sizin alanınızdır.",
    descMixed: "İnsanların geliştirilmeye değer doğal kapasiteleri olduğundan şüpheleniyorsunuz, ancak aynı zamanda özgürlüğün ve kendini yaratmanın da önemli olduğuna inanıyorsunuz. Amacımızı keşfedip keşfetmediğimiz veya icat edip etmediğimiz sorusu sizin için gerçekten açık kalıyor.",
  }
};

const TOOLTIPS: Record<string, string> = {
  'Platoncu': "Platon'u takip eder — fikrin ötesindeki kalıcı gerçeklere inanır",
  'Nietzscheci': "Nietzsche'yi takip eder — gerçeği keşfedilen değil, insan iradesiyle yaratılan bir şey olarak görür",
  'Klasik': "Antik Yunan geleneği — siyaset erdemi ve ortak iyiyi hedeflemelidir",
  'Liberal': "Locke'tan günümüze modern gelenek — siyaset bireysel hakları korumalıdır",
  'Straussçu': "Leo Strauss'u takip eder — büyük düşünürler gerçek öğretilerini satır aralarına gizler",
  'Hegelci': "Hegel'i takip eder — bilgi tarih boyunca gelişir, her dönem bir öncekinin üzerine inşa edilir",
  'Heideggerci': "Heidegger'i takip eder — teknoloji dünyayı görme biçimimizi genellikle tehlikeli bir şekilde değiştirir",
  'Prometheci': "İnsan zekasını ve doğal sınırların ötesinde inşa etmeyi kutlayan gelenek",
  'Aristotelesçi': "Aristoteles'i takip eder — insanların bir doğası vardır ve onu geliştirerek gelişirler",
  'Varoluşçu': "Kendimizi seçimlerimizle yaratırız — sabit bir insan doğası yoktur"
};

// Pre-calculate max possible absolute scores per dimension
const maxPossible: Record<Axis, number> = { metaphysics: 0, politics: 0, epistemology: 0, technology: 0, humanNature: 0 };
QUESTIONS.forEach(q => {
  (Object.keys(maxPossible) as Axis[]).forEach(dim => {
    let maxAbs = 0;
    q.answers.forEach(a => {
      const s = Math.abs(a.scores[dim] || 0);
      if (s > maxAbs) maxAbs = s;
    });
    maxPossible[dim] += maxAbs;
  });
});

export default function App() {
  const [quizState, setQuizState] = useState<'start' | 'quiz' | 'results'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScores, setUserScores] = useState<Record<Axis, number>>({
    metaphysics: 0, politics: 0, epistemology: 0, technology: 0, humanNature: 0
  });

  const handleStart = () => {
    setQuizState('quiz');
    setCurrentQuestionIndex(0);
    setUserScores({ metaphysics: 0, politics: 0, epistemology: 0, technology: 0, humanNature: 0 });
  };

  const handleAnswer = (answer: Answer) => {
    setUserScores(prev => {
      const newScores = { ...prev };
      (Object.keys(answer.scores) as Axis[]).forEach(dim => {
        newScores[dim] += answer.scores[dim] || 0;
      });
      return newScores;
    });

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizState('results');
    }
  };

  const results = useMemo(() => {
    if (quizState !== 'results') return null;

    const normalizedScores: Record<Axis, number> = {
      metaphysics: 50, politics: 50, epistemology: 50, technology: 50, humanNature: 50
    };
    const labels: Record<Axis, string> = {
      metaphysics: '', politics: '', epistemology: '', technology: '', humanNature: ''
    };

    let maxDist = 0;
    let dominantDim: Axis = 'metaphysics';

    (Object.keys(DIMENSIONS) as Axis[]).forEach(key => {
      const dim = key as Axis;
      const raw = userScores[dim];
      const max = maxPossible[dim] || 1;
      // Convert raw score to 0-100 where 0 = full pole A, 100 = full pole B
      const pct = Math.round(((raw / max) + 1) / 2 * 100);
      normalizedScores[dim] = pct;

      const d = DIMENSIONS[dim];
      if (pct <= 45) labels[dim] = d.poleA;
      else if (pct >= 55) labels[dim] = d.poleB;
      else labels[dim] = `${d.poleA}/${d.poleB}`;

      const dist = Math.abs(pct - 50);
      if (dist > maxDist) {
        maxDist = dist;
        dominantDim = dim;
      }
    });

    return { normalizedScores, labels, dominantDim, dominantLabel: labels[dominantDim] };
  }, [userScores, quizState]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0dcd4] font-serif flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <AnimatePresence mode="wait">
        {quizState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl w-full text-center mt-20"
          >
            <div className="font-sans text-[11px] tracking-[3px] uppercase text-[#c4a35a] mb-2">Millerman Okulu</div>
            <h1 className="text-4xl md:text-5xl font-medium mb-4 text-[#f5f0e8] leading-tight">Felsefi DNA'nız</h1>
            <p className="text-lg text-[#999] mb-12 italic max-w-md mx-auto">
              Nasıl düşündüğünüzü şekillendiren gelenekleri ortaya çıkaran 10 soru
            </p>
            
            <div className="mt-8 mb-12">
              <p className="text-lg text-[#e0dcd4] max-w-lg mx-auto mb-8 leading-relaxed">
                Zaten bir filozof gibi düşünüyorsunuz — sadece hangisi olduğunuzu bilmiyorsunuz.
              </p>
              <p className="text-[0.95rem] text-[#999] mb-10">
                10 soru. 3 dakika. Doğru cevap yok.
              </p>
            </div>

            <button
              onClick={handleStart}
              className="px-12 py-3.5 bg-transparent border border-[#c4a35a] text-[#c4a35a] hover:bg-[#c4a35a] hover:text-[#0a0a0a] transition-all duration-300 text-[1.15rem] tracking-[0.5px] cursor-pointer"
            >
              Teste Başla &rarr;
            </button>
          </motion.div>
        )}

        {quizState === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="max-w-2xl w-full mt-10"
          >
            <div className="pt-6 mb-12">
              <div className="h-[2px] w-full bg-[#2a2a2a] mb-2 relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-[#c4a35a]"
                  initial={{ width: `${((currentQuestionIndex) / QUESTIONS.length) * 100}%` }}
                  animate={{ width: `${((currentQuestionIndex) / QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <div className="text-right font-sans text-xs text-[#999]">
                {currentQuestionIndex + 1} / {QUESTIONS.length}
              </div>
            </div>

            <h2 className="text-[1.2rem] md:text-[1.45rem] text-[#f5f0e8] leading-[1.7] mb-9 font-normal">
              {QUESTIONS[currentQuestionIndex].text}
            </h2>

            <div className="flex flex-col space-y-3">
              {QUESTIONS[currentQuestionIndex].answers.map((answer, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(answer)}
                  className="w-full py-[18px] px-6 text-left bg-[#1a1a1a] border border-[#2a2a2a] text-[#e0dcd4] text-[1.05rem] leading-[1.5] hover:border-[#c4a35a] hover:bg-[#c4a35a]/10 transition-all duration-250 cursor-pointer"
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {quizState === 'results' && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full mt-10"
          >
            <div className="text-center mb-12">
              <h2 className="text-[1.6rem] md:text-[2.2rem] font-medium text-[#f5f0e8] mb-2">Felsefi Profiliniz</h2>
              <p className="text-[1.05rem] text-[#999] italic">
                En güçlü eğiliminiz: <span className="text-[#e0dcd4] border-b border-dotted border-[#c4a35a] cursor-help" title={TOOLTIPS[results.dominantLabel]}>{results.dominantLabel}</span> ({DIMENSIONS[results.dominantDim].name})
              </p>
            </div>

            <div className="mb-14 space-y-6">
              {(Object.keys(DIMENSIONS) as Axis[]).map((axis) => {
                const score = results.normalizedScores[axis];
                const dim = DIMENSIONS[axis];
                const isLeftActive = score <= 45;
                const isRightActive = score >= 55;

                return (
                  <div key={axis} className="mb-6">
                    <h3 className="font-sans text-[11px] tracking-[2px] uppercase text-[#c4a35a] mb-2">{dim.name}</h3>
                    <div className="flex justify-between font-sans text-[13px] mb-1.5">
                      <span className={`transition-colors duration-300 ${isLeftActive ? 'text-[#f5f0e8] font-medium' : 'text-[#999]'}`} title={TOOLTIPS[dim.poleA]}>
                        {dim.poleA}
                      </span>
                      <span className={`transition-colors duration-300 ${isRightActive ? 'text-[#f5f0e8] font-medium' : 'text-[#999]'}`} title={TOOLTIPS[dim.poleB]}>
                        {dim.poleB}
                      </span>
                    </div>
                    <div className="relative h-[6px] bg-[#2a2a2a] rounded-[3px]">
                      <motion.div
                        initial={{ width: '50%' }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#c4a35a]/30 to-[#c4a35a] rounded-[3px]"
                      />
                      <motion.div
                        initial={{ left: '50%' }}
                        animate={{ left: `${score}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute top-1/2 -translate-y-1/2 w-[14px] h-[14px] bg-[#c4a35a] border-2 border-[#f5f0e8] rounded-full shadow-[0_0_8px_rgba(196,163,90,0.4)] -ml-[7px]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-5">
              {(Object.keys(DIMENSIONS) as Axis[]).map((axis) => {
                const score = results.normalizedScores[axis];
                const dim = DIMENSIONS[axis];
                let desc = dim.descMixed;
                if (score <= 45) desc = dim.descA;
                if (score >= 55) desc = dim.descB;

                return (
                  <div key={axis} className="border border-[#2a2a2a] p-7 bg-[#1a1a1a]">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="font-sans text-[11px] tracking-[2px] uppercase text-[#c4a35a]">{dim.name}</span>
                      <span className="font-sans text-[12px] text-[#999]">{results.labels[axis]}</span>
                    </div>
                    <h3 className="text-[1.35rem] font-medium text-[#f5f0e8] mb-3">{results.labels[axis]}</h3>
                    <p className="text-[1.05rem] text-[#e0dcd4] leading-[1.7] mb-3">{desc}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-12 text-center border border-[#2a2a2a] p-8 bg-[#1a1a1a]">
               <h3 className="text-[1.3rem] text-[#f5f0e8] mb-2">Tekrar denemek ister misiniz?</h3>
               <p className="text-[#999] text-[0.95rem] mb-5">Cevaplarınız ruh halinize göre değişebilir.</p>
               <button
                onClick={handleStart}
                className="inline-block bg-transparent border border-[#2a2a2a] text-[#c4a35a] font-sans text-[13px] px-5 py-2.5 transition-all duration-200 hover:border-[#c4a35a] hover:bg-[#c4a35a]/10 cursor-pointer"
              >
                Testi Tekrar Çöz
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

