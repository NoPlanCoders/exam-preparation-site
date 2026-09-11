import type { Question } from '../../types.js';

// 「4I 前期期末試験」> 制御工学(記述式)
// 出典: 制御工学 前期範囲の講義資料
// choice.ts と同じ内容を記述式で出題。
// answerは配列の先頭をLaTeX表示用(正解表示にKaTeXで整形表示される)にし、
// 以降の要素は採点用の別解(プレーンテキスト入力にマッチする)として残している。
export const questions: Question[] = [
  {
    type: 'text',
    question: '直角三角形で、斜辺をM、Mに対する対辺をb、隣辺をaとするとき、$\\tan\\theta$をaとbで表す式を答えよ。',
    answer: ['$\\tan\\theta = b/a$', 'b/a', 'tanθ=b/a', 'tan θ = b/a'],
  },
  {
    type: 'text',
    question: 'オイラーの公式を答えよ。',
    answer: ['$e^{j\\theta} = \\cos\\theta + j\\sin\\theta$', 'e^(jθ)=cosθ+jsinθ', 'e^jθ=cosθ+jsinθ', 'cosθ+jsinθ'],
  },
  {
    type: 'text',
    question: '複素数 $A = a + bj$ における虚数単位jが満たす関係式を答えよ。',
    answer: ['$j^2 = -1$', 'j²=-1', 'j^2=-1', 'j2=-1'],
  },
  {
    type: 'text',
    question: '複素数 $A = a + bj$ の虚部$\\mathrm{Im}[A]$を答えよ(jを含めるかどうかに注意)。',
    answer: ['b'],
  },
  {
    type: 'text',
    question: '複素数 $5 - 4j$ の虚部を答えよ。',
    answer: ['-4', '−4'],
  },
  {
    type: 'text',
    question: '複素数の極座標形式 $A = Me^{j\\theta}$ について、Mが表すものを答えよ。',
    answer: ['大きさ', '複素数の大きさ', '絶対値'],
  },
  {
    type: 'text',
    question: '$A = a + bj$ を極座標形式に変換するとき、Mをaとbで表す式を答えよ。',
    answer: ['$M = \\sqrt{a^2 + b^2}$', '√(a²+b²)', 'M=√(a²+b²)', 'sqrt(a^2+b^2)'],
  },
  {
    type: 'text',
    question: '$A = a + bj$ を極座標形式に変換するとき、θをaとbで表す式を答えよ。',
    answer: ['$\\theta = \\tan^{-1}(b/a)$', 'tan⁻¹(b/a)', 'θ=tan⁻¹(b/a)', 'tan^-1(b/a)'],
  },
  {
    type: 'text',
    question: '複素数 $(3+4j) + (2+5j)$ を計算せよ。',
    answer: ['$5 + 9j$', '5+9j', '5 + 9j'],
  },
  {
    type: 'text',
    question: '複素数の掛け算 $(3+4j) \\times (2+5j)$ を計算せよ。',
    answer: ['$-14 + 23j$', '-14+23j', '−14+23j', '-14 + 23j'],
  },
  {
    type: 'text',
    question: '極座標形式の複素数の掛け算 $3e^{2j} \\times 4e^{3j}$ を計算せよ。',
    answer: ['$12e^{5j}$', '12e^(5j)', '12e^5j'],
  },
  {
    type: 'text',
    question: '$(2+3j)/(3+4j)$ を実数化するために分子分母に掛けるべき複素数を答えよ。',
    answer: ['$3 - 4j$', '3-4j', '3−4j', '3 - 4j'],
  },
  {
    type: 'text',
    question: '$(2+3j)/(3+4j)$ を計算せよ。',
    answer: ['$18/25 + (1/25)j$', '18/25+(1/25)j', '18/25 + j/25', '18/25+j/25'],
  },
  {
    type: 'text',
    question: '積分 $\\displaystyle\\int f(x)dx$ が表しているものを一言で答えよ。',
    answer: ['面積'],
  },
  {
    type: 'text',
    question: '単位インパルス関数(デルタ関数)$\\delta(t)$の値は、tが0のとき、0でないときそれぞれいくらか答えよ。',
    answer: ['t=0で∞、それ以外で0', 't=0のとき∞、それ以外0'],
  },
  {
    type: 'text',
    question: 'デルタ関数$\\delta(t+3)$が無限大になるtの値を答えよ。',
    answer: ['$t = -3$', '-3', '−3', 't=-3'],
  },
  {
    type: 'text',
    question: '$\\displaystyle\\int_{-\\infty}^{\\infty} \\delta(t)\\, dt$ の値を答えよ。',
    answer: ['1'],
  },
  {
    type: 'text',
    question: '$\\displaystyle\\int_{2}^{4} \\delta(t)\\, dt$ の値を答えよ。',
    answer: ['0'],
  },
  {
    type: 'text',
    question: '$\\displaystyle\\int_{-\\infty}^{\\infty} f(t)\\delta(t)\\, dt$ の値を答えよ。',
    answer: ['f(0)'],
  },
  {
    type: 'text',
    question: '単位ステップ関数$u(t)$の値は、$t\\geq0$、$t<0$のときそれぞれいくらか答えよ。',
    answer: ['t≥0で1、t<0で0'],
  },
  {
    type: 'text',
    question: '単位インパルス関数を入力にしたときの出力を何というか答えよ。',
    answer: ['インパルス応答'],
  },
  {
    type: 'text',
    question: '単位ステップ関数を入力にしたときの出力を何というか答えよ。',
    answer: ['ステップ応答'],
  },
  {
    type: 'text',
    question: '$3\\sin(2t)$という波の振幅と周波数をそれぞれ答えよ。',
    answer: ['振幅3、周波数2'],
  },
  {
    type: 'text',
    question: '波の周期と周波数の間に成り立つ関係式を答えよ。',
    answer: ['周期×周波数=2π', '周期×周波数=2π'],
  },
  {
    type: 'text',
    question: 'フーリエ変換が行っていることを一言で答えよ。',
    answer: ['時間領域を周波数領域にする(変換)', '時間領域を周波数領域にすること'],
  },
  {
    type: 'text',
    question: 'ある関数f(t)がフーリエ変換できるための条件を式で答えよ。',
    answer: ['$\\displaystyle\\int |f(t)|\\, dt < \\infty$', '∫|f(t)|dt<∞', '∫[−∞,∞]|f(t)|dt<∞'],
  },
  {
    type: 'text',
    question: '単位ステップ関数がフーリエ変換できない理由を簡潔に答えよ。',
    answer: ['∫|f(t)|dtが無限大になってしまうから', '面積が無限になるから'],
  },
  {
    type: 'text',
    question: '制御工学でフーリエ変換の代わりにラプラス変換がよく使われる理由を簡潔に答えよ。',
    answer: [
      'フーリエ変換には収束条件の制限があり単位ステップ関数などが変換できないため',
      '収束条件の制限があるため',
    ],
  },
  {
    type: 'text',
    question: 'ラプラス変換の定義式を答えよ。',
    answer: ['$F(s) = \\displaystyle\\int_0^\\infty f(t)e^{-st}\\, dt$', 'F(s)=∫[0,∞]f(t)e^(-st)dt', 'F(s)=∫0∞f(t)e^(-st)dt'],
  },
  {
    type: 'text',
    question: '関数f(t)をラプラス変換したものを表す記法を答えよ。',
    answer: ['L[f(t)]'],
  },
  {
    type: 'text',
    question: 'ラプラス変換の線形性(加法定理)を式で答えよ。',
    answer: [
      '$L[f_1(t) \\pm f_2(t)] = L[f_1(t)] \\pm L[f_2(t)]$',
      'L[f1(t)±f2(t)]=L[f1(t)]±L[f2(t)]',
      'L[f1±f2]=L[f1]±L[f2]',
    ],
  },
  {
    type: 'text',
    question: 'ラプラス変換の定数倍の性質を式で答えよ。',
    answer: ['$L[kf(t)] = kL[f(t)]$', 'L[kf(t)]=kL[f(t)]'],
  },
  {
    type: 'text',
    question: '微分のラプラス変換の公式を答えよ。',
    answer: ['$L[df(t)/dt] = sF(s) - f(0)$', 'L[df(t)/dt]=sF(s)-f(0)', 'sF(s)-f(0)'],
  },
  {
    type: 'text',
    question: '積分1回分のラプラス変換の公式を答えよ。',
    answer: ['$L[\\int f(t)dt] = F(s)/s$', 'L[∫f(t)dt]=F(s)/s', 'F(s)/s'],
  },
  {
    type: 'text',
    question: '時間遅れτを持つ関数$f(t-\\tau)$のラプラス変換の公式を答えよ。',
    answer: ['$L[f(t-\\tau)] = e^{-\\tau s}F(s)$', 'L[f(t-τ)]=e^(-τs)F(s)', 'e^(-τs)F(s)'],
  },
  {
    type: 'text',
    question: '最終値の定理を式で答えよ。',
    answer: [
      '$\\lim_{t\\to\\infty} f(t) = \\lim_{s\\to0} sF(s)$',
      'lim(t→∞)f(t)=lim(s→0)sF(s)',
      'lim t→∞ f(t) = lim s→0 sF(s)',
    ],
  },
  {
    type: 'text',
    question: '部分分数分解とは何を行うことか、簡潔に答えよ。',
    answer: ['1つの分数を2つ以上の分数の和に分解すること', '分数を分解すること'],
  },
  {
    type: 'text',
    question:
      '$\\dfrac{7x+17}{(x+2)(x+3)}$ を $\\dfrac{A}{x+2} + \\dfrac{B}{x+3}$ の形に部分分数分解するとき、Aを求めるために代入するxの値を答えよ。',
    answer: ['$x = -2$', '-2', '−2', 'x=-2'],
  },
  {
    type: 'text',
    question: '$\\dfrac{7x+17}{(x+2)(x+3)}$ を $\\dfrac{A}{x+2} + \\dfrac{B}{x+3}$ の形に部分分数分解したときの、A、Bの値をそれぞれ答えよ。',
    answer: ['$A=3, B=4$', 'A=3, B=4', 'A=3、B=4'],
  },
  {
    type: 'text',
    question: '円の方程式 $x^2 + y^2 = r^2$ が表す図形を答えよ。',
    answer: ['中心(0,0)、半径rの円', '原点中心、半径rの円'],
  },
  {
    type: 'text',
    question: '関数$y=f(x)$をx方向にa、y方向にbだけずらした式を答えよ。',
    answer: ['$y - b = f(x - a)$', 'y-b=f(x-a)', 'y−b=f(x−a)'],
  },
  {
    type: 'text',
    question: '$(y-3)^2 + (x+2)^2 = 3^2$ が表す円の中心(x,y)と半径をそれぞれ答えよ。',
    answer: ['中心(-2,3)、半径3', '中心(−2,3)、半径3'],
  },
  {
    type: 'text',
    question: '周波数伝達関数とは何か、簡潔に答えよ。',
    answer: ['伝達関数のsをjωに変えたもの', '伝達関数のsをjωにしたもの'],
  },
  {
    type: 'text',
    question: '周波数伝達関数は、どのような入力に対する特性を表現するものか答えよ。',
    answer: ['正弦波(sinの波)入力', '正弦波入力'],
  },
  {
    type: 'text',
    question: '伝達関数が$G(s)=s+3$のシステムの周波数伝達関数$G(j\\omega)$を答えよ。',
    answer: ['$j\\omega + 3$', 'jω+3', 'jω + 3'],
  },
  {
    type: 'text',
    question: '伝達関数が$G(s)=3s^2+s+4$のシステムの周波数伝達関数$G(j\\omega)$を答えよ。',
    answer: ['$-3\\omega^2 + j\\omega + 4$', '-3ω²+jω+4', '−3ω²+jω+4'],
  },
  {
    type: 'text',
    question: 'ナイキスト線図とは何を描いた図か、簡潔に答えよ。',
    answer: ['G(jω)のωを0から∞まで変化させたときの軌跡', 'G(jω)の軌跡'],
  },
  {
    type: 'text',
    question: '微分要素の伝達関数G(s)を答えよ。',
    answer: ['$G(s) = s$', 's', 'G(s)=s'],
  },
  {
    type: 'text',
    question: '積分要素の伝達関数G(s)を答えよ。',
    answer: ['$G(s) = 1/s$', '1/s', 'G(s)=1/s'],
  },
  {
    type: 'text',
    question: '微分要素$G(s)=s$の周波数応答$G(j\\omega)$を答えよ。',
    answer: ['$j\\omega$', 'jω', 'G(jω)=jω'],
  },
  {
    type: 'text',
    question: '微分要素のナイキスト線図の実部と、ωが大きくなったときの虚部の変化を答えよ。',
    answer: ['実部は常に0で、虚部は+∞へ伸びる', '実部0、虚部が+∞に伸びる'],
  },
  {
    type: 'text',
    question: '微分要素$G(s)=s$のステップ応答y(t)を答えよ。',
    answer: ['$\\delta(t)$', 'δ(t)', 'y(t)=δ(t)'],
  },
  {
    type: 'text',
    question: '積分要素$G(s)=1/s$の周波数応答$G(j\\omega)$を答えよ。',
    answer: ['$1/(j\\omega)$', '1/(jω)', 'G(jω)=1/(jω)'],
  },
  {
    type: 'text',
    question: '積分要素のナイキスト線図の実部と、ω=0のときの虚部を答えよ。',
    answer: ['実部は常に0で、虚部は−∞', '実部0、虚部が-∞'],
  },
  {
    type: 'text',
    question: '積分要素$G(s)=1/s$のステップ応答y(t)を答えよ。',
    answer: ['$t \\cdot u(t)$', 't·u(t)', 'y(t)=t·u(t)', 'tu(t)'],
  },
  {
    type: 'text',
    question: '1次遅れ要素の伝達関数G(s)を答えよ。',
    answer: ['$1/(1+sT)$', '1/(1+sT)', 'G(s)=1/(1+sT)'],
  },
  {
    type: 'text',
    question: '1次進み要素の伝達関数G(s)を答えよ。',
    answer: ['$1 + sT$', '1+sT', 'G(s)=1+sT'],
  },
  {
    type: 'text',
    question: '一般的な閉ループ(フィードバック系)の伝達関数$G_o(s)$を、G(s)とH(s)で表す式を答えよ。',
    answer: ['$G(s)/(1+G(s)H(s))$', 'G(s)/(1+G(s)H(s))', 'Go(s)=G(s)/(1+G(s)H(s))'],
  },
  {
    type: 'text',
    question: '制御工学における「極」とは何か、簡潔に答えよ。',
    answer: ['伝達関数の分母が0になる値', '分母が0になる値'],
  },
  {
    type: 'text',
    question: '$G_o(s) = 3/(s+2)$ の極を答えよ。',
    answer: ['$s = -2$', '-2', '−2', 's=-2'],
  },
  {
    type: 'text',
    question: '$G_o(s) = 1234/((s+3)(s-5))$ の極をすべて答えよ。',
    answer: ['$s = -3, 5$', '-3と5', 's=-3, 5', '−3, 5'],
  },
  {
    type: 'text',
    question: '極が複素平面の左側にあるとき、システムの安定性はどう判定されるか答えよ。',
    answer: ['安定'],
  },
  {
    type: 'text',
    question: '極が虚軸上にあるとき、システムの安定性はどう判定されるか答えよ。',
    answer: ['安定限界'],
  },
  {
    type: 'text',
    question: '特性方程式を式で答えよ。',
    answer: ['$1 + G(s)H(s) = 0$', '1+G(s)H(s)=0'],
  },
  {
    type: 'text',
    question: '特性方程式の解を何というか答えよ。',
    answer: ['特性根'],
  },
  {
    type: 'text',
    question: 'G(s)=s、H(s)=0.5のときの特性方程式を答えよ。',
    answer: ['$1 + 0.5s = 0$', '1+0.5s=0'],
  },
  {
    type: 'text',
    question: 'G(s)=s、H(s)=0.5のときの特性根と、その安定性を答えよ。',
    answer: ['$s = -2$で安定', 's=-2で安定', 's=−2、安定'],
  },
  {
    type: 'text',
    question: 'ラウスの安定判別法が使われるのはどのような場合か、簡潔に答えよ。',
    answer: [
      '特性方程式の次数が高く極を直接求めるのが難しい場合',
      '極を求めるのが難しい場合',
    ],
  },
  {
    type: 'text',
    question: 'ラウス配列を作るとき、最初に行うことを答えよ。',
    answer: ['sの最大次数を見つける'],
  },
  {
    type: 'text',
    question:
      '特性方程式$2s^4+s^3+3s^2+5s+10=0$についてラウス配列を作るとき、$s^4$行と$s^3$行に入る数値をそれぞれ答えよ。',
    answer: ['s⁴行: 2, 3, 10 / s³行: 1, 5, 0', 's4行2,3,10 s3行1,5,0'],
  },
  {
    type: 'text',
    question:
      '特性方程式$2s^4+s^3+3s^2+5s+10=0$のラウス配列で、$s^4$行(2,3,10)と$s^3$行(1,5,0)から、$s^2$行の1列目の値を求めよ。',
    answer: ['$-7$', '-7', '−7'],
  },
  {
    type: 'text',
    question: '特性方程式$2s^4+s^3+3s^2+5s+10=0$のラウス配列の一番左の列を計算し、この系が安定か不安定かを答えよ。',
    answer: ['不安定', '2,1,-7,6.43,10で符号が変化するため不安定'],
  },
  {
    type: 'text',
    question: 'ラウス配列の一番左の列の符号がすべて同じであるとき、システムはどう判定されるか答えよ。',
    answer: ['安定'],
  },
  {
    type: 'text',
    question:
      'ナイキストの安定判別法の単純な場合(開ループ伝達関数G(s)H(s)の極が複素平面の右半面にない場合)、どのようなときに不安定と判定するか答えよ。',
    answer: [
      'ナイキスト線図に沿って動いたとき点−1が右にあるとき',
      '点-1が右にあるとき',
    ],
  },
];
