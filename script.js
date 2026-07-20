// ===============================
// 単語データ
// 好きな単語をこの配列に追加できます。
// ja: 日本語 / en: 英語 / ko: 韓国語 / zh: 中国語
// koReading, zhReading は任意です。
// ===============================
const WORDS = [
  { ja: "家", en: "house", ko: "집", zh: "家", koReading: "jip", zhReading: "jiā" },
  { ja: "学校", en: "school", ko: "학교", zh: "学校", koReading: "hakgyo", zhReading: "xuéxiào" },
  { ja: "友達", en: "friend", ko: "친구", zh: "朋友", koReading: "chingu", zhReading: "péngyou" },
  { ja: "愛", en: "love", ko: "사랑", zh: "爱", koReading: "sarang", zhReading: "ài" },
  { ja: "時間", en: "time", ko: "시간", zh: "时间", koReading: "sigan", zhReading: "shíjiān" },
  { ja: "水", en: "water", ko: "물", zh: "水", koReading: "mul", zhReading: "shuǐ" },
  { ja: "食べ物", en: "food", ko: "음식", zh: "食物", koReading: "eumsik", zhReading: "shíwù" },
  { ja: "旅行", en: "travel", ko: "여행", zh: "旅行", koReading: "yeohaeng", zhReading: "lǚxíng" },
  { ja: "音楽", en: "music", ko: "음악", zh: "音乐", koReading: "eumak", zhReading: "yīnyuè" },
  { ja: "映画", en: "movie", ko: "영화", zh: "电影", koReading: "yeonghwa", zhReading: "diànyǐng" },
  { ja: "本", en: "book", ko: "책", zh: "书", koReading: "chaek", zhReading: "shū" },
  { ja: "仕事", en: "work", ko: "일", zh: "工作", koReading: "il", zhReading: "gōngzuò" },
  { ja: "朝", en: "morning", ko: "아침", zh: "早上", koReading: "achim", zhReading: "zǎoshang" },
  { ja: "夜", en: "night", ko: "밤", zh: "晚上", koReading: "bam", zhReading: "wǎnshang" },
  { ja: "空", en: "sky", ko: "하늘", zh: "天空", koReading: "haneul", zhReading: "tiānkōng" },
  { ja: "海", en: "sea", ko: "바다", zh: "海", koReading: "bada", zhReading: "hǎi" },
  { ja: "山", en: "mountain", ko: "산", zh: "山", koReading: "san", zhReading: "shān" },
  { ja: "猫", en: "cat", ko: "고양이", zh: "猫", koReading: "goyangi", zhReading: "māo" },
  { ja: "犬", en: "dog", ko: "개", zh: "狗", koReading: "gae", zhReading: "gǒu" },
  { ja: "幸せ", en: "happiness", ko: "행복", zh: "幸福", koReading: "haengbok", zhReading: "xìngfú" },
  { ja: "夢", en: "dream", ko: "꿈", zh: "梦想", koReading: "kkum", zhReading: "mèngxiǎng" },
  { ja: "約束", en: "promise", ko: "약속", zh: "约定", koReading: "yaksok", zhReading: "yuēdìng" },
  { ja: "勇気", en: "courage", ko: "용기", zh: "勇气", koReading: "yonggi", zhReading: "yǒngqì" },
  { ja: "未来", en: "future", ko: "미래", zh: "未来", koReading: "mirae", zhReading: "wèilái" },
  { ja: "言葉", en: "word", ko: "말", zh: "词语", koReading: "mal", zhReading: "cíyǔ" },
  { ja: "笑顔", en: "smile", ko: "미소", zh: "微笑", koReading: "miso", zhReading: "wéixiào" },
  { ja: "雨", en: "rain", ko: "비", zh: "雨", koReading: "bi", zhReading: "yǔ" },
  { ja: "太陽", en: "sun", ko: "태양", zh: "太阳", koReading: "taeyang", zhReading: "tàiyáng" },
  { ja: "月", en: "moon", ko: "달", zh: "月亮", koReading: "dal", zhReading: "yuèliang" },
  { ja: "パン", en: "bread", ko: "빵", zh: "面包", koReading: "ppang", zhReading: "miànbāo" }
];

