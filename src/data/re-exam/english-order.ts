import type { Question } from '../../types.js';

// 括弧内を並べ替えた部分だけを入力する。句読点は省略も認める。
const explanations = [
  'call 人 a taxi で「人にタクシーを呼ぶ」。続く to take me で「私を連れていくための」となる。',
  'leave 人 物 は「人に物を残す」。left us a large collection of antiques の語順にする。',
  'bring 人 物 は「人に物をもたらす」。holders を人、good luck を物として続ける。',
  'It was Shakespeare who ... は強調構文。who first said の後に引用文を続ける。',
  'a short cut to ... は「…への近道」。to の後ろに目的地 the airport を置く。',
  'be going to + 動詞の原形で予定を表す。are の後に going to take a taxi を続ける。',
  'What does 人 do for a living? は職業を尋ねる表現。does の後の動詞は原形 do。',
  'belong to ... は「…に所属する」、at the moment は「現在」。両方を順につなぐ。',
  'will have + 過去分詞は未来完了。have rebuilt his life に期限を表す by を続ける。',
  '現在完了の経験を否定する have never seen の後に目的語 a vendor を置く。',
  'ought not to + 動詞の原形で「…すべきでない」を表す。',
  'would often + 動詞の原形は過去の習慣。bring me an ice bag で「私に氷枕を持ってくる」。',
  'be needed to ... は「…するために必要」。end の目的語は the steady rise。',
  'be used to + 動詞の原形は「…するために使われる」。fertilize the soil で土壌を肥沃にする。',
  'too + 形容詞 + to do は「…するには～すぎる」。too busy to check と並べる。',
  'have no time to do は「…する時間がない」。ここでは to go の後に to get が続く。',
  'be well-known to 人 は「人によく知られている」。続く as は「…として」を表す。',
  'Dressed in old clothes は「古い服を着ていて」を表す分詞句。文頭に置き、後ろをカンマで区切る。',
  'have difficulty (in) doing は「…するのに苦労する」。語群の in を含めて並べる。',
  'Planning a budget は動名詞句で文の主語。「予算を立てることは重要だ」と続ける。',
];

const rawQuestions: Question[] = [
  { type: 'text', question: 'コンサートホールへ行くのに、タクシーを呼んでいただけますか。\nWould you ( me / to / call / a taxi ) take me to the concert hall?\n括弧内だけを並べ替えて入力してください。', answer: 'call me a taxi to' },
  { type: 'text', question: '祖父は私たちに多大の骨董収集品を残してくれた。\nMy grandfather ( collection / us / a large / left ) of antiques.\n括弧内だけを並べ替えて入力してください。', answer: 'left us a large collection' },
  { type: 'text', question: 'マリアのメダルはそれを持っている人に幸運をもたらすと私たちの神父は言った。\nOur priest told us that a medallion of Maria ( brings / luck / holders / good ).\n括弧内だけを並べ替えて入力してください。', answer: 'brings holders good luck' },
  { type: 'text', question: '「恋は盲目である」と初めて言ったのはシェイクスピアであった。\nIt was Shakespeare ( said / , / first / who ) "Love is blind."\n括弧内だけを並べ替えて入力してください。', answer: ['who first said,', 'who first said ,', 'who first said'] },
  { type: 'text', question: '遅れそうです。私は空港への近道を知ってます。\nWe will be late. I know ( to / a short / the airport / cut ).\n括弧内だけを並べ替えて入力してください。', answer: 'a short cut to the airport' },
  { type: 'text', question: '駅までタクシーに乗るつもりです。\nWe are ( to / take / going / a taxi ) to the station.\n括弧内だけを並べ替えて入力してください。', answer: 'going to take a taxi' },
  { type: 'text', question: 'あなたのお父さんはどんな仕事をされていますか。\nWhat ( your father / for / does / do ) a living?\n括弧内だけを並べ替えて入力してください。', answer: 'does your father do for' },
  { type: 'text', question: '山田さんは現在、営業部に所属しています。\nMr. Yamada ( the sales department / to / at / belongs ) the moment.\n括弧内だけを並べ替えて入力してください。', answer: 'belongs to the sales department at' },
  { type: 'text', question: '彼は来年末までに人生を立て直しているでしょう。\nHe will ( by / his life / rebuilt / have ) the end of next year.\n括弧内だけを並べ替えて入力してください。', answer: 'have rebuilt his life by' },
  { type: 'text', question: '私は「ビッグイシュー」の販売者をこの通りで一度も見たことがありません。\nI ( never / a vendor / seen / have ) of The Big Issue on this street.\n括弧内だけを並べ替えて入力してください。', answer: 'have never seen a vendor' },
  { type: 'text', question: '左足を地面につけてはいけません。\nYou ( ought / touch / to / not ) your left foot on the ground.\n括弧内だけを並べ替えて入力してください。', answer: 'ought not to touch' },
  { type: 'text', question: 'その若い看護師が私によく氷枕をもってきてくれた。\nThat young nurse ( often / bring / would / me ) an ice bag.\n括弧内だけを並べ替えて入力してください。', answer: 'would often bring me' },
  { type: 'text', question: '世界人口の絶え間ない増加を終わらせるためにさらなる努力が必要である。\nMore effort is ( the steady / needed / end / to ) rise in the global population.\n括弧内だけを並べ替えて入力してください。', answer: 'needed to end the steady' },
  { type: 'text', question: 'そのレストランのすべての有機廃棄物は堆肥にされ、土壌を肥沃にするために使われる。\nAll the restaurant’s organic waste is composted and ( fertilize / the soil / to / used ).\n括弧内だけを並べ替えて入力してください。', answer: 'used to fertilize the soil' },
  { type: 'text', question: 'その医者は忙しすぎて自分自身の健康状態を調べることができなかった。\nThe doctor was ( to / too / check / busy ) his own health.\n括弧内だけを並べ替えて入力してください。', answer: 'too busy to check' },
  { type: 'text', question: '健康診断に行く時間が私にはありません。\nI have ( go / time / no / to ) to get a medical check-up.\n括弧内だけを並べ替えて入力してください。', answer: 'no time to go' },
  { type: 'text', question: '彼の父は慈善家としてよく知られていた。\nHis father ( to / well-known / was / everyone ) as a philanthropist.\n括弧内だけを並べ替えて入力してください。', answer: 'was well-known to everyone' },
  { type: 'text', question: '古い服を着ていたので、彼は金持ちのビジネスマンには見えなかった。\n( dressed / , / old clothes / in ) he didn’t look like a rich businessman.\n括弧内だけを並べ替えて入力してください。', answer: ['dressed in old clothes,', 'dressed in old clothes ,', 'dressed in old clothes'] },
  { type: 'text', question: '本当に着たいものを見つけることが難しい人もいる。\nSome people ( have / in / difficulty / finding ) what they really want to wear.\n括弧内だけを並べ替えて入力してください。', answer: 'have difficulty in finding' },
  { type: 'text', question: '予算を立てることが、大きなショッピングモールで賢い買い物をするためには重要だ。\n( is / a budget / planning / important ) for shopping wisely in a large shopping mall.\n括弧内だけを並べ替えて入力してください。', answer: 'planning a budget is important' },
];

export const questions: Question[] = rawQuestions.map((question, index) => ({ ...question, explanation: explanations[index] }));
