import type { Question } from '../../types.js';

// 「4I 前期期末試験」> 応用物理(選択式)
// 出典: 応用物理 前期期末直前対策プリント(令和8年度)に記載されている問題のみを収録。
// 内容: 加速度・仕事・保存力・力のモーメント・角運動量の基本公式、
//       位置x(t)から速度・加速度を求める計算、空気抵抗を受ける投げ上げ運動の微分方程式、
//       等速円運動の角運動量とIωの一致確認。
export const questions: Question[] = [
  // --- 【1】基本公式 ---
  {
    type: 'choice',
    question:
      'ある物体の時間ごとの位置が$x(t)$で表されるとき、その物体の加速度はどのように計算することができるか。',
    choices: [
      '$a = \\dfrac{d^2x(t)}{dt^2}$',
      '$a = \\dfrac{dx(t)}{dt}$',
      '$a = \\displaystyle\\int x(t)\\, dt$',
      '$a = x(t)^2$',
    ],
    answer: 0,
    explanations: [
      '正しい。加速度は位置を時間で2階微分したもの(速度$v=dx/dt$をさらに時間で微分したもの)であり、$a=d^2x(t)/dt^2$である。',
      'これは速度$v$の定義であり、加速度ではない。',
      '位置を時間で積分しても加速度は求まらない(積分は速度・加速度から位置を求める向きの操作)。',
      '位置を2乗しても物理的に加速度にはならない。',
    ],
  },
  {
    type: 'choice',
    question:
      '一般に、位置$\\vec{r}$[m]にある物体に働く力$\\vec{F}$[N]に対して物体の動く軌跡が曲線であるとき、その力が物体にした仕事はいくらか。',
    choices: [
      '$W = \\displaystyle\\int \\vec{F}\\cdot d\\vec{r}$',
      '$W = \\vec{F}\\cdot\\vec{r}$',
      '$W = \\displaystyle\\int |\\vec{F}|\\, dr$',
      '$W = \\vec{F}\\times\\vec{r}$',
    ],
    answer: 0,
    explanations: [
      '正しい。軌跡が曲線の場合、力と微小変位の内積を経路に沿って積分した$W=\\int \\vec{F}\\cdot d\\vec{r}$が仕事になる。',
      '積分を行わない単純な内積は、力が一定で直線的に動く特別な場合にしか使えず、曲線の軌跡には対応できない。',
      '力の向きを考慮せず大きさだけを積分しており、内積(力の変位方向の成分)を取っていないため誤り。',
      '外積は仕事(スカラー量)ではなくベクトル量を与えてしまうため、仕事の定義として誤り。',
    ],
  },
  {
    type: 'choice',
    question: '保存力$\\vec{F}$[N]は、位置エネルギー$U$[J]を用いて、どのように表すことができるか。',
    choices: [
      '$\\vec{F} = -\\dfrac{\\partial U}{\\partial \\vec{r}}$',
      '$\\vec{F} = \\dfrac{\\partial U}{\\partial \\vec{r}}$',
      '$\\vec{F} = -U$',
      '$\\vec{F} = -\\dfrac{\\partial \\vec{r}}{\\partial U}$',
    ],
    answer: 0,
    explanations: [
      '正しい。保存力は位置エネルギーの勾配にマイナスをつけたもの、$\\vec{F}=-\\partial U/\\partial \\vec{r}$(=$-\\nabla U$)で表される。',
      'マイナス符号が抜けている。符号を落とすと、力は位置エネルギーが増える向きを向いてしまい、物理的に誤りになる。',
      '微分(勾配)を取らずに位置エネルギーそのものを力としており、次元的にも定義的にも誤り。',
      '分子と分母(微分する変数とされる変数)が逆になっており、正しい勾配の式ではない。',
    ],
  },
  {
    type: 'choice',
    question: '位置$\\vec{r}$[m]にある物体に働く力が$\\vec{F}$[N]のとき、この物体の力のモーメント$\\vec{N}$を求めなさい。',
    choices: [
      '$\\vec{N} = \\vec{r} \\times \\vec{F}$',
      '$\\vec{N} = \\vec{F} \\times \\vec{r}$',
      '$\\vec{N} = \\vec{r} \\cdot \\vec{F}$',
      '$\\vec{N} = \\vec{r} + \\vec{F}$',
    ],
    answer: 0,
    explanations: [
      '正しい。力のモーメントは位置ベクトルと力ベクトルの外積$\\vec{N}=\\vec{r}\\times\\vec{F}$で定義される。',
      '外積の順序が逆になっている。$\\vec{F}\\times\\vec{r}=-(\\vec{r}\\times\\vec{F})$となり、向きが逆になってしまう。',
      '内積を取るとスカラー量になってしまい、力のモーメント(ベクトル量)の定義として誤り。',
      '単純な足し算では力のモーメントの定義(位置と力の関係性)を表せない。',
    ],
  },
  {
    type: 'choice',
    question: '位置$\\vec{r}$[m]にある物体の運動量が$\\vec{P}$[kg m/s]のとき、角運動量$\\vec{L}$を書き下せ。',
    choices: [
      '$\\vec{L} = \\vec{r} \\times \\vec{P}$',
      '$\\vec{L} = \\vec{P} \\times \\vec{r}$',
      '$\\vec{L} = \\vec{r} \\cdot \\vec{P}$',
      '$\\vec{L} = \\vec{r}\\,\\vec{P}$',
    ],
    answer: 0,
    explanations: [
      '正しい。角運動量は位置ベクトルと運動量ベクトルの外積$\\vec{L}=\\vec{r}\\times\\vec{P}$で定義される。',
      '外積の順序が逆になっている。$\\vec{P}\\times\\vec{r}=-(\\vec{r}\\times\\vec{P})$となり、向きが逆になってしまう。',
      '内積を取るとスカラー量になってしまい、角運動量(ベクトル量)の定義として誤り。',
      'ベクトル同士の単純な積という表現は定義されておらず、外積を用いる正しい定義ではない。',
    ],
  },
  // --- 【2】位置x(t)から速度・加速度を求める ---
  {
    type: 'choice',
    question: '$x = t + 10$ のとき、速度$v$と加速度$a$の組み合わせとして正しいものはどれか。(ただし$t$以外は定数)',
    choices: ['$v=1,\\ a=0$', '$v=t,\\ a=1$', '$v=1,\\ a=1$', '$v=0,\\ a=0$'],
    answer: 0,
    explanations: [
      '正しい。$v=dx/dt=1$、$a=dv/dt=0$(定数1をさらに微分すると0になる)。',
      '$x=t+10$を1回微分すると$v=1$(定数)になり、$v=t$にはならない。',
      '$v=1$は正しいが、定数1をもう一度微分すると$a=0$になり、$a=1$は誤り。',
      '$x$には$t$の項があるため速度は0にならない。$v=1$、$a=0$が正しい。',
    ],
  },
  {
    type: 'choice',
    question: '$x = -gt^2 + b$ のとき、速度$v$と加速度$a$の組み合わせとして正しいものはどれか。(ただし$t$以外は定数)',
    choices: ['$v=-2gt,\\ a=-2g$', '$v=-gt,\\ a=-g$', '$v=2gt,\\ a=2g$', '$v=-2gt+b,\\ a=-2g$'],
    answer: 0,
    explanations: [
      '正しい。$v=dx/dt=-2gt$、$a=dv/dt=-2g$($b$は定数なので微分すると消える)。',
      'べき乗の微分で係数2を掛け忘れている。$d(t^2)/dt=2t$なので$v=-2gt$が正しく、$-gt$ではない。',
      '符号が反転している。もとの式の$-gt^2$の符号を正しく引き継ぐと$v=-2gt$、$a=-2g$になる。',
      '定数$b$は微分すると消えるため、速度の式に$b$が残るのは誤り。',
    ],
  },
  {
    type: 'choice',
    question: '$x = A\\cos\\omega t$ のとき、速度$v$と加速度$a$の組み合わせとして正しいものはどれか。(ただし$t$以外は定数)',
    choices: [
      '$v=-A\\omega\\sin\\omega t,\\ a=-A\\omega^2\\cos\\omega t$',
      '$v=A\\omega\\sin\\omega t,\\ a=A\\omega^2\\cos\\omega t$',
      '$v=-A\\omega\\sin\\omega t,\\ a=A\\omega^2\\sin\\omega t$',
      '$v=-A\\sin\\omega t,\\ a=-A\\omega\\cos\\omega t$',
    ],
    answer: 0,
    explanations: [
      '正しい。$d(\\cos\\omega t)/dt=-\\omega\\sin\\omega t$より$v=-A\\omega\\sin\\omega t$。さらに微分すると$a=-A\\omega^2\\cos\\omega t$になる。',
      '$\\cos$を微分すると$-\\sin$になるはずが符号が反転しており誤り。',
      '加速度を求める際に$\\sin$を微分すると$\\cos$になるはずが、関数の形($\\sin$のまま)が誤っている。',
      '角速度$\\omega$を掛け忘れている(それぞれ1つずつ$\\omega$が不足している)。',
    ],
  },
  {
    type: 'choice',
    question:
      '$x = a\\exp\\!\\left(-\\dfrac{c}{m}t\\right)$ のとき、速度$v$と加速度$a$(加速度は$\\alpha$と表す)の組み合わせとして正しいものはどれか。(ただし$t$以外は定数)',
    choices: [
      '$v=-\\dfrac{ac}{m}e^{-\\frac{c}{m}t},\\ \\alpha=\\dfrac{ac^2}{m^2}e^{-\\frac{c}{m}t}$',
      '$v=\\dfrac{ac}{m}e^{-\\frac{c}{m}t},\\ \\alpha=-\\dfrac{ac^2}{m^2}e^{-\\frac{c}{m}t}$',
      '$v=-\\dfrac{a}{m}e^{-\\frac{c}{m}t},\\ \\alpha=\\dfrac{a}{m^2}e^{-\\frac{c}{m}t}$',
      '$v=-ac\\, e^{-\\frac{c}{m}t},\\ \\alpha=ac^2 e^{-\\frac{c}{m}t}$',
    ],
    answer: 0,
    explanations: [
      '正しい。指数関数の微分より$v=a\\times\\left(-\\dfrac{c}{m}\\right)e^{-\\frac{c}{m}t}=-\\dfrac{ac}{m}e^{-\\frac{c}{m}t}$、さらに微分して$\\alpha=\\dfrac{ac^2}{m^2}e^{-\\frac{c}{m}t}$になる。',
      '$v$と$\\alpha$の符号がどちらも反転している。1回微分するごとに$-c/m$が掛かるため、符号は交互ではなく$v$が負・$\\alpha$が正になる。',
      '微分のたびに掛かる係数$c/m$を掛け忘れている。',
      '分母の$m$、$m^2$を掛け忘れている(次元的にも誤り)。',
    ],
  },
  // --- 【6】空気抵抗を受ける投げ上げ運動 ---
  {
    type: 'choice',
    question:
      '質量$m$[kg]の物体を速度$V_0$[m/s]で投げ上げるとき、上向きの速度$V_y$[m/s]に比例する空気抵抗$-KV_y$[N]が働く($K$は定数)。鉛直上向きを$y$軸の正の向きとするとき、この物体の運動方程式を書き下せ。',
    choices: [
      '$m\\dfrac{dV_y}{dt} = -mg - KV_y$',
      '$m\\dfrac{dV_y}{dt} = -mg + KV_y$',
      '$m\\dfrac{dV_y}{dt} = mg - KV_y$',
      '$m\\dfrac{dV_y}{dt} = -KV_y$',
    ],
    answer: 0,
    explanations: [
      '正しい。重力$-mg$と空気抵抗$-KV_y$(上向きの運動を妨げる向き=下向き)の両方が働くため、$m\\,dV_y/dt=-mg-KV_y$になる。',
      '空気抵抗の符号が誤り。上向きに運動しているとき空気抵抗は下向き(負の向き)に働くので$-KV_y$が正しく、$+KV_y$ではない。',
      '重力の符号が誤り。鉛直上向きを正としているので重力は$-mg$であり、$+mg$ではない。',
      '重力の項が抜けている。空気抵抗だけでなく重力も常に働いている。',
    ],
  },
  {
    type: 'choice',
    question:
      '上の運動方程式を解くと、時刻$t$[s]での物体の速さ$V_y$はどのように表されるか。(物体は最初$V_0$[m/s]で投げ上げられたものとする)',
    choices: [
      '$V_y = \\left(V_0+\\dfrac{mg}{K}\\right)e^{-\\frac{K}{m}t} - \\dfrac{mg}{K}$',
      '$V_y = V_0\\, e^{-\\frac{K}{m}t} - \\dfrac{mg}{K}$',
      '$V_y = \\left(V_0-\\dfrac{mg}{K}\\right)e^{-\\frac{K}{m}t} + \\dfrac{mg}{K}$',
      '$V_y = V_0 - gt$',
    ],
    answer: 0,
    explanations: [
      '正しい。変数分離して積分し、$t=0$で$V_y=V_0$となる初期条件を使うと、$V_y=\\left(V_0+\\dfrac{mg}{K}\\right)e^{-\\frac{K}{m}t}-\\dfrac{mg}{K}$が得られる。',
      '指数関数の係数に$mg/K$を足し忘れている。初期条件$t=0,V_y=V_0$を代入すると、この式では正しく$V_0$にならない。',
      '$mg/K$の符号が正しい式と逆になっている。',
      'これは空気抵抗を考えない($K=0$)場合の速度の式であり、空気抵抗がある場合の正しい解ではない。',
    ],
  },
  {
    type: 'choice',
    question: '上の物体が最高点に達するまでの時間はいくらか。',
    choices: [
      '$t = \\dfrac{m}{K}\\ln\\!\\left(\\dfrac{KV_0+mg}{mg}\\right)$',
      '$t = \\dfrac{V_0}{g}$',
      '$t = \\dfrac{m}{K}\\ln\\!\\left(\\dfrac{mg}{KV_0+mg}\\right)$',
      '$t = \\dfrac{K}{m}\\ln\\!\\left(\\dfrac{KV_0+mg}{mg}\\right)$',
    ],
    answer: 0,
    explanations: [
      '正しい。$V_y=0$とおいて$t$について解くと、$t=\\dfrac{m}{K}\\ln\\!\\left(\\dfrac{KV_0+mg}{mg}\\right)$が得られる。',
      'これは空気抵抗を考えない($K=0$)場合の最高点到達時刻であり、空気抵抗がある場合の正しい解ではない。',
      '対数の中の分数が逆になっている(この形だと対数の中身が1より小さくなり、$t$が負になってしまう)。',
      '$m/K$と$K/m$が入れ替わっている。',
    ],
  },
  // --- 【9】等速円運動の角運動量 ---
  {
    type: 'choice',
    question:
      '質量$m=1.0$kgの粒子が、半径$r=1.0$mの円周上を、速さ$v=2.0$m/sで等速円運動している。粒子の角運動量の大きさを求めよ。',
    choices: ['$2.0\\ \\text{kg}\\cdot\\text{m}^2/\\text{s}$', '$1.0\\ \\text{kg}\\cdot\\text{m}^2/\\text{s}$', '$4.0\\ \\text{kg}\\cdot\\text{m}^2/\\text{s}$', '$0.5\\ \\text{kg}\\cdot\\text{m}^2/\\text{s}$'],
    answer: 0,
    explanations: [
      '正しい。円運動する粒子の角運動量の大きさは$L=rmv=1.0\\times1.0\\times2.0=2.0\\ \\text{kg}\\cdot\\text{m}^2/\\text{s}$である。',
      '$r$、$m$、$v$のいずれか1つを掛け忘れる計算ミスをすると、この値になってしまう。',
      '速さ$v$を2乗して$L=mv^2=1.0\\times(2.0)^2=4.0$と計算してしまうと、この誤った値になる(角運動量の定義は$v$の1乗であり2乗ではない)。',
      '$L=rmv$の計算を誤って半分にしてしまった値であり、正しい計算結果ではない。',
    ],
  },
  {
    type: 'choice',
    question:
      '上の粒子について、慣性モーメント$I=mr^2$と角速度$\\omega=v/r$を用いて$I\\omega$を計算すると、上で求めた角運動量$L$とどうなるか。',
    choices: [
      '$I\\omega=2.0\\ \\text{kg}\\cdot\\text{m}^2/\\text{s}$となり、$L$と一致する',
      '$I\\omega=4.0\\ \\text{kg}\\cdot\\text{m}^2/\\text{s}$となり、$L$と一致しない',
      '$I\\omega=1.0\\ \\text{kg}\\cdot\\text{m}^2/\\text{s}$となり、$L$と一致しない',
      '$I\\omega$は角運動量とは異なる物理量なので、そもそも比較できない',
    ],
    answer: 0,
    explanations: [
      '正しい。$I=mr^2=1.0\\times(1.0)^2=1.0\\ \\text{kg}\\cdot\\text{m}^2$、$\\omega=v/r=2.0/1.0=2.0\\ \\text{rad/s}$より$I\\omega=1.0\\times2.0=2.0\\ \\text{kg}\\cdot\\text{m}^2/\\text{s}$となり、角運動量$L=2.0\\ \\text{kg}\\cdot\\text{m}^2/\\text{s}$と一致する。',
      '$I$や$\\omega$の計算を誤らない限りこの値にはならず、正しくは2.0になる。',
      '$I$や$\\omega$の計算を誤らない限りこの値にはならず、正しくは2.0になる。',
      '円運動する質点については$I\\omega=mr^2\\times(v/r)=rmv=L$であり、$I\\omega$は角運動量そのものと一致する量である。',
    ],
  },
];
