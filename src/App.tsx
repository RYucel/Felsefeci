import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { Globe } from 'lucide-react';
import { Axis, Answer, Language } from './types';
import { QUESTIONS_TR, DIMENSIONS_TR, TOOLTIPS_TR, BOOK_RECOMMENDATIONS_TR, UI_TEXT_TR } from './content_tr';
import { QUESTIONS_EL, DIMENSIONS_EL, TOOLTIPS_EL, BOOK_RECOMMENDATIONS_EL, UI_TEXT_EL } from './content_el';

const CONTENT = {
  tr: {
    questions: QUESTIONS_TR,
    dimensions: DIMENSIONS_TR,
    tooltips: TOOLTIPS_TR,
    books: BOOK_RECOMMENDATIONS_TR,
    ui: UI_TEXT_TR
  },
  el: {
    questions: QUESTIONS_EL,
    dimensions: DIMENSIONS_EL,
    tooltips: TOOLTIPS_EL,
    books: BOOK_RECOMMENDATIONS_EL,
    ui: UI_TEXT_EL
  }
};

// Pre-calculate max possible absolute scores per dimension
const maxPossible: Record<Axis, number> = { metaphysics: 0, politics: 0, epistemology: 0, technology: 0, humanNature: 0 };
QUESTIONS_TR.forEach(q => {
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
  const [lang, setLang] = useState<Language>('tr');
  const [quizState, setQuizState] = useState<'start' | 'quiz' | 'results'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScores, setUserScores] = useState<Record<Axis, number>>({
    metaphysics: 0, politics: 0, epistemology: 0, technology: 0, humanNature: 0
  });

  const currentContent = CONTENT[lang];

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

    if (currentQuestionIndex < currentContent.questions.length - 1) {
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

    (Object.keys(currentContent.dimensions) as Axis[]).forEach(key => {
      const dim = key as Axis;
      const raw = userScores[dim];
      const max = maxPossible[dim] || 1;
      // Convert raw score to 0-100 where 0 = full pole A, 100 = full pole B
      const pct = Math.round(((raw / max) + 1) / 2 * 100);
      normalizedScores[dim] = pct;

      const d = currentContent.dimensions[dim];
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
  }, [userScores, quizState, currentContent]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0dcd4] font-serif flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <button 
          onClick={() => setLang('tr')}
          className={`transition-all duration-300 ${lang === 'tr' ? 'opacity-100 scale-110 ring-2 ring-[#c4a35a] ring-offset-2 ring-offset-[#0a0a0a]' : 'opacity-40 hover:opacity-70 grayscale'} rounded-[2px] cursor-pointer`}
          title="Türkçe"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" className="w-7 h-5 rounded-[2px] shadow-sm block">
            <rect width="1200" height="800" fill="#E30A17"/>
            <circle cx="425" cy="400" r="200" fill="#fff"/>
            <circle cx="475" cy="400" r="160" fill="#E30A17"/>
            <polygon points="583.334,400 764.235,458.778 652.431,304.894 652.431,495.106 764.235,341.222" fill="#fff"/>
          </svg>
        </button>
        <button 
          onClick={() => setLang('el')}
          className={`transition-all duration-300 ${lang === 'el' ? 'opacity-100 scale-110 ring-2 ring-[#c4a35a] ring-offset-2 ring-offset-[#0a0a0a]' : 'opacity-40 hover:opacity-70 grayscale'} rounded-[2px] cursor-pointer`}
          title="Ελληνικά"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 18" className="w-7 h-5 rounded-[2px] shadow-sm block">
            <rect width="27" height="18" fill="#0d5eaf"/>
            <path d="M0,3h27 M0,7h27 M0,11h27 M0,15h27" stroke="#fff" strokeWidth="2"/>
            <rect width="10" height="10" fill="#0d5eaf"/>
            <path d="M5,0v10 M0,5h10" stroke="#fff" strokeWidth="2"/>
          </svg>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {quizState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl w-full text-center mt-20"
          >
            <div className="font-sans text-[11px] tracking-[3px] uppercase text-[#c4a35a] mb-2">{currentContent.ui.schoolName}</div>
            <h1 className="text-4xl md:text-5xl font-medium mb-4 text-[#f5f0e8] leading-tight">{currentContent.ui.title}</h1>
            <p className="text-lg text-[#999] mb-12 italic max-w-md mx-auto">
              {currentContent.ui.subtitle}
            </p>
            
            <div className="mt-8 mb-12">
              <p className="text-lg text-[#e0dcd4] max-w-lg mx-auto mb-8 leading-relaxed">
                {currentContent.ui.intro1}
              </p>
              <p className="text-[0.95rem] text-[#999] mb-10">
                {currentContent.ui.intro2}
              </p>
            </div>

            <button
              onClick={handleStart}
              className="px-12 py-3.5 bg-transparent border border-[#c4a35a] text-[#c4a35a] hover:bg-[#c4a35a] hover:text-[#0a0a0a] transition-all duration-300 text-[1.15rem] tracking-[0.5px] cursor-pointer"
            >
              {currentContent.ui.startBtn}
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
                  initial={{ width: `${((currentQuestionIndex) / currentContent.questions.length) * 100}%` }}
                  animate={{ width: `${((currentQuestionIndex) / currentContent.questions.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <div className="text-right font-sans text-xs text-[#999]">
                {currentQuestionIndex + 1} / {currentContent.questions.length}
              </div>
            </div>

            <h2 className="text-[1.2rem] md:text-[1.45rem] text-[#f5f0e8] leading-[1.7] mb-9 font-normal">
              {currentContent.questions[currentQuestionIndex].text}
            </h2>

            <div className="flex flex-col space-y-3">
              {currentContent.questions[currentQuestionIndex].answers.map((answer, idx) => (
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
              <h2 className="text-[1.6rem] md:text-[2.2rem] font-medium text-[#f5f0e8] mb-2">{currentContent.ui.resultsTitle}</h2>
              <p className="text-[1.05rem] text-[#999] italic">
                {currentContent.ui.dominantTrait} <span className="text-[#e0dcd4] border-b border-dotted border-[#c4a35a] cursor-help" title={currentContent.tooltips[results.dominantLabel]}>{results.dominantLabel}</span> ({currentContent.dimensions[results.dominantDim].name})
              </p>
            </div>

            <div className="mb-14 space-y-6">
              {(Object.keys(currentContent.dimensions) as Axis[]).map((axis) => {
                const score = results.normalizedScores[axis];
                const dim = currentContent.dimensions[axis];
                const isLeftActive = score <= 45;
                const isRightActive = score >= 55;

                return (
                  <div key={axis} className="mb-6">
                    <h3 className="font-sans text-[11px] tracking-[2px] uppercase text-[#c4a35a] mb-2">{dim.name}</h3>
                    <div className="flex justify-between font-sans text-[13px] mb-1.5">
                      <span className={`transition-colors duration-300 ${isLeftActive ? 'text-[#f5f0e8] font-medium' : 'text-[#999]'}`} title={currentContent.tooltips[dim.poleA]}>
                        {dim.poleA}
                      </span>
                      <span className={`transition-colors duration-300 ${isRightActive ? 'text-[#f5f0e8] font-medium' : 'text-[#999]'}`} title={currentContent.tooltips[dim.poleB]}>
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
              {(Object.keys(currentContent.dimensions) as Axis[]).map((axis) => {
                const score = results.normalizedScores[axis];
                const dim = currentContent.dimensions[axis];
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

            <div className="mt-12">
              <div className="text-center mb-8">
                <h3 className="text-[1.6rem] md:text-[2rem] font-medium text-[#f5f0e8] mb-2">{currentContent.ui.readingRecs}</h3>
                <p className="text-[1.05rem] text-[#999] italic">{currentContent.ui.readingRecsDesc}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {results.dominantLabel.split('/').flatMap(label => currentContent.books[label] || []).map((book, idx) => (
                  <div key={idx} className="border border-[#2a2a2a] p-6 bg-[#1a1a1a] hover:border-[#c4a35a] transition-colors duration-300 flex flex-col">
                    <h4 className="text-[1.2rem] text-[#f5f0e8] font-medium mb-1">{book.title}</h4>
                    <div className="text-[#c4a35a] font-sans text-[12px] tracking-[1px] uppercase mb-3">{book.author}</div>
                    <p className="text-[#999] text-[0.95rem] leading-[1.6] flex-grow">{book.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 text-center border border-[#2a2a2a] p-8 bg-[#1a1a1a]">
               <h3 className="text-[1.3rem] text-[#f5f0e8] mb-2">{currentContent.ui.retryTitle}</h3>
               <p className="text-[#999] text-[0.95rem] mb-5">{currentContent.ui.retryDesc}</p>
               <button
                onClick={handleStart}
                className="inline-block bg-transparent border border-[#2a2a2a] text-[#c4a35a] font-sans text-[13px] px-5 py-2.5 transition-all duration-200 hover:border-[#c4a35a] hover:bg-[#c4a35a]/10 cursor-pointer"
              >
                {currentContent.ui.retryBtn}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attribution Footer */}
      <div className="absolute bottom-4 text-center w-full text-[10px] text-[#555] flex justify-center gap-2">
        <a href="https://www.flaticon.com/free-icons/turkey" title="turkey icons" className="hover:text-[#999] transition-colors" target="_blank" rel="noreferrer">Turkey icons created by Freepik - Flaticon</a>
        <span>&bull;</span>
        <a href="https://www.flaticon.com/free-icons/greece" title="greece icons" className="hover:text-[#999] transition-colors" target="_blank" rel="noreferrer">Greece icons created by Freepik - Flaticon</a>
      </div>
    </div>
  );
}

