import type { Question } from '../../types.js';

// 「4I 前期期末試験」> 応用物理(計算・手書き)
// 出典: 応用物理 前期期末直前対策プリント(令和8年度)に記載されている問題のみを収録。
// 選択式(applied-physics-choice.ts)と同じ内容を、実際に途中式を書いて解く形式で出題。
export const questions: Question[] = [
  // --- 【1】基本公式 ---
  {
    type: 'handwriting',
    question: 'ある物体の時間ごとの位置が$x(t)$で表されるとき、その物体の加速度はどのように計算することができるか。',
    answer: '$a = \\dfrac{d^2x(t)}{dt^2}$ (速度$v=dx(t)/dt$をさらに時間で微分したもの)',
  },
  {
    type: 'handwriting',
    question:
      '一般に、位置$\\vec{r}$[m]にある物体に働く力$\\vec{F}$[N]に対して物体の動く軌跡が曲線であるとき、その力が物体にした仕事はいくらか。',
    answer: '$W = \\displaystyle\\int \\vec{F}\\cdot d\\vec{r}$ [J]',
  },
  {
    type: 'handwriting',
    question: '保存力$\\vec{F}$[N]は、位置エネルギー$U$[J]を用いて、どのように表すことができるか。',
    answer: '$\\vec{F} = -\\dfrac{\\partial U}{\\partial \\vec{r}}$',
  },
  {
    type: 'handwriting',
    question: '位置$\\vec{r}$[m]にある物体に働く力が$\\vec{F}$[N]のとき、この物体の力のモーメント$\\vec{N}$を求めなさい。',
    answer: '$\\vec{N} = \\vec{r} \\times \\vec{F}$ [N・m]',
  },
  {
    type: 'handwriting',
    question: '位置$\\vec{r}$[m]にある物体の運動量が$\\vec{P}$[kg m/s]のとき、角運動量$\\vec{L}$を書き下せ。',
    answer: '$\\vec{L} = \\vec{r} \\times \\vec{P}$ [kg・m²/s]',
  },
  // --- 【2】位置x(t)から速度・加速度を求める ---
  {
    type: 'handwriting',
    question: '$x = t + 10$ について、速度$v$と加速度$a$を求めなさい。ただし、$t$以外は全て定数。',
    answer: '$v = 1$、$a = 0$',
  },
  {
    type: 'handwriting',
    question: '$x = -gt^2 + b$ について、速度$v$と加速度$a$を求めなさい。ただし、$t$以外は全て定数。',
    answer: '$v = -2gt$、$a = -2g$',
  },
  {
    type: 'handwriting',
    question: '$x = A\\cos\\omega t$ について、速度$v$と加速度$a$を求めなさい。ただし、$t$以外は全て定数。',
    answer: '$v = -A\\omega\\sin\\omega t$、$a = -A\\omega^2\\cos\\omega t$',
  },
  {
    type: 'handwriting',
    question:
      '$x = a\\exp\\!\\left(-\\dfrac{c}{m}t\\right)$ について、速度$v$と加速度$a$(加速度は$\\alpha$と表す)を求めなさい。ただし、$t$以外は全て定数。',
    answer: '$v = -\\dfrac{ac}{m}e^{-\\frac{c}{m}t}$、$\\alpha = \\dfrac{ac^2}{m^2}e^{-\\frac{c}{m}t}$',
  },
  // --- 【6】空気抵抗を受ける投げ上げ運動 ---
  {
    type: 'handwriting',
    question:
      '質量$m$[kg]の物体を速度$V_0$[m/s]で投げ上げるとき、上向きの速度$V_y$[m/s]に比例する空気抵抗$-KV_y$[N]が働く($K$は定数)。投げ上げてから$t$秒後の速度を求めたい。鉛直上向きを$y$軸の正の向きとし、物体は最初地上$y=0$[m]地点にあったものとする。\n\n(1) 物体の運動方程式を書き下せ。',
    answer: '$m\\dfrac{dV_y}{dt} = -mg - KV_y$ [N]',
  },
  {
    type: 'handwriting',
    question:
      '質量$m$[kg]の物体を速度$V_0$[m/s]で投げ上げるとき、空気抵抗$-KV_y$[N]により運動方程式$m\\dfrac{dV_y}{dt} = -mg - KV_y$が成り立つ。時刻$t$[s]での物体の速さ$V_y$を求めよ。',
    answer:
      '$V_y = \\left(V_0+\\dfrac{mg}{K}\\right)e^{-\\frac{K}{m}t} - \\dfrac{mg}{K}$ [m/s]\n(変数分離: $\\dfrac{dV_y}{V_y+mg/K}=-\\dfrac{K}{m}dt$ を積分し、$t=0$で$V_y=V_0$の初期条件から積分定数を決める)',
  },
  {
    type: 'handwriting',
    question:
      '質量$m$[kg]の物体を速度$V_0$[m/s]で投げ上げるとき、上向きの速度$V_y$[m/s]に比例する空気抵抗$-KV_y$[N]が働く($K$は定数)。この物体が最高点に達するまでの時間はいくらか。',
    answer:
      '$t = \\dfrac{m}{K}\\ln\\!\\left(\\dfrac{KV_0+mg}{mg}\\right)$ [s]\n($V_y=0$とおいて$t$について解く)',
  },
  // --- 【9】等速円運動の角運動量 ---
  {
    type: 'handwriting',
    question:
      '質量$m=1.0$kgの粒子が、半径$r=1.0$mの円周上を、速さ$v=2.0$m/sで等速円運動している。粒子の角運動量の大きさを求めよ。',
    answer: '$L = rmv = 1.0\\times1.0\\times2.0 = 2.0$ kg・m²/s',
  },
  {
    type: 'handwriting',
    question:
      '質量$m=1.0$kgの粒子が、半径$r=1.0$mの円周上を、速さ$v=2.0$m/sで等速円運動している。慣性モーメント$I=mr^2$、角速度$\\omega$より、$I\\omega$が角運動量と一致していることを確認せよ。',
    answer:
      '$I=mr^2=1.0\\times(1.0)^2=1.0$ kg・m²、$\\omega=v/r=2.0/1.0=2.0$ rad/s より $I\\omega=1.0\\times2.0=2.0$ kg・m²/s となり、角運動量$L=2.0$ kg・m²/sと一致する。',
  },
];
