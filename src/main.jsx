import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Cake,
  Check,
  ChevronDown,
  Heart,
  Music2,
  PawPrint,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import './style.css';

const photos = [
  { src: '/photos/manu-1.png', caption: 'Birthday glow ✨' },
  { src: '/photos/manu-2.png', caption: 'A lovely day out 🌸' },
  { src: '/photos/manu-3.png', caption: 'Dancing through the day 💃' },
];

const chapters = [
  { label: 'Birthday welcome', icon: '🎈' },
  { label: 'Puppy & kitten', icon: '🐾' },
  { label: 'Cake celebration', icon: '🎂' },
  { label: 'Photo gallery', icon: '📸' },
  { label: 'How we met', icon: '💌' },
  { label: 'Patch-up story', icon: '🎭' },
  { label: 'A letter', icon: '💌' },
  { label: 'Final surprise', icon: '🎆' },
];

const firstMeetMemories = [
  {
    emoji: '👀',
    sticker: '🎤',
    label: 'THE VERY FIRST CHAPTER',
    title: 'The HR Interview I Will Never Forget',
    story: [
      "Ek din HR role ke liye ek candidate interview dene aayi. Sir ne bola, 'Shaksham, jao first round le lo.'",
      'Aur saamne thi Manu... aur uski mummy bhi saath aayi thi! 😂',
      'Sach bolun toh main itna nervous ho gaya tha ki interview mein properly bol hi nahi paaya.',
      'Mujhe kya pata tha ki jis interview mein main itna darr raha tha, wahi se meri life ki ek cute friendship start hone wali thi.',
    ],
  },
  {
    emoji: '😂',
    sticker: '💬',
    label: 'THE MOMENT I STILL REMEMBER',
    title: "Sanjay Doesn't Look Like Admin!",
    story: [
      'Ek baat hai jo mujhe aaj bhi yaad hai.',
      "Manu ne mujhse poocha, 'Shaksham, tumhe Sanjay abhi bhi admin nahi lagta?'",
      "Maine bola, 'Lagta toh hai.'",
      'Phir maine tumhara face dekha... aur tum chhote bachche ki tarah hasne lagi! 😂',
      'Yaar, us moment tum bahut cute lag rahi thi. Tumhari woh hasi abhi bhi yaad hai.',
    ],
  },
  {
    emoji: '💗',
    sticker: '✨',
    label: 'BESTIE MODE UNLOCKED',
    title: 'HR Interview Ke Baad Ka Decision',
    story: [
      'Phir ek time aaya jab Manu khud interviews lene lagi.',
      'Interview ke baad hum dono discuss karte the:',
      "'Ye achha hai, isko lete hain.'",
      "'Isko hata dete hain.' 😂",
      'Kabhi kisi candidate ko select karna, kabhi reject karna... aur kabhi apni hi alag discussion!',
      'Pata hi nahi chala kab office ki normal baatein hamari daily friendship ka part ban gayi.',
    ],
  },
  {
    emoji: '🌙',
    sticker: '❤️',
    label: 'MY FAVOURITE LATE-NIGHT CHAPTER',
    title: 'Late Night Talks & Real Conversations',
    story: [
      'Raat ko jab hum company ke baare mein baat karte the, tab conversations sirf office tak limited nahi rehti thi.',
      'Tum mujhe apne past ke baare mein batati thi, apne future ke dreams share karti thi.',
      'Aur sach kahun Manu, mujhe tumhari baatein sunne mein bahut maza aata tha.',
      'Kabhi serious talks, kabhi random discussions, kabhi hasi-mazaak...',
      'Woh moments mere liye genuinely special hain. ❤️',
    ],
  },
];

