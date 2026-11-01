import type { Question } from '../../types.js';

// 配布資料の選択肢を原文の順に掲載する。
export const questions: Question[] = [
  { type: 'choice', question: 'Peter made a doghouse (　　) his dog.', choices: ['to', 'for'], answer: 1 },
  { type: 'choice', question: 'She explained (　　).', choices: ['us her reading plan', 'her reading plan to us'], answer: 1 },
  { type: 'choice', question: 'Everyone who meets Tom (　　) in love with him at a first sight.', choices: ['fall', 'falls', 'fell'], answer: 1 },
  { type: 'choice', question: 'She (　　) about her ex-boyfriend every time we met.', choices: ['complains', 'complained'], answer: 1 },
  { type: 'choice', question: "I'll call you after I (　　) at the airport.", choices: ['arrive', 'will arrive'], answer: 0 },
  { type: 'choice', question: 'I (　　) the flight tomorrow, but it has been canceled.', choices: ['will take', 'was going to take'], answer: 1 },
  { type: 'choice', question: 'At this time next year, Janet (　　) in Hawaii.', choices: ['will work', 'will be working'], answer: 1 },
  { type: 'choice', question: 'He (　　) five Italian restaurants in Tokyo.', choices: ['owns', 'is owning'], answer: 0 },
  { type: 'choice', question: 'If I read the book one more time, I (　　) read it four times.', choices: ['have', 'will have', 'had'], answer: 1 },
  { type: 'choice', question: 'The magazine (　　) sold on newsstands only recently.', choices: ['will have been', 'has been', 'is'], answer: 1 },
  { type: 'choice', question: 'When you take this medicine, you (　　) often feel sleepy and thirsty.', choices: ['will', 'should'], answer: 0 },
  { type: 'choice', question: 'I asked the doctor how I (　　) take the medicine.', choices: ['would', 'should'], answer: 1 },
  { type: 'choice', question: 'A new recycling center is (　　) in the city.', choices: ['building', 'being built'], answer: 1 },
  { type: 'choice', question: 'Can economic growth (　　) maintained without damaging the environment?', choices: ['be', 'is'], answer: 0 },
  { type: 'choice', question: 'We hope (　　) health-care technology.', choices: ['to advance', 'advancing'], answer: 0 },
  { type: 'choice', question: "You shouldn't have let the patient (　　) alone.", choices: ['leave', 'to leave'], answer: 0 },
  { type: 'choice', question: 'The young entrepreneur is a (　　) millionaire.', choices: ['self-made', 'self-making'], answer: 0 },
  { type: 'choice', question: 'Working as a dealer on Wall Street must be very (　　).', choices: ['fascinated', 'fascinating'], answer: 1 },
  { type: 'choice', question: 'A shopping list will prevent you from (　　) useless items.', choices: ['buy', 'buying', 'to buy'], answer: 1 },
  { type: 'choice', question: 'You should stop (　　) things on impulse.', choices: ['purchase', 'purchasing', 'to purchase'], answer: 1 },
];
