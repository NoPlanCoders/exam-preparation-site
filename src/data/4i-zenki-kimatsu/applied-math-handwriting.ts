import type { Question } from '../../types.js';

// 「4I 前期期末試験」> 応用数学(計算・手書き)
// 出典: 2026年度 応用数学a 追加課題・解説プリント(No.2, No.5〜No.14)に載っている問題。
// 各問題を、実際に途中式を書いて解く形式で出題。
export const questions: Question[] = [
  // --- No.2 1変数の微分の計算(2) ---
  {
    type: 'handwriting',
    question: '$f(x)=(3x-1)^2$ の導関数 $f\'(x)$ を求めよ。',
    answer: '$f\'(x)=2(3x-1)\\cdot3=6(3x-1)$',
  },
  {
    type: 'handwriting',
    question: '$f(x)=\\dfrac{1}{x+5}$ の導関数 $f\'(x)$ を求めよ。',
    answer: '$f\'(x)=-\\dfrac{(x+5)\'}{(x+5)^2}=-\\dfrac{1}{(x+5)^2}$',
  },
  {
    type: 'handwriting',
    question: '$f(x)=x\\cos x$ の導関数 $f\'(x)$ を求めよ。',
    answer: '$f\'(x)=(x)\'\\cos x+x(\\cos x)\'=\\cos x-x\\sin x$',
  },
  {
    type: 'handwriting',
    question: '$f(x)=\\dfrac{x}{x+1}$ の導関数 $f\'(x)$ を求めよ。',
    answer: '$f\'(x)=\\dfrac{(x)\'(x+1)-x(x+1)\'}{(x+1)^2}=\\dfrac{(x+1)-x}{(x+1)^2}=\\dfrac{1}{(x+1)^2}$',
  },
  // --- No.5 偏微分の計算(3) ---
  {
    type: 'handwriting',
    question: '$f(x,y)=(2x+y)^3$ を $x$ で偏微分せよ。',
    answer: '$f_x=3(2x+y)^2\\cdot2=6(2x+y)^2$',
  },
  {
    type: 'handwriting',
    question: '$f(x,y)=\\cos(x+5y)$ を $y$ で偏微分せよ。',
    answer: '$f_y=5\\cdot(-\\sin(x+5y))=-5\\sin(x+5y)$',
  },
  {
    type: 'handwriting',
    question: '$f(x,y)=e^{xy}$ を $x$ で偏微分せよ。',
    answer: '$f_x=(xy)_x\\,e^{xy}=ye^{xy}$',
  },
  {
    type: 'handwriting',
    question: '$f(x,y)=\\log(x^2+y)$ を $x$ で偏微分せよ。',
    answer: '$f_x=\\dfrac{(x^2+y)_x}{x^2+y}=\\dfrac{2x}{x^2+y}$',
  },
  // --- No.6 偏微分の計算(4) ---
  {
    type: 'handwriting',
    question: '$f(x,y)=3x^2y^5+x^3y$ を $x$ で偏微分せよ。',
    answer: '$f_x=(3x^2y^5)_x+(x^3y)_x=6xy^5+3x^2y$',
  },
  {
    type: 'handwriting',
    question: '$f(x,y)=\\sin(x^3+2xy+3)$ を $y$ で偏微分せよ。',
    answer: '$f_y=(x^3+2xy+3)_y\\cos(x^3+2xy+3)=2x\\cos(x^3+2xy+3)$',
  },
  {
    type: 'handwriting',
    question: '$f(x,y)=e^{xy+2x^2}$ を $x$ で偏微分せよ。',
    answer: '$f_x=(xy+2x^2)_x\\,e^{xy+2x^2}=(y+4x)e^{xy+2x^2}$',
  },
  {
    type: 'handwriting',
    question: '$f(x,y)=\\dfrac{xy+y+1}{x+y}$ を $x$ で偏微分せよ。',
    answer:
      '$f_x=\\dfrac{(xy+y+1)_x(x+y)-(xy+y+1)(x+y)_x}{(x+y)^2}=\\dfrac{y(x+y)-(xy+y+1)}{(x+y)^2}=\\dfrac{y^2-y-1}{(x+y)^2}$',
  },
  // --- No.7 全微分の計算(1) ---
  {
    type: 'handwriting',
    question: '$z=4xy+x+y+3$ の全微分 $dz$ を求めよ。',
    answer: '$z_x=4y+1$、$z_y=4x+1$ より $dz=(4y+1)dx+(4x+1)dy$',
  },
  {
    type: 'handwriting',
    question: '$z=(2x+y+1)^5$ の全微分 $dz$ を求めよ。',
    answer:
      '$z_x=5(2x+y+1)^4\\cdot2=10(2x+y+1)^4$、$z_y=5(2x+y+1)^4$ より $dz=10(2x+y+1)^4dx+5(2x+y+1)^4dy$',
  },
  {
    type: 'handwriting',
    question: '$z=x\\log(2y)$ の全微分 $dz$ を求めよ。',
    answer: '$z_x=\\log(2y)$、$z_y=\\dfrac{x}{y}$ より $dz=\\log(2y)dx+\\dfrac{x}{y}dy$',
  },
  {
    type: 'handwriting',
    question: '$z=\\dfrac{xy}{x^2+1}$ の全微分 $dz$ を求めよ。',
    answer:
      '$z_x=\\dfrac{y(x^2+1)-xy\\cdot2x}{(x^2+1)^2}=\\dfrac{y(1-x^2)}{(x^2+1)^2}$、$z_y=\\dfrac{x}{x^2+1}$ より $dz=\\dfrac{y(1-x^2)}{(x^2+1)^2}dx+\\dfrac{x}{x^2+1}dy$',
  },
  // --- No.8 全微分の計算(2) ---
  {
    type: 'handwriting',
    question: '$z=\\log(xy)$ の全微分 $dz$ を求めよ。',
    answer: '$z_x=\\dfrac{y}{xy}=\\dfrac{1}{x}$、$z_y=\\dfrac{x}{xy}=\\dfrac{1}{y}$ より $dz=\\dfrac{1}{x}dx+\\dfrac{1}{y}dy$',
  },
  {
    type: 'handwriting',
    question: '$z=e^{2x+3y}$ の全微分 $dz$ を求めよ。',
    answer: '$z_x=2e^{2x+3y}$、$z_y=3e^{2x+3y}$ より $dz=2e^{2x+3y}dx+3e^{2x+3y}dy$',
  },
  {
    type: 'handwriting',
    question: '$z=\\dfrac{x-1}{x^2+y^2+2}$ の全微分 $dz$ を求めよ。',
    answer:
      '$z_x=\\dfrac{(x^2+y^2+2)-2x(x-1)}{(x^2+y^2+2)^2}$、$z_y=\\dfrac{-2y(x-1)}{(x^2+y^2+2)^2}$ より $dz=\\dfrac{(x^2+y^2+2)-2x(x-1)}{(x^2+y^2+2)^2}dx+\\dfrac{-2y(x-1)}{(x^2+y^2+2)^2}dy$',
  },
  {
    type: 'handwriting',
    question: '$z=(x+2y)^2$ の $x=1,\\ y=-1$ に対応する点における接平面の方程式を求めよ。',
    answer:
      '$z(1,-1)=1$。$z_x=2(x+2y)$、$z_y=4(x+2y)$ より $z_x(1,-1)=-2$、$z_y(1,-1)=-4$。接平面は $z=-2(x-1)-4(y+1)+1=-2x-4y-1$',
  },
  // --- No.9 合成関数の微分法 ---
  {
    type: 'handwriting',
    question: '$z=x^2+y^2$、$x=3t$、$y=2t$ のとき $\\dfrac{dz}{dt}$ を求めよ。',
    answer: '$\\dfrac{dz}{dt}=2x\\cdot3+2y\\cdot2=6(3t)+4(2t)=26t$',
  },
  {
    type: 'handwriting',
    question: '$z=xy^2+x+y$、$x=t+2$、$y=2t-1$ のとき $\\dfrac{dz}{dt}$ を求めよ。',
    answer:
      '$\\dfrac{dz}{dt}=(y^2+1)\\cdot1+(2xy+1)\\cdot2=((2t-1)^2+1)+2(2(t+2)(2t-1)+1)=12t^2+8t-4$',
  },
  {
    type: 'handwriting',
    question: '$z=(x+y)^2$、$x=t^3$、$y=t^2$ のとき $\\dfrac{dz}{dt}$ を求めよ。',
    answer:
      '$\\dfrac{dz}{dt}=2(x+y)\\cdot3t^2+2(x+y)\\cdot2t=2(x+y)(3t^2+2t)=2(t^3+t^2)(3t^2+2t)$',
  },
  {
    type: 'handwriting',
    question: '$z=e^{x+y}$、$x=\\log(2t)$、$y=\\log(3t)$ のとき $\\dfrac{dz}{dt}$ を求めよ。',
    answer:
      '$x+y=\\log(6t^2)$ より $e^{x+y}=6t^2$。$\\dfrac{dz}{dt}=e^{x+y}\\cdot\\dfrac{1}{t}+e^{x+y}\\cdot\\dfrac{1}{t}=6t^2\\cdot\\dfrac{2}{t}=12t$',
  },
  // --- No.10 高次偏導関数(1) ---
  {
    type: 'handwriting',
    question: '$z=x^3y^2$ の $z_{xx}$ を求めよ。',
    answer: '$z_x=3x^2y^2$ より $z_{xx}=6xy^2$',
  },
  {
    type: 'handwriting',
    question: '$z=(2x+y)^3$ の $z_{yy}$ を求めよ。',
    answer: '$z_y=3(2x+y)^2$ より $z_{yy}=6(2x+y)$',
  },
  {
    type: 'handwriting',
    question: '$z=\\cos(x+y)$ の $z_{xx}$ を求めよ。',
    answer: '$z_x=-\\sin(x+y)$ より $z_{xx}=-\\cos(x+y)$',
  },
  {
    type: 'handwriting',
    question: '$z=e^{x^3+y^3}$ の $z_{xy}$ を求めよ。',
    answer: '$z_x=3x^2e^{x^3+y^3}$ より $z_{xy}=3x^2\\cdot3y^2\\cdot e^{x^3+y^3}=9x^2y^2e^{x^3+y^3}$',
  },
  // --- No.11 高次偏導関数(2) ---
  {
    type: 'handwriting',
    question: '$z=x^2y$ の $z_{yy}$ を求めよ。',
    answer: '$z_y=x^2$ より $z_{yy}=0$',
  },
  {
    type: 'handwriting',
    question: '$z=(x+3y)^3$ の $z_{xx}$ を求めよ。',
    answer: '$z_x=3(x+3y)^2$ より $z_{xx}=6(x+3y)$',
  },
  {
    type: 'handwriting',
    question: '$z=xy+x+y+x^4y^5$ の $z_{xy}$ を求めよ。',
    answer: '$z_x=y+1+4x^3y^5$ より $z_{xy}=1+20x^3y^4$',
  },
  {
    type: 'handwriting',
    question: '$z=\\log(xy)$ の $z_{yx}$ を求めよ。',
    answer: '$z_y=\\dfrac{x}{xy}=\\dfrac{1}{y}$ より $z_{yx}=0$',
  },
  // --- No.12 極大・極小(1) ---
  {
    type: 'handwriting',
    question: '$f(x,y)=-x^2+y^2-1$ について、$f_x=0$ かつ $f_y=0$ となる点 $(x,y)$ を求めよ。',
    answer: '$f_x=-2x$、$f_y=2y$ より、求める点は $(0,0)$',
  },
  {
    type: 'handwriting',
    question: '$f(x,y)=3x^2+y^2+2y$ について、$f_x=0$ かつ $f_y=0$ となる点 $(x,y)$ を求めよ。',
    answer: '$f_x=6x$、$f_y=2y+2$ より、求める点は $(0,-1)$',
  },
  {
    type: 'handwriting',
    question: '$f(x,y)=x^2-y^2+6x+2y+2$ について、$f_x=0$ かつ $f_y=0$ となる点 $(x,y)$ を求めよ。',
    answer: '$f_x=2x+6$、$f_y=-2y+2$ より、求める点は $(-3,1)$',
  },
  {
    type: 'handwriting',
    question: '$f(x,y)=x^2-3xy+y^2+x+3y$ について、$f_x=0$ かつ $f_y=0$ となる点 $(x,y)$ を求めよ。',
    answer: '$f_x=2x-3y+1$、$f_y=-3x+2y+3$ の連立を解いて、求める点は $\\left(\\dfrac{11}{5},\\dfrac{9}{5}\\right)$',
  },
  // --- No.13 極大・極小(2) ---
  {
    type: 'handwriting',
    question: '$f(x,y)=x^2-y^2+2y+2$ について、$f_x=0$ かつ $f_y=0$ となる点 $(x,y)$ を求めよ。',
    answer: '$f_x=2x$、$f_y=-2y+2$ より、求める点は $(0,1)$',
  },
  {
    type: 'handwriting',
    question: '$f(x,y)=x^2+3y^2+2x-6y$ について、$f_x=0$ かつ $f_y=0$ となる点 $(x,y)$ を求めよ。',
    answer: '$f_x=2x+2$、$f_y=6y-6$ より、求める点は $(-1,1)$',
  },
  {
    type: 'handwriting',
    question: '$f(x,y)=x^2-y^2+2y+2$ について、$H=f_{xx}f_{yy}-f_{xy}^{\\,2}$ を求めよ。',
    answer: '$f_{xx}=2$、$f_{yy}=-2$、$f_{xy}=0$ より $H=2\\cdot(-2)-0^2=-4$',
  },
  {
    type: 'handwriting',
    question: '$f(x,y)=x^2+3y^2+2x-6y$ について、$H=f_{xx}f_{yy}-f_{xy}^{\\,2}$ を求めよ。',
    answer: '$f_{xx}=2$、$f_{yy}=6$、$f_{xy}=0$ より $H=2\\cdot6-0^2=12$',
  },
  // --- No.14 極大・極小(3) ---
  {
    type: 'handwriting',
    question: '$f(x,y)=x^2+y^2-4x+6y$ について、$f_x=0$ かつ $f_y=0$ となる点 $(x,y)$ を求めよ。',
    answer: '$f_x=2x-4$、$f_y=2y+6$ より、求める点は $(2,-3)$',
  },
  {
    type: 'handwriting',
    question: '$f(x,y)=x^2+y^2-4x+6y$ について、$H=f_{xx}f_{yy}-f_{xy}^{\\,2}$ を求めよ。',
    answer: '$f_{xx}=2$、$f_{yy}=2$、$f_{xy}=0$ より $H=2\\cdot2-0^2=4$',
  },
  {
    type: 'handwriting',
    question: '$f(x,y)=x^2+y^2-4x+6y$ の極値を求めよ。',
    answer:
      '点 $(2,-3)$ において $H=4>0$ かつ $f_{xx}=2>0$ より、極小値 $f(2,-3)=4+9-8-18=-13$',
  },
  {
    type: 'handwriting',
    question:
      '$f(x,y)=2x^2-y^2+1$ について、$f_x=0$ かつ $f_y=0$ となる点をすべて求め、$H=f_{xx}f_{yy}-f_{xy}^{\\,2}$ を計算して、極値をもたないことを示せ。',
    answer:
      '$f_x=4x$、$f_y=-2y$ より点は $(0,0)$。$f_{xx}=4$、$f_{yy}=-2$、$f_{xy}=0$ より $H=4\\cdot(-2)-0=-8<0$。よって点 $(0,0)$ で $H<0$ なので極値なし。',
  },
];