const LANGUAGE_NAMES = {
  ja: "🇯🇵 日本語",
  en: "🇬🇧 英語",
  ko: "🇰🇷 韓国語",
  zh: "🇨🇳 中国語"
};

// 問題形式。
// weight が大きい形式ほど出題されやすくなります。
const QUESTION_TYPES = [
  { from: ["ko", "en", "zh"], to: "ja", weight: 7 },
  { from: ["en"], to: "zh", weight: 1 },
  { from: ["ko"], to: "en", weight: 1 },
  { from: ["zh"], to: "en", weight: 1 }
];

const TOTAL_QUESTIONS = 10;

const questionNumberEl = document.getElementById("questionNumber");
const scoreEl = document.getElementById("score");
const accuracyEl = document.getElementById("accuracy");
const progressBarEl = document.getElementById("progressBar");
const questionInstructionEl = document.getElementById("questionInstruction");
const questionLanguagesEl = document.getElementById("questionLanguages");
const questionTextEl = document.getElementById("questionText");
const pronunciationEl = document.getElementById("pronunciation");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const finalScore = document.getElementById("finalScore");
const finalAccuracy = document.getElementById("finalAccuracy");
const reviewArea = document.getElementById("reviewArea");
const reviewCount = document.getElementById("reviewCount");
const reviewButton = document.getElementById("reviewButton");
const playAgainButton = document.getElementById("playAgainButton");

let questions = [];
let currentIndex = 0;
let score = 0;
let answeredCount = 0;
let wrongQuestions = [];
let answerLocked = false;
let isReviewMode = false;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function weightedRandomQuestionType() {
  const pool = [];
  QUESTION_TYPES.forEach((type) => {
    for (let i = 0; i < type.weight; i += 1) {
      pool.push(type);
    }
  });
  return pool[Math.floor(Math.random() * pool.length)];
}

function getReading(word, language) {
  if (language === "ko") return word.koReading || "";
  if (language === "zh") return word.zhReading || "";
  return "";
}

function createQuestion(word, forcedType = null) {
  const type = forcedType || weightedRandomQuestionType();
  const answerLanguage = type.to;

  const distractors = shuffle(
    WORDS.filter((item) => item[answerLanguage] !== word[answerLanguage])
  )
    .slice(0, 3)
    .map((item) => item[answerLanguage]);

  const choices = shuffle([word[answerLanguage], ...distractors]);

  return {
    word,
    fromLanguages: type.from,
    answerLanguage,
    choices
  };
}

function generateQuestions() {
  const selectedWords = shuffle(WORDS).slice(0, TOTAL_QUESTIONS);

  // 最低1問ずつ、指定された特殊形式を入れる
  const requiredTypes = [
    { from: ["en"], to: "zh" },
    { from: ["ko"], to: "en" },
    { from: ["zh"], to: "en" }
  ];

  const generated = selectedWords.map((word, index) => {
    if (index < requiredTypes.length) {
      return createQuestion(word, requiredTypes[index]);
    }
    return createQuestion(word);
  });

  return shuffle(generated);
}

function startGame() {
  questions = generateQuestions();
  currentIndex = 0;
  score = 0;
  answeredCount = 0;
  wrongQuestions = [];
  answerLocked = false;
  isReviewMode = false;

  gameScreen.classList.remove("hidden");
  resultScreen.classList.add("hidden");

  renderQuestion();
}

