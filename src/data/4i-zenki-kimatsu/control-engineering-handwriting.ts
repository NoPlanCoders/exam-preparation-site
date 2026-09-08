import type { Question } from '../../types.js';

// 「4I 前期期末試験」> 制御工学(計算・手書き)
// 計算問題をキャンバスに書いて解き、答えを確認する自己採点形式。
// 出典: 制御工学 前期範囲の講義資料
export const questions: Question[] = [
  {
    type: 'handwriting',
    question: '複素数の掛け算 $(3+4j) \\times (2+5j)$ を、展開して$j^2=-1$を使って計算せよ。',
    answer: '$-14+23j$ ($6+15j+8j+20j^2=6+15j+8j-20=-14+23j$)',
  },
  {
    type: 'handwriting',
    question: '極座標形式の複素数の掛け算 $3e^{2j} \\times 4e^{3j}$ を計算せよ。',
    answer: '$12e^{5j}$ (大きさ$3\\times4=12$、角度$2+3=5$)',
  },
  {
    type: 'handwriting',
    question:
      '$(2+3j)/(3+4j)$ を、分母の共役複素数を分子分母に掛けて実部と虚部がわかる形に計算せよ。',
    answer:
      '$18/25 + (1/25)j$ (分子分母に$3-4j$を掛けると分母$9+16=25$、分子$(2+3j)(3-4j)=6-8j+9j-12j^2=18+j$)',
  },
  {
    type: 'handwriting',
    question:
      '$A = a + bj$ を極座標形式 $A = Me^{j\\theta}$ で表すときのMとθの一般式をそれぞれ求めよ。',
    answer: '$M=\\sqrt{a^2+b^2}$、$\\theta=\\tan^{-1}(b/a)$',
  },
  {
    type: 'handwriting',
    question: 'デルタ関数$\\delta(2t+6)$は、tがいくつのときに無限大になるか求めよ。',
    answer: '$t=-3$ ($2t+6=0$を解くと$t=-3$)',
  },
  {
    type: 'handwriting',
    question:
      '$\\dfrac{7x+17}{(x+2)(x+3)}$ を $\\dfrac{A}{x+2} + \\dfrac{B}{x+3}$ の形に部分分数分解し、A、Bの値をそれぞれ求めよ。',
    answer: '$A=3, B=4$ ($x=-2$代入で$(-14+17)/1=3$、$x=-3$代入で$(-21+17)/(-1)=4$)',
  },
  {
    type: 'handwriting',
    question:
      '円の方程式 $(y-3)^2 + (x+2)^2 = 3^2$ が表す円の中心(x,y)と半径をそれぞれ求めよ。',
    answer: '中心$(-2,3)$、半径$3$',
  },
  {
    type: 'handwriting',
    question: '伝達関数が$G(s)=3s^2+s+4$のシステムの周波数伝達関数$G(j\\omega)$を求めよ。',
    answer: '$-3\\omega^2+j\\omega+4$ ($(j\\omega)^2=-\\omega^2$なので$3(j\\omega)^2+j\\omega+4=-3\\omega^2+j\\omega+4$)',
  },
  {
    type: 'handwriting',
    question:
      '微分要素$G(s)=s$について、$Y(s)=G(s)\\times(1/s)$を計算し、それをラプラス逆変換してステップ応答$y(t)$を求めよ。',
    answer: '$Y(s)=1$、$y(t)=\\delta(t)$',
  },
  {
    type: 'handwriting',
    question:
      '積分要素$G(s)=1/s$について、$Y(s)=G(s)\\times(1/s)$を計算し、それをラプラス逆変換してステップ応答$y(t)$を求めよ。',
    answer: '$Y(s)=1/s^2$、$y(t)=t\\cdot u(t)$',
  },
  {
    type: 'handwriting',
    question:
      '$G(s)=s$、$H(s)=0.5$のときの特性方程式を求め、その解(特性根)を求め、安定か不安定か判定せよ。',
    answer: '特性方程式: $1+0.5s=0$、特性根: $s=-2$、複素平面の左側にあるため安定',
  },
  {
    type: 'handwriting',
    question:
      '$G_o(s)=1234/((s+3)(s-5))$ の極をすべて求め、システムが安定か不安定か判定せよ。',
    answer: '極: $s=-3, 5$。$s=5$が複素平面の右側にあるため不安定',
  },
  {
    type: 'handwriting',
    question:
      '特性方程式$2s^4+s^3+3s^2+5s+10=0$について、ラウス配列を最後まで作成し、安定か不安定かを判定せよ。',
    answer:
      '$s^4$: 2,3,10 / $s^3$: 1,5,0 / $s^2$: -7,10,0 / $s^1$: 6.43,0,0 / $s^0$: 10,0,0。一番左の列(2,1,-7,6.43,10)の符号が変化するため不安定',
  },
  {
    type: 'handwriting',
    question:
      '$F(s)=1/(s(s+2))$ のとき、最終値の定理 $\\lim_{t\\to\\infty}f(t) = \\lim_{s\\to0} sF(s)$ を使って、f(t)の最終値を求めよ。',
    answer: '$1/2$ ($sF(s)=1/(s+2)$に$s=0$を代入すると$1/2$)',
  },
  {
    type: 'handwriting',
    question:
      '$3\\sin(2t)$という波の振幅・周波数・周期をそれぞれ求めよ(周期×周波数=$2\\pi$の関係を使う)。',
    answer: '振幅3、周波数2、周期$\\pi$($2\\pi\\div2=\\pi$)',
  },
];
