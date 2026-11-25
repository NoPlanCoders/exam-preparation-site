import type { Question } from '../../types.js';
import { questions as writtenQuestions } from './english-order.js';

// 元の問題・解説をそのまま使って、語句を選ぶ並び替え式で出題する。
export const questions: Question[] = writtenQuestions.map((question) => {
  if (question.type !== 'text') throw new Error('英語の並び替え問題は記述式である必要があります');
  const answer = Array.isArray(question.answer) ? question.answer[0] : question.answer;
  return {
    type: 'ordering',
    question: question.question.replace('括弧内だけを並べ替えて入力してください。', '括弧内の語句を正しい順に並べてください。'),
    items: answer.split(' '),
    explanation: question.explanation,
  };
});