const friendshipMoments = [
  {
    emoji: '😤',
    animation: 'jealousy',
    title: 'Vidit Was an Alpha Man?',
    story: [
      'Story shuru hoti hai Vidit se! 😂',
      'Manu bolti thi ki starting mein Vidit bahut achha tha, ekdum alpha man!',
      "Aur mujhe ye baat bilkul pasand nahi aayi. Main jealous ho gaya aur bol diya, 'Aisa bhi kuch khaas achha nahi tha!'",
      'Bas phir kya tha... ek chhoti si baat par hamari debate shuru ho gayi aur dheere-dheere woh fight ban gayi.',
      'Ek Vidit aur hamari itni badi discussion! 😂',
    ],
  },
  {
    emoji: '🤐',
    animation: 'silence',
    title: 'Main Kyun Baat Karun?',
    story: [
      'Raat mein ye sab baatein hui thi.',
      'Ab subah Manu office aa gayi, lekin aadha din ho gaya aur madam mujhse baat hi nahi kar rahi thi!',
      'Ab main bhi soch raha tha, main ladka hoon, main kyun bolun pehle? 😂',
      'Dono apni-apni ego lekar baithe rahe. Na tum bolo, na main bolun!',
    ],
  },
  {
    emoji: '🥺',
    animation: 'missing',
    title: 'Bas Koi Toh Baat Shuru Karo!',
    story: [
      'Sabse funny baat pata hai kya?',
      'Office mein hum ek dusre ke bilkul bagal mein baithe hote the, phir bhi baat nahi kar rahe hote the.',
      'Kabhi tum kisi aur se baat karti thi, kabhi main kisi aur se...',
      'Lekin andar se lagta tha ki yaar, koi toh baat shuru kar do! 😂',
      'Paas baithkar bhi ek dusre ko miss karna... kya hi friendship hai hamari!',
    ],
  },
  {
    emoji: '☕',
    animation: 'chai',
    title: 'Chai Can Fix Everything!',
    story: [
      'Phir aakhirkar hamari baat ho hi gayi!',
      'Hum office se bahar gaye, chai pi, saath mein music suna aur phir dheere-dheere sab normal ho gaya.',
      'Kabhi-kabhi ek cup chai aur thoda sa music, saari narazgi bhula deta hai. ❤️',
    ],
  },
  {
    emoji: '🍱',
    animation: 'lunch',
    title: 'As If Nothing Happened!',
    story: [
      'Phir lunch time mein hum saath baithkar khana khane lage.',
      'Aur sabse funny baat... aisa lag raha tha jaise subah kuch hua hi nahi tha!',
      'Na koi fight, na koi ego, na koi narazgi.',
      'Bas normal baatein, hasi-mazaak aur hamara usual friendship mode! 😂',
    ],
  },
  {
    emoji: '♾️',
    animation: 'infinity',
    title: 'Our Never-Ending Cycle!',
    story: [
      'Aur phir wahi cycle repeat! 😂',
      'Fight, narazgi, no talking, ek dusre ko miss karna, chai, music, patch-up aur phir dher saari baatein.',
      'Manu, tumse ladna bhi friendship ka ek part ban gaya hai.',
      "Aur honestly, I wouldn't exchange these silly memories for anything.",
    ],
  },
];

function PhotoCard({ photo, index, onOpen }) {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <motion.button
      className={`photo-card photo-card-${index % 3}`}
      onClick={() => onOpen(index)}
      whileHover={{ y: -8, rotate: index % 2 ? 2 : -2, scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`Open photo ${index + 1}: ${photo.caption}`}
    >
      <div className={`photo-frame${unavailable ? ' is-placeholder' : ''}`}>
        {!unavailable && (
          <img
            src={photo.src}
            alt={`Manu photo ${index + 1}`}
            onError={() => setUnavailable(true)}
          />
        )}
        {unavailable && (
          <span className="photo-placeholder">
            <span aria-hidden="true">📷</span>
            <small>Add Manu's photo {index + 1}</small>
          </span>
        )}
      </div>
      <span className="photo-caption">{photo.caption}</span>
    </motion.button>
  );
}

