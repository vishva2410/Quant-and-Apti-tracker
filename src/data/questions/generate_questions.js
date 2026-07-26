import fs from 'fs';
import path from 'path';

function generateQuestions(dayNum, count) {
  const questions = [];
  for (let i = 1; i <= count; i++) {
    const sprintNum = Math.ceil(i / 10);
    const qNum = ((i - 1) % 10) + 1;
    questions.push({
      id: `d${dayNum}-s${sprintNum}-q${qNum}`,
      dayNumber: dayNum,
      sprintNumber: sprintNum,
      questionNumber: qNum,
      type: 'mcq',
      category: 'quant',
      topic: 'Mixed',
      subtopic: 'General',
      difficulty: 'medium',
      expectedTimeSeconds: 90,
      companyTags: ['TCS'],
      content: { text: `Generated question ${i} for Day ${dayNum}` },
      options: [
        { id: 'a', text: 'Option A' },
        { id: 'b', text: 'Option B' },
        { id: 'c', text: 'Option C' },
        { id: 'd', text: 'Option D' }
      ],
      correctAnswer: 'a',
      explanation: { detailed: 'Generated explanation' },
      hints: ['Hint 1']
    });
  }
  return questions;
}

function saveFile(dayNum) {
  const qStr = JSON.stringify(generateQuestions(dayNum, 50), null, 2);
  const content = `import type { Question } from '@/types';\n\nexport const day0${dayNum}Questions: Question[] = ${qStr};\n`;
  fs.writeFileSync(`/Users/vishvatejaguduguntla/apti and quant/src/data/questions/day-0${dayNum}.ts`, content, 'utf8');
}

saveFile(2);
saveFile(3);
console.log('Done!');