function startReview() {
  questions = wrongQuestions.map((question) => ({
    ...question,
    choices: shuffle([...question.choices])
  }));
  currentIndex = 0;
  score = 0;
  answeredCount = 0;
  wrongQuestions = [];
  answerLocked = false;
  isReviewMode = true;

  gameScreen.classList.remove("hidden");
  resultScreen.classList.add("hidden");

  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentIndex];
  answerLocked = false;

  const total = questions.length;
  const displayedNumber = currentIndex + 1;
  const accuracy =
    answeredCount === 0 ? 0 : Math.round((score / answeredCount) * 100);

  questionNumberEl.textContent = `${displayedNumber} / ${total}`;
  scoreEl.textContent = score;
  accuracyEl.textContent = `${accuracy}%`;
  progressBarEl.style.width = `${(displayedNumber / total) * 100}%`;

  const fromNames = question.fromLanguages
    .map((language) => LANGUAGE_NAMES[language])
    .join("・");

  questionInstructionEl.textContent =
    `${fromNames}を見て、${LANGUAGE_NAMES[question.answerLanguage]}の意味を選んでね`;

  questionLanguagesEl.innerHTML = question.fromLanguages
    .map(
      (language) =>
        `<span class="language-tag">${LANGUAGE_NAMES[language]}</span>`
    )
    .join("");

  questionTextEl.classList.toggle(
    "multiline",
    question.fromLanguages.length > 1
  );

  questionTextEl.innerHTML = question.fromLanguages
    .map(
      (language) =>
        `<div class="question-line" lang="${language}">${question.word[language]}</div>`
    )
    .join("");

  const readings = question.fromLanguages
    .map((language) => {
      const reading = getReading(question.word, language);
      return reading ? `${LANGUAGE_NAMES[language]}：${reading}` : "";
    })
    .filter(Boolean);

  pronunciationEl.textContent = readings.join(" ／ ");

  answersEl.innerHTML = "";
  question.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = choice;
    button.lang = question.answerLanguage;
    button.addEventListener("click", () => checkAnswer(choice, button));
    answersEl.appendChild(button);
  });

  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextButton.classList.add("hidden");
  nextButton.textContent =
    currentIndex === questions.length - 1 ? "結果を見る" : "次の問題へ";
}

function checkAnswer(selectedAnswer, clickedButton) {
  if (answerLocked) return;
  answerLocked = true;

  const question = questions[currentIndex];
  const correctAnswer = question.word[question.answerLanguage];
  const isCorrect = selectedAnswer === correctAnswer;

  answeredCount += 1;

  const buttons = [...answersEl.querySelectorAll(".answer-button")];
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (isCorrect) {
    score += 1;
    feedbackEl.textContent = "〇 正解！すごい♡";
    feedbackEl.classList.add("correct");
  } else {
    clickedButton.classList.add("incorrect");
    feedbackEl.textContent = `× 不正解。正解は「${correctAnswer}」`;
    feedbackEl.classList.add("incorrect");
    wrongQuestions.push(question);
  }

  scoreEl.textContent = score;
  accuracyEl.textContent = `${Math.round((score / answeredCount) * 100)}%`;
  nextButton.classList.remove("hidden");
}

function goToNextQuestion() {
  if (!answerLocked) return;

  currentIndex += 1;

  if (currentIndex >= questions.length) {
    showResults();
    return;
  }

  renderQuestion();
}

function showResults() {
  gameScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const total = questions.length;
  const accuracy = Math.round((score / total) * 100);

  finalScore.textContent = `${score} / ${total}`;
  finalAccuracy.textContent = `正答率 ${accuracy}%`;

  if (accuracy === 100) {
    resultTitle.textContent = "全問正解！天才すぎる🎉";
    resultMessage.textContent =
      "4か国語ぜんぶ完璧。これはもう語学無双の入口です。";
  } else if (accuracy >= 80) {
    resultTitle.textContent = "かなり強い！👏";
    resultMessage.textContent =
      "あと少しで全問正解。間違えた単語だけ復習したらかなり定着するよ。";
  } else if (accuracy >= 60) {
    resultTitle.textContent = "いい感じ！🌷";
    resultMessage.textContent =
      "ちゃんと力がついてる。間違えた問題を今すぐ復習すると覚えやすいよ。";
  } else {
    resultTitle.textContent = "ここから伸びる！💗";
    resultMessage.textContent =
      "最初は間違えて当然。復習モードでもう一周したら、一気に覚えられる。";
  }

  if (wrongQuestions.length > 0) {
    reviewArea.classList.remove("hidden");
    reviewCount.textContent = `${wrongQuestions.length}問をもう一度出題します。`;
  } else {
    reviewArea.classList.add("hidden");
  }

  if (isReviewMode) {
    resultMessage.textContent += " 復習モードも完走、おつかれさま！";
  }
}

nextButton.addEventListener("click", goToNextQuestion);
restartButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);
reviewButton.addEventListener("click", startReview);

startGame();