function PhotoViewer({ photo, index }) {
  const [unavailable, setUnavailable] = useState(false);

  return unavailable ? (
    <div className="viewer-placeholder">
      <span aria-hidden="true">📷</span>
      <small>Add Manu's photo {index + 1} to public/photos</small>
    </div>
  ) : (
    <img src={photo.src} alt={`Manu photo ${index + 1}`} onError={() => setUnavailable(true)} />
  );
}

function App() {
  const [chapter, setChapter] = useState(0);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(null);
  const [revealedMoments, setRevealedMoments] = useState(1);
  const audioContext = useRef(null);

  const go = (nextChapter) => {
    const targetChapter = Math.max(0, Math.min(nextChapter, chapters.length - 1));
    setChapter(targetChapter);
    setPhotoIndex(null);
    if ([4, 5, 6].includes(targetChapter)) softSound();
  };

  const playTone = (frequency, duration = 0.2, type = 'sine', force = false) => {
    if (!musicOn && !force) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = audioContext.current ?? new AudioContextClass();
    audioContext.current = context;
    if (context.state === 'suspended') void context.resume();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.1, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration);
  };

  const birthdayJingle = () => {
    if (!musicOn) return;
    [523, 523, 587, 523, 698, 659].forEach((frequency, index) => {
      window.setTimeout(() => playTone(frequency, 0.28, 'triangle'), index * 300);
    });
  };

  const partySound = () => {
    if (!musicOn) return;
    [880, 988, 1175, 1318].forEach((frequency, index) => {
      window.setTimeout(() => playTone(frequency, 0.14, 'triangle'), index * 110);
    });
  };

  const softSound = () => {
    if (!musicOn) return;
    playTone(392, 0.38, 'sine');
    window.setTimeout(() => playTone(523, 0.48, 'sine'), 190);
  };

  const animalSounds = () => {
    if (!musicOn) return;
    playTone(180, 0.2, 'triangle');
    window.setTimeout(() => playTone(620, 0.24), 260);
    window.setTimeout(() => playTone(740, 0.18), 540);
  };

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setPhotoIndex(null);
      if (event.key === 'ArrowRight' && photoIndex !== null) {
        setPhotoIndex((current) => (current + 1) % photos.length);
      }
      if (event.key === 'ArrowLeft' && photoIndex !== null) {
        setPhotoIndex((current) => (current - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [photoIndex]);

  useEffect(() => () => {
    if (audioContext.current && audioContext.current.state !== 'closed') {
      void audioContext.current.close();
    }
  }, []);

  const toggleSound = () => {
    const enabled = !musicOn;
    setMusicOn(enabled);
    if (enabled) {
      [523, 659, 784].forEach((frequency, index) => {
        window.setTimeout(() => playTone(frequency, 0.18, 'triangle', true), index * 130);
      });
    }
  };

  const restart = () => {
    setCandlesBlown(false);
    setCakeCut(false);
    setLetterOpen(false);
    setRevealedMoments(1);
    go(0);
    birthdayJingle();
  };

  return (
    <div className={`app-shell theme-${chapter}`}>
      <header className="topbar">
        <button className="brand" onClick={() => go(0)} aria-label="Go to birthday welcome">
          <span aria-hidden="true">🎀</span> for Manu
        </button>
        <div className="topbar-center">
          <span>made with love by Shaksham</span>
        </div>
        <button
          className={`sound-btn${musicOn ? ' sound-active' : ''}`}
          onClick={toggleSound}
          aria-pressed={musicOn}
          aria-label={musicOn ? 'Turn sound off' : 'Turn sound on'}
        >
          {musicOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
          <span>{musicOn ? 'Sound on' : 'Sound off'}</span>
        </button>
      </header>

      <nav className="progress-nav" aria-label="Birthday chapters">
        <div className="progress-track" aria-hidden="true">
          <motion.span
            className="progress-fill"
            animate={{ width: `${(chapter / (chapters.length - 1)) * 100}%` }}
            transition={{ duration: 0.45 }}
          />
        </div>
        <div className="progress-steps">
          {chapters.map((item, index) => (
            <button
              key={item.label}
              className={`progress-step${chapter === index ? ' is-current' : ''}${chapter > index ? ' is-done' : ''}`}
              onClick={() => go(index)}
              aria-label={`Go to chapter ${index + 1}: ${item.label}`}
              aria-current={chapter === index ? 'step' : undefined}
              title={item.label}
            >
              <span>{chapter > index ? <Check size={13} /> : item.icon}</span>
            </button>
          ))}
        </div>
        <span className="progress-label">{String(chapter + 1).padStart(2, '0')} / 08</span>
      </nav>

      <main className="chapter-main">
        <AnimatePresence mode="wait">
          <motion.section
            key={chapter}
            className={`chapter-page page-${chapter}`}
            initial={{ opacity: 0, y: 22, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.99 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
            aria-label={`Chapter ${chapter + 1}: ${chapters[chapter].label}`}
          >
            {chapter === 0 && (
              <>
                <div className="welcome-decor welcome-balloon balloon-one">🎈</div>
                <div className="welcome-decor welcome-balloon balloon-two">🎈</div>
                <div className="welcome-decor welcome-heart heart-one">💗</div>
                <div className="welcome-decor welcome-heart heart-two">✨</div>
                <div className="welcome-confetti" aria-hidden="true">
                  {Array.from({ length: 18 }, (_, index) => (
                    <i
                      key={index}
                      style={{
                        left: `${index * 5.4 + 2}%`,
                        backgroundColor: `hsl(${index * 37}, 80%, 72%)`,
                        animationDelay: `${index * -0.54}s`,
                      }}
                    />
                  ))}
                </div>
                <motion.div
                  className="welcome-content"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.12 }}
                >
                  <span className="eyebrow"><Sparkles size={15} /> a tiny world made just for you <Sparkles size={15} /></span>
                  <div className="hero-art" aria-hidden="true">🎀　🎂　🐶　🐱</div>
                  <p className="script">it's your special day...</p>
                  <h1>HAPPY BIRTHDAY<br /><em>MANU!</em></h1>
                  <p className="hero-copy">A little celebration, a few silly surprises, and a whole lot of love from your best friend.</p>
                  <p className="from-line">with love, <b>Shaksham</b> <Heart size={15} fill="currentColor" /></p>
                  <button className="primary-btn" onClick={() => { birthdayJingle(); go(1); }}>
                    Start Our Story <ArrowRight size={18} />
                  </button>
                  <p className="instruction"><Music2 size={14} /> Tap sound on for a birthday tune</p>
                </motion.div>
                <span className="welcome-side-note">a whole day of you ✿</span>
              </>
            )}

            {chapter === 1 && (
              <div className="chapter-content pets-content">
                <span className="chapter-kicker">SPECIAL DELIVERY · OPEN WITH A SMILE</span>
                <h2>Look who came<br />to celebrate <em>you!</em></h2>
                <p className="chapter-intro">Two tiny visitors travelled all this way just to wish you the happiest birthday.</p>
                <div className="pet-stage">
                  <motion.button
                    className="pet-character pet-puppy"
                    onClick={animalSounds}
                    initial={{ x: -180, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 65 }}
                    whileTap={{ scale: 1.18, rotate: -9 }}
                    aria-label="Tap the puppy to hear a playful sound"
                  >
                    <span className="speech-bubble">woof woof! 🐾</span>
                    <span className="pet-emoji">🐶</span>
                    <small>the birthday pup</small>
                  </motion.button>
                  <motion.div
                    className="pet-message"
                    initial={{ scale: 0.75, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.25, type: 'spring' }}
                  >
                    <span>🐾 a very important announcement 🐾</span>
                    <strong>HAPPY BIRTHDAY<br />MANU!</strong>
                    <p>Have the most pawsome, meow-gical day ever!</p>
                    <button className="mini-btn" onClick={animalSounds}>Hear our cute wishes 🔊</button>
                  </motion.div>
                  <motion.button
                    className="pet-character pet-kitten"
                    onClick={animalSounds}
                    initial={{ x: 180, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 65, delay: 0.12 }}
                    whileTap={{ scale: 1.18, rotate: 9 }}
                    aria-label="Tap the kitten to hear a playful sound"
                  >
                    <span className="speech-bubble">meowww! 💕</span>
                    <span className="pet-emoji">🐱</span>
                    <small>the party kitten</small>
                  </motion.button>
                  <span className="paw paw-one" aria-hidden="true">🐾</span>
                  <span className="paw paw-two" aria-hidden="true">🐾</span>
                </div>
                <p className="instruction"><PawPrint size={14} /> Tap a furry friend for a silly sound</p>
                <button className="primary-btn" onClick={() => { partySound(); go(2); }}>Now, where's the cake? <Cake size={18} /></button>
              </div>
            )}

            {chapter === 2 && (
              <div className="chapter-content cake-content">
                <span className="chapter-kicker">CLOSE YOUR EYES · MAKE A WISH</span>
                <h2>A cake made<br /><em>for the birthday girl</em></h2>
                <p className="chapter-intro">Make a wish, then blow out every candle to unlock the cake!</p>
                <div className={`cake-scene${cakeCut ? ' is-cut' : ''}${candlesBlown ? ' is-blown' : ''}`}>
                  <span className="cake-sparkle sparkle-a">✦</span>
                  <span className="cake-sparkle sparkle-b">✧</span>
                  <div className="cake-candles">
                    {[0, 1, 2, 3, 4].map((candle) => (
                      <div className="candle" key={candle}>
                        <span className={`flame${candlesBlown ? ' flame-out' : ''}`} />
                        {candlesBlown && <span className="smoke" />}
                      </div>
                    ))}
                  </div>
                  <div className="cake-top"><span>♡　♡　♡</span></div>
                  <div className="cake-middle"><span>✿　✿　✿　✿</span></div>
                  <div className="cake-bottom"><span>♥　♥　♥　♥　♥</span></div>
                  <div className="cake-plate" />
                  {cakeCut && <motion.div className="cake-slice" initial={{ x: 0, rotate: 0 }} animate={{ x: 38, rotate: 15 }}>🍰</motion.div>}
                  {cakeCut && (
                    <div className="cake-confetti" aria-hidden="true">
                      {Array.from({ length: 12 }, (_, index) => (
                        <i
                          key={index}
                          style={{
                            left: `${index * 7.3 + 1}%`,
                            backgroundColor: `hsl(${index * 47}, 82%, 65%)`,
                            animationDelay: `${index * -0.19}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="button-row">
                  <button className="primary-btn" onClick={() => { setCandlesBlown(true); partySound(); }} disabled={candlesBlown}>
                    {candlesBlown ? 'Wish sent to the universe ✨' : 'Blow Candles 🕯️'}
                  </button>
                  <button className="secondary-btn" onClick={() => { setCakeCut(true); partySound(); }} disabled={!candlesBlown || cakeCut}>
                    {cakeCut ? 'Cake for everyone! 🎉' : 'Cut the Cake 🍰'}
                  </button>
                </div>
                {cakeCut && <motion.p className="cake-wish" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>May this year bring you all the little things that make you smile. 💗</motion.p>}
                <p className="instruction"><ChevronDown size={14} /> First make a wish, then share the cake</p>
              </div>
            )}

            {chapter === 3 && (
              <div className="chapter-content gallery-content">
                <span className="chapter-kicker">THE BIRTHDAY STAR · ONE PHOTO AT A TIME</span>
                <h2>A tiny museum<br />of <em>Manu</em></h2>
                <p className="chapter-intro">Your photos belong here. Tap a frame to view it full-size.</p>
                <div className="photo-grid">
                  {photos.map((photo, index) => (
                    <PhotoCard key={photo.src} photo={photo} index={index} onOpen={setPhotoIndex} />
                  ))}
                </div>
                <p className="instruction">Your three photos are saved in <code>public/photos</code></p>
              </div>
            )}

            {chapter === 4 && (
              <div className="chapter-content story-content">
                <span className="chapter-kicker">CHAPTER ONE · THE BEGINNING</span>
                <h2>How I met<br /><em>this idiot 😂</em></h2>
                <p className="chapter-intro">Manu, kabhi socha nahi tha ek HR interview ke baad itni saari stories ban jayengi. Suno, tumhari sidekick Shaksham ki taraf se...</p>
                <div className="memory-timeline">
                  {firstMeetMemories.map((memory, index) => (
                    <motion.article
                      className={`memory-card${index === firstMeetMemories.length - 1 ? ' memory-card-last' : ''}`}
                      key={memory.title}
                      initial={{ opacity: 0, y: 32, scale: 0.97 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                    >
                      <motion.span
                        className="memory-dot"
                        whileInView={{ rotate: [0, -12, 10, 0], scale: [0.8, 1.12, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: index * 0.08 + 0.12 }}
                      >{memory.emoji}</motion.span>
                      <div className="memory-copy">
                        <small>0{index + 1} · {memory.label}</small>
                        <h3>{memory.title}</h3>
                        {memory.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                      <motion.span
                        className="memory-sticker"
                        aria-hidden="true"
                        animate={index === firstMeetMemories.length - 1
                          ? { scale: [1, 1.22, 1], rotate: [-8, 8, -8] }
                          : { y: [0, -4, 0] }}
                        transition={{ duration: index === firstMeetMemories.length - 1 ? 1.8 : 2.4, repeat: Infinity, ease: 'easeInOut' }}
                      >{memory.sticker}</motion.span>
                    </motion.article>
                  ))}
                </div>
                <motion.p
                  className="story-ending"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55 }}
                >
                  <span>Who knew one HR interview would turn into so many memories? ❤️</span>
                  <b>From: Shaksham</b>
                </motion.p>
              </div>
            )}

            {chapter === 5 && (
              <div className="chapter-content comic-content">
                <span className="chapter-kicker">THE DRAMA ARCHIVES · FRIENDSHIP NEVER LOGS OFF</span>
                <h2>Fight. Miss you.<br /><em>Make up. Repeat.</em></h2>
                <p className="chapter-intro">Manu, apni thodi si ego, ek cup chai aur dher saari dosti ki poori kahaani yaad hai? 😂</p>
                <div className="comic-track">
                  {friendshipMoments.slice(0, revealedMoments).map((moment, index) => (
                    <motion.article
                      className={`comic-card comic-card-${index % 4} comic-episode-${moment.animation}`}
                      key={moment.title}
                      initial={{ opacity: 0, scale: 0.8, rotate: index % 2 ? 4 : -4 }}
                      animate={{ opacity: 1, scale: 1, rotate: index % 2 ? 1 : -1 }}
                      transition={{ type: 'spring', stiffness: 180, damping: 16 }}
                    >
                      <span className="comic-number">EP. 0{index + 1}</span>
                      <div className={`episode-art episode-art-${moment.animation}`} aria-hidden="true">
                        {moment.animation === 'jealousy' && (
                          <>
                            <span className="vidit-reference">VIDIT<br /><small>alpha man?</small></span>
                            <span className="episode-emoji">😤</span>
                            <span className="jealous-spark">💢</span>
                          </>
                        )}
                        {moment.animation === 'silence' && (
                          <>
                            <span className="morning-clock">🕘<small>morning → noon</small></span>
                            <span className="turned-friend">🙎🏻‍♂️</span>
                            <span className="turned-friend">🙎🏻‍♀️</span>
                            <span className="silence-dots">…</span>
                          </>
                        )}
                        {moment.animation === 'missing' && (
                          <>
                            <span className="thought-bubble thought-left">koi toh<br />bolo 🥺</span>
                            <span className="sitting-friends">🧑🏻‍💻　👩🏻‍💻</span>
                            <span className="thought-bubble thought-right">tum hi<br />bolo 👀</span>
                          </>
                        )}
                        {moment.animation === 'chai' && (
                          <>
                            <span className="chai-cup chai-cup-one">☕<i /><i /></span>
                            <span className="chai-cup chai-cup-two">☕<i /><i /></span>
                            <span className="music-notes">♫　♪</span>
                          </>
                        )}
                        {moment.animation === 'lunch' && (
                          <>
                            <span className="lunch-friends">🧑🏻‍🤝‍👩🏻</span>
                            <span className="lunchbox">🍱<small>lunch time</small></span>
                            <span className="lunch-spark">✦　♥</span>
                          </>
                        )}
                        {moment.animation === 'infinity' && (
                          <>
                            <span className="infinity-symbol">∞</span>
                            <span className="infinity-heart heart-left">💗</span>
                            <span className="infinity-heart heart-right">💞</span>
                          </>
                        )}
                      </div>
                      <h3>{moment.title}</h3>
                      <div className="comic-story">
                        {moment.story.map((line, lineIndex) => <p key={`${moment.title}-${lineIndex}`}>{line}</p>)}
                      </div>
                    </motion.article>
                  ))}
                </div>
                {revealedMoments < friendshipMoments.length ? (
                  <button className="comic-button" onClick={() => setRevealedMoments((count) => count + 1)}>
                    Reveal next chapter <ArrowRight size={17} />
                  </button>
                ) : (
                  <p className="comic-finale">
                    <span>Chahe kitni bhi fights ho jaayein, I hope hamari friendship mein hasi-mazaak aur ye pagalpan kabhi khatam na ho. ❤️</span>
                    <b>From your favourite fighting partner,<br />Shaksham ❤️</b>
                  </p>
                )}
              </div>
            )}

            {chapter === 6 && (
              <div className="chapter-content letter-content">
                <span className="chapter-kicker">A LITTLE NOTE · FROM MY HEART</span>
                <h2>Okay, jokes aside.<br /><em>This one's for you.</em></h2>
                <p className="chapter-intro">Tap the envelope whenever you're ready.</p>
                <button
                  className={`envelope${letterOpen ? ' envelope-open' : ''}`}
                  onClick={() => setLetterOpen((open) => !open)}
                  aria-expanded={letterOpen}
                >
                  <span className="envelope-flap" />
                  <span className="envelope-paper"><Heart size={28} fill="currentColor" /></span>
                  <span className="envelope-front" />
                  <span className="envelope-label">{letterOpen ? 'tap to fold it back up' : 'a letter for manu · tap to open'}</span>
                </button>
                <AnimatePresence>
                  {letterOpen && (
                    <motion.article
                      className="letter-paper"
                      initial={{ opacity: 0, y: 38, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 18, scale: 0.97 }}
                      transition={{ duration: 0.45 }}
                    >
                      <p className="letter-dear">Manu,</p>
                      <p>I don't know how to explain how special these little moments are to me. From that first HR interview to our silly fights over Vidit, from sitting next to each other without talking to going outside for chai and listening to music...</p>
                      <p>Every little moment has become a memory that I genuinely love.</p>
                      <p>I know we are not perfect. Sometimes we fight over stupid things, sometimes our egos come in between, and sometimes neither of us wants to talk first. 😂</p>
                      <p>But one thing I want you to know is that I really enjoy your company. I love our random conversations, your childish laughter, your stories about the past and your dreams for the future.</p>
                      <p>I don't know what the future holds or how life will change, but I hope we never lose this beautiful bond.</p>
                      <p>Keep smiling, keep achieving everything you dream of, and never stop being the crazy Manu I know.</p>
                      <p><b>Happy Birthday once again, Manu! ❤️</b></p>
                      <p>Thank you for becoming such a beautiful part of my memories.</p>
                      <p>And yes... don't forget, you still have to tolerate this idiot! 😂</p>
                      <p>With lots of friendship, care and countless memories,</p>
                      <p className="letter-sign">Your favourite idiot,<br /><b>Shaksham</b> ❤️</p>
                    </motion.article>
                  )}
                </AnimatePresence>
              </div>
            )}

            {chapter === 7 && (
              <div className="chapter-content finale-content">
                <div className="fireworks" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      style={{
                        top: `${index % 2 * 34}%`,
                        left: `${index * 22 + 2}%`,
                        color: `hsl(${index * 59 + 320}, 76%, 67%)`,
                        animationDelay: `${index * -0.38}s`,
                      }}
                    >✦</span>
                  ))}
                </div>
                <div className="finale-balloons" aria-hidden="true">🎈　🎈　🎈</div>
                <span className="chapter-kicker">ONE LAST THING · THIS DAY IS ALL YOURS</span>
                <motion.div className="finale-icon" animate={{ y: [0, -9, 0], rotate: [-3, 3, -3] }} transition={{ duration: 2.8, repeat: Infinity }}>🎂💗🎀</motion.div>
                <h2>One year of friendship.<br /><em>A million more memories.</em></h2>
                <div className="final-birthday">HAPPY BIRTHDAY<br /><strong>MANU!</strong></div>
                <p className="final-message">May your days be colourful, your dreams come true, and your life be full of reasons to smile.</p>
                <div className="final-pets">
                  <motion.button onClick={animalSounds} whileTap={{ scale: 1.18 }} aria-label="Tap the puppy for a sound">🐶<small>woof!</small></motion.button>
                  <motion.button onClick={animalSounds} whileTap={{ scale: 1.18 }} aria-label="Tap the kitten for a sound">🐱<small>meow!</small></motion.button>
                </div>
                <div className="final-actions">
                  <button className="primary-btn" onClick={() => { birthdayJingle(); partySound(); }}>Play Birthday Celebration <Music2 size={17} /></button>
                  <button className="restart-btn" onClick={restart}><RotateCcw size={16} /> Start over</button>
                </div>
                <p className="signature">made with lots of love & a little madness<br /><b>— Shaksham</b> 💗</p>
              </div>
            )}
          </motion.section>
        </AnimatePresence>
      </main>

      <footer className="page-controls">
        <button className="page-control previous-control" onClick={() => go(chapter - 1)} disabled={chapter === 0}>
          <ArrowLeft size={17} /><span>Previous</span>
        </button>
        <span className="control-caption">{chapters[chapter].icon} {chapters[chapter].label}</span>
        {chapter < chapters.length - 1 ? (
          <button className="page-control next-control" onClick={() => go(chapter + 1)}>
            <span>Next chapter</span><ArrowRight size={17} />
          </button>
        ) : (
          <button className="page-control next-control" onClick={restart}>
            <span>Start over</span><RotateCcw size={16} />
          </button>
        )}
      </footer>

      <AnimatePresence>
        {photoIndex !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPhotoIndex(null)}
            role="presentation"
          >
            <motion.div
              className="lightbox-card"
              initial={{ scale: 0.84, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 12 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Manu photo viewer"
            >
              <button className="lightbox-close" onClick={() => setPhotoIndex(null)} aria-label="Close photo viewer"><X size={20} /></button>
              <button
                className="lightbox-arrow lightbox-prev"
                onClick={() => setPhotoIndex((photoIndex - 1 + photos.length) % photos.length)}
                aria-label="Previous photo"
              ><ArrowLeft size={20} /></button>
              <div className="viewer-photo"><PhotoViewer photo={photos[photoIndex]} index={photoIndex} /></div>
              <button
                className="lightbox-arrow lightbox-next"
                onClick={() => setPhotoIndex((photoIndex + 1) % photos.length)}
                aria-label="Next photo"
              ><ArrowRight size={20} /></button>
              <p className="lightbox-credit">with love, Shaksham 💗</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
