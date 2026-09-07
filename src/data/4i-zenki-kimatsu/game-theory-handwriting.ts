import type { Question } from '../../types.js';

export const questions: Question[] = [
  {
    type: 'handwriting',
    question:
      '次の利得行列(プレーヤー1の利得, プレーヤー2の利得)を考える。\nU: (4,3) (1,1)\nD: (2,0) (3,4)\n(列は左からL, R)\nこのゲームの純粋戦略ナッシュ均衡をすべて求めよ。',
    answer: '(U,L)と(D,R)',
  },
  {
    type: 'handwriting',
    question:
      '対称クールノー競争で、市場価格p=a−(q1+q2)、限界費用c、a=120、c=30とする。均衡生産量q1*, q2*をそれぞれ求めよ。',
    answer: 'q1*=q2*=30',
  },
  {
    type: 'handwriting',
    question:
      'PKゲームの利得行列(キッカー視点)\nL: (0.5,−0.5) (0.9,−0.9)\nR: (0.7,−0.7) (0.4,−0.4)\n(列は左からL, R)\nキッカーを無差別にする、キーパーのL選択確率qを無差別条件から求めよ。',
    answer: 'q=5/7',
  },
  {
    type: 'handwriting',
    question:
      '囚人のジレンマ\nC: (5,5) (0,8)\nD: (8,0) (2,2)\n(列は左からC, D)\nこのゲームの唯一のナッシュ均衡と、その利得の組を求めよ。',
    answer: '(D,D)、利得の組は(2,2)',
  },
  {
    type: 'handwriting',
    question:
      '犬と猿の限定じゃんけん(犬:G,P、猿:S,P)\nG: (1,−1) (−1,1)\nP: (−1,1) (0,0)\n(列は左からS, P)\n犬を無差別にする、猿のS選択確率qを求めよ。',
    answer: 'q=1/3',
  },
  {
    type: 'handwriting',
    question:
      '調整ゲーム\nA: (4,3) (0,0)\nB: (0,0) (2,4)\n(列は左からA, B)\nプレーヤー1を無差別にする、プレーヤー2がAを選ぶ確率qを求めよ。',
    answer: 'q=1/3',
  },
  {
    type: 'handwriting',
    question:
      'ベルトラン競争: 需要q1=54−p1+p2, q2=60−p2+p1、限界費用c1=24, c2=30とする。ナッシュ‐ベルトラン均衡価格p1*, p2*を求めよ。',
    answer: 'p1*=82, p2*=86',
  },
  {
    type: 'handwriting',
    question:
      '混雑ゲーム: 道路の費用がcA(1)=2, cA(2)=6, cB(1)=4, cB(2)=5であるとする。両者がAとBに分かれたときの費用ポテンシャルΦ(A,B)を求めよ。',
    answer: '6',
  },
  {
    type: 'handwriting',
    question: '利得関数u1(p,q)=8pq−5p−2q+3のとき、p=3/4, q=2/5における値を求めよ。',
    answer: '17/20',
  },
  {
    type: 'handwriting',
    question:
      'マキシミニ問題: プレーヤー1の利得が行U=(6,1,4)、行M=(3,3,3)、行D=(0,8,2)(列L,C,R)であるとする。マキシミニ基準で選ばれる戦略と、その時の保証利得(min値)を求めよ。',
    answer: 'M、保証利得は3',
  },
  {
    type: 'handwriting',
    question:
      '3人投票ゲーム(1:A≻C≻B, 2:B≻C≻A, 3:C≻B≻A)で、当初の投票(A,B,C)からプレーヤー2がBからCへ変更し(A,C,C)となったとき、選ばれる案と各プレーヤーの利得の組を求めよ。',
    answer: 'Cが選ばれる、利得の組は(1,1,2)',
  },
  {
    type: 'handwriting',
    question: 'クールノー競争: 市場価格p=100−(q1+q2)、企業1の限界費用c1=20、企業2の限界費用c2=30とする。ナッシュ均衡生産量q1*, q2*を求めよ。',
    answer: 'q1*=30, q2*=20',
  },
  {
    type: 'handwriting',
    question:
      '2人ゼロサムゲーム(プレーヤー1の利得)\nU: 4 −2\nD: −1 3\n(列は左からL, R)\nプレーヤー1のマキシミニ値v1を求めよ。',
    answer: 'v1=1',
  },
  {
    type: 'handwriting',
    question:
      'コインの表裏合わせで、u1(H,φ2)=2q−1、u1(T,φ2)=1−2qであるとする。プレーヤー1を無差別にするqを求めよ。',
    answer: 'q=1/2',
  },
  {
    type: 'handwriting',
    question:
      '調整ゲーム\nX: (10,8) (2,1)\nY: (0,3) (7,9)\n(列は左からX, Y)\n均衡(X,X)と(Y,Y)のナッシュ積をそれぞれ求め、どちらがリスク支配的か答えよ。',
    answer: '(X,X)は70、(Y,Y)は30で、(X,X)がリスク支配する',
  },
];
