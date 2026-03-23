import { Question, DimensionInfo, Book } from './types';

export const QUESTIONS_TR: Question[] = [
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

export const DIMENSIONS_TR: Record<string, DimensionInfo> = {
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

export const TOOLTIPS_TR: Record<string, string> = {
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

export const BOOK_RECOMMENDATIONS_TR: Record<string, Book[]> = {
  'Platoncu': [
    { author: 'Platon', title: 'Devlet', description: 'Adalet, ideal toplum ve mağara alegorisi üzerine temel eser.' },
    { author: 'Plotinos', title: 'Enneadlar', description: 'Platoncu felsefenin mistik ve metafiziksel zirvesi.' }
  ],
  'Nietzscheci': [
    { author: 'Friedrich Nietzsche', title: 'Böyle Söyledi Zerdüşt', description: 'Üstinsan, bengi dönüş ve değerlerin yeniden değerlendirilmesi.' },
    { author: 'Michel Foucault', title: 'Hapishanenin Doğuşu', description: 'Güç, bilgi ve modern kurumların soykütüğü.' }
  ],
  'Klasik': [
    { author: 'Aristoteles', title: 'Politika', description: 'İnsan doğası gereği politik bir hayvandır fikrinin temeli.' },
    { author: 'Farabi', title: "El-Medinetü'l-Fazıla", description: 'Erdemli toplum ve ideal devlet arayışı.' }
  ],
  'Liberal': [
    { author: 'John Locke', title: 'Yönetim Üzerine İkinci İnceleme', description: 'Doğal haklar, mülkiyet ve rızaya dayalı yönetim.' },
    { author: 'John Stuart Mill', title: 'Özgürlük Üzerine', description: 'Bireysel özgürlüklerin ve ifade hürriyetinin savunusu.' }
  ],
  'Straussçu': [
    { author: 'Leo Strauss', title: 'Doğal Hak ve Tarih', description: 'Modern rölativizme karşı klasik doğal hak savunusu.' },
    { author: 'Leo Strauss', title: 'Zulüm ve Yazma Sanatı', description: 'Filozofların sansürden kaçmak için nasıl ezoterik (gizli) yazdıkları üzerine.' }
  ],
  'Hegelci': [
    { author: 'G.W.F. Hegel', title: 'Tinin Fenomenolojisi', description: 'Bilinç, tarih ve mutlak bilginin diyalektik gelişimi.' },
    { author: 'Alexandre Kojève', title: "Hegel'i Okumaya Giriş", description: 'Efendi-köle diyalektiği ve tarihin sonu üzerine etkili bir yorum.' }
  ],
  'Heideggerci': [
    { author: 'Martin Heidegger', title: 'Teknolojiye İlişkin Soruşturma', description: 'Teknolojinin dünyayı nasıl bir "yedek kaynak" (Gestell) olarak çerçevelediği üzerine.' },
    { author: 'Jacques Ellul', title: 'Teknoloji Toplumu', description: 'Tekniğin modern yaşamı nasıl domine ettiğine dair sosyolojik bir başyapıt.' }
  ],
  'Prometheci': [
    { author: 'Francis Bacon', title: 'Yeni Atlantis', description: 'Bilimsel ilerlemenin ve doğaya hakim olmanın ütopik vizyonu.' },
    { author: 'Ayn Rand', title: 'Atlas Silkindi', description: 'Bireysel yaratıcılığın, aklın ve üreticiliğin yüceltilmesi.' }
  ],
  'Aristotelesçi': [
    { author: 'Aristoteles', title: "Nikomakhos'a Etik", description: 'Erdem, karakter ve insan hayatının amacı (eudaimonia) üzerine.' },
    { author: 'Alasdair MacIntyre', title: 'Erdem Peşinde', description: 'Modern ahlaki çöküşe karşı Aristotelesçi erdem etiğine dönüş çağrısı.' }
  ],
  'Varoluşçu': [
    { author: 'Jean-Paul Sartre', title: 'Varlık ve Hiçlik', description: 'Özgürlük, sorumluluk ve "varoluş özden önce gelir" fikri.' },
    { author: 'Albert Camus', title: 'Sisifos Söyleni', description: 'Absürdizm, başkaldırı ve hayatın anlamsızlığına rağmen yaşamak.' }
  ]
};

export const UI_TEXT_TR = {
  schoolName: "Millerman Okulu",
  title: "Felsefi DNA'nız",
  subtitle: "Nasıl düşündüğünüzü şekillendiren gelenekleri ortaya çıkaran 10 soru",
  intro1: "Zaten bir filozof gibi düşünüyorsunuz — sadece hangisi olduğunuzu bilmiyorsunuz.",
  intro2: "10 soru. 3 dakika. Doğru cevap yok.",
  startBtn: "Teste Başla \u2192",
  resultsTitle: "Felsefi Profiliniz",
  dominantTrait: "En güçlü eğiliminiz:",
  readingRecs: "Okuma Önerileri",
  readingRecsDesc: "Baskın felsefi yöneliminize göre sizin için seçtiğimiz temel eserler:",
  retryTitle: "Tekrar denemek ister misiniz?",
  retryDesc: "Cevaplarınız ruh halinize göre değişebilir.",
  retryBtn: "Testi Tekrar Çöz"
};
