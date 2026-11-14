import type { Question } from '../../types.js';

// 配布資料の選択肢を原文の順に掲載する。
const explanations = [
  'make A for B は「BのためにAを作る」。犬のために犬小屋を作ったので for。',
  'explain は explain something to someone の形を取る。人を動詞の直後に置かず、to us を使う。',
  '主語 Everyone は単数扱い。現在の習慣を表すので三人称単数現在形 falls を使う。',
  'every time we met が過去の繰り返しを表すため、主節も過去形 complained にする。',
  '未来のことでも、時を表す after 節では通常 will を使わず現在形 arrive を使う。',
  '搭乗する予定だったが取り消された、という過去の予定には was going to take が合う。',
  'at this time next year は未来のある時点を示すため、その時に進行中の動作を will be working で表す。',
  'own は所有という状態を表す動詞で、通常は進行形にせず owns を使う。',
  'もう一度読めば合計4回読み終えたことになるので、未来完了 will have read を使う。',
  'recently とともに最近までの状況を表す受動態なので、現在完了の受動態 has been sold とする。',
  '薬を飲んだときによく起こる結果を述べるので will feel。should は助言・義務を表す。',
  '薬の飲み方について助言を求めたので how I should take とする。',
  '建設中であるという進行中の受動態は is being built。',
  '助動詞 can の後は動詞の原形を使う。受動態なので can be maintained。',
  'hope の後には to 不定詞を置き、hope to advance とする。',
  '使役動詞 let の目的語 the patient の後は原形不定詞 leave を使う。',
  'self-made は「自力で成功した」という形容詞で、millionaire を修飾する。',
  '仕事そのものが「人を魅了する」ので fascinating。fascinated は人が魅了された状態。',
  'prevent A from の後には動名詞を置くため buying とする。',
  'stop purchasing は「購入するのをやめる」。stop to purchase なら「購入するために立ち止まる」。',
];

const rawQuestions: Question[] = [
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

export const questions: Question[] = rawQuestions.map((question, index) => ({ ...question, explanation: explanations[index] }));
