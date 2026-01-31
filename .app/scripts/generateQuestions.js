import fs from 'fs';

const GO_AI_ENDPOINT = 'http://localhost:8080/chat';
const QUESTIONS_FILE = './questions.json';

async function fetchAiOutput() {
  const res = await fetch(GO_AI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: 'Generate general knowledge flashcard questions'
    })
  });

  if (!res.ok) {
    throw new Error(`Go AI error: ${res.status}`);
  }

  const data = await res.json();
  return data.output; // ← raw AI text
}

function parseToJson(text) {
  const questions = [];
  const blocks = text.trim().split(/\n\s*\n/);

  blocks.forEach(block => {
    const lines = block.split('\n');
    const questionObj = {
      question: '',
      difficulty: '',
      link: '',
      answer: '' // user fills this later
    };

    lines.forEach(line => {
      const [key, ...rest] = line.split(':');
      if (!key || rest.length === 0) return;

      const cleanKey = key.trim().toLowerCase();
      const value = rest.join(':').trim();

      if (cleanKey in questionObj && cleanKey !== 'answer') {
        questionObj[cleanKey] = value;
      }
    });

    if (questionObj.question && questionObj.difficulty) {
      questions.push(questionObj);
    }
  });

  return questions;
}

async function run() {
  let existingData = { questions: [] };
  if (fs.existsSync(QUESTIONS_FILE)) {
    existingData = JSON.parse(fs.readFileSync(QUESTIONS_FILE, 'utf-8'));
  }

  const aiOutput = await fetchAiOutput();

  const newQuestions = parseToJson(aiOutput);
  existingData.questions.push(...newQuestions);

  fs.writeFileSync(
    QUESTIONS_FILE,
    JSON.stringify(existingData, null, 2)
  );

  console.log(`✅ Added ${newQuestions.length} new AI questions`);
}

run().catch(err => {
  console.error('❌ AI ingest failed:', err.message);
});
