const questionInput = document.getElementById("question");
const askButton = document.getElementById("ask");
const answerDisplay = document.getElementById("answer");

const answers = {
  "yes": ["Yes, definitely.", "Absolutely!", "No doubt about it."],
  "no": ["No, sorry.", "Definitely not.", "I don't think so."],
  "maybe": ["Maybe.", "It's possible.", "I'm not sure."],
  "future": ["Only time will tell.", "I cannot predict the future.", "The future is uncertain."],
  "love": ["Love is in the air.", "Your heart knows the answer.", "Follow your heart."],
  "career": ["Success is on the horizon.", "Hard work pays off.", "Believe in yourself and your abilities."],
  "health": ["Take care of yourself.", "Health is wealth.", "Your body is your temple."],
  "travel": ["Adventure awaits!", "Go and explore the world.", "Broaden your horizons."],
  "default": ["I'm not sure.", "Ask again later.", "I cannot answer that."]
};

const keywords = {
  "yes": ["will", "can", "is it", "are they", "does", "do", "should", "could", "would", "is", "are"],
  "no": ["won't", "can't", "isn't", "aren't", "don't", "doesn't", "shouldn't", "couldn't", "wouldn't"],
  "future": ["future", "tomorrow", "next", "later", "someday", "will happen"],
  "love": ["love", "relationship", "affection", "romance", "heart", "crush", "passion", "feelings"],
  "career": ["job", "career", "work", "profession", "promotion", "raise", "employment", "business"],
  "health": ["health", "wellness", "well-being", "exercise", "diet", "fitness", "mental health", "illness"],
  "travel": ["travel", "trip", "vacation", "journey", "adventure", "explore", "destination", "tour", "voyage"]
};


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}${expires}; path=/`;
}

function extractKeyword(question) {
  for (const key in keywords) {
    for (const word of keywords[key]) {
      if (question.includes(word)) return key;
    }
  }
  return "default";
}

function generateAnswer(keyword) {
  const previousAnswer = getCookie(`previousAnswer_${keyword}`);
  const answerPool = answers[keyword];

  if (previousAnswer) {
    const availableAnswers = answerPool.filter(answer => answer !== previousAnswer);
    const index = Math.floor(Math.random() * availableAnswers.length);
    setCookie(`previousAnswer_${keyword}`, availableAnswers[index], 1);
    return availableAnswers[index];
  } else {
    const index = Math.floor(Math.random() * answerPool.length);
    setCookie(`previousAnswer_${keyword}`, answerPool[index], 1);
    return answerPool[index];
  }
}

askButton.addEventListener("click", () => {
  const question = questionInput.value.trim().toLowerCase();
  if (question) {
    const keyword = extractKeyword(question);
    const answer = generateAnswer(keyword);
    answerDisplay.textContent = answer;
  } else {
    answerDisplay.textContent = "Please enter a question.";
  }
});
