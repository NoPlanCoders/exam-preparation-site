import type { Question } from '../../types.js';

export const questions: Question[] = [
  {
    type: 'text',
    question: 'メカトロニクスの3要素は「センサ」「コントローラ」ともう1つは何か。',
    answer: 'アクチュエータ',
  },
  {
    type: 'text',
    question: 'メカトロニクスの3要素のうち、外部の状態を検出する要素を何というか。',
    answer: 'センサ',
  },
  {
    type: 'text',
    question: 'メカトロニクスの3要素のうち、得られた情報を処理して指令を出す要素を何というか。',
    answer: 'コントローラ',
  },
  {
    type: 'text',
    question: 'メカトロニクスの3要素のうち、指令に従って実際に動作する要素を何というか。',
    answer: 'アクチュエータ',
  },
  {
    type: 'text',
    question: 'エネルギーを並進または回転運動に変換して物を動かす装置を何というか。',
    answer: 'アクチュエータ',
  },
  {
    type: 'text',
    question: 'ダイオードが持つ、電流を一方向にだけ流す性質を何というか。',
    answer: '整流作用',
  },
  {
    type: 'text',
    question: 'ダイオードの陽極(プラス側)を何というか。',
    answer: 'アノード',
  },
  {
    type: 'text',
    question: 'ダイオードの陰極(マイナス側)を何というか。',
    answer: 'カソード',
  },
  {
    type: 'text',
    question: '4個のダイオードを使用した全波整流回路を何というか。',
    answer: 'ダイオードブリッジ',
  },
  {
    type: 'text',
    question: 'ツェナーダイオードは、回路の電圧をどのような状態に保つために利用されるか(漢字3文字)。',
    answer: '定電圧',
  },
  {
    type: 'text',
    question: 'ツェナーダイオードは、回路やトランジスタを何から保護する目的にも利用されるか。',
    answer: '過電圧',
  },
  {
    type: 'text',
    question: '半導体は、導体と何の中間的な電気的性質を持つか。',
    answer: '絶縁体',
  },
  {
    type: 'text',
    question: '金・銀・銅など、電気をよく通す物質を何というか。',
    answer: '導体',
  },
  {
    type: 'text',
    question: 'ガラスやエボナイトなど、電気をほとんど通さない物質を何というか。',
    answer: '絶縁体',
  },
  {
    type: 'text',
    question: '自由電子を多く持つ半導体を何というか。',
    answer: ['n型半導体', 'n型'],
  },
  {
    type: 'text',
    question: '電子が不足し、正孔(ホール)を持つ半導体を何というか。',
    answer: ['p型半導体', 'p型'],
  },
  {
    type: 'text',
    question: 'p型半導体で、電子が抜けた部分を何というか。',
    answer: ['正孔', 'ホール', '正孔(ホール)'],
  },
  {
    type: 'text',
    question: 'n型半導体とp型半導体を結合したものを何というか。',
    answer: ['pn結合', 'pn接合'],
  },
  {
    type: 'text',
    question: 'トランジスタは何でできた基本的な電子部品か。',
    answer: '半導体',
  },
  {
    type: 'text',
    question: 'トランジスタの代表的な2つの型を答えよ(順不同)。',
    answer: ['NPN型とPNP型', 'PNP型とNPN型', 'NPNとPNP'],
  },
  {
    type: 'text',
    question: 'トランジスタが持つ3つの端子の名称を答えよ(順不同)。',
    answer: ['コレクタ、ベース、エミッタ', 'コレクタ,ベース,エミッタ', 'ベース、コレクタ、エミッタ'],
  },
  {
    type: 'text',
    question: 'トランジスタが持つ、小さな入力で出力側の電流を制御する働きを何というか。',
    answer: '増幅作用',
  },
  {
    type: 'text',
    question: 'ベース電流に対するコレクタ電流の割合を表す値をアルファベットで答えよ。',
    answer: 'hFE',
  },
  {
    type: 'text',
    question: 'ベース電流を増やしてもコレクタ電流がほとんど増えなくなる状態を何というか。',
    answer: '飽和状態',
  },
  {
    type: 'text',
    question: '飽和状態のトランジスタを回路上で利用するとき、トランジスタはどのような働きをするか。',
    answer: 'スイッチ',
  },
  {
    type: 'text',
    question: 'スイッチング時に発生し、コンデンサで吸収される代表的な成分は何か。',
    answer: ['ノイズ成分', 'スイッチのオン・オフ時に発生するノイズ成分', 'ノイズ'],
  },
  {
    type: 'text',
    question: '一般的なバイポーラトランジスタでは、入力側の何によって出力電流を制御するか。',
    answer: '電流',
  },
  {
    type: 'text',
    question: 'FET(電界効果トランジスタ)では、入力側の何によって出力電流を制御するか。',
    answer: '電圧',
  },
  {
    type: 'text',
    question: 'コンデンサC₁とC₂を並列接続したときの合成静電容量の式を答えよ。',
    answer: ['C=C1+C2', 'C = C1 + C2', 'C=C₁+C₂'],
  },
  {
    type: 'text',
    question: 'コンデンサC₁とC₂を直列接続したときの合成静電容量の式を答えよ。',
    answer: ['1/C=1/C1+1/C2', '1/C = 1/C1 + 1/C2', '1/C=1/C₁+1/C₂'],
  },
  {
    type: 'text',
    question: '抵抗R₁とR₂を直列接続したときの合成抵抗の式を答えよ。',
    answer: ['R=R1+R2', 'R = R1 + R2', 'R=R₁+R₂'],
  },
  {
    type: 'text',
    question: '抵抗R₁とR₂を並列接続したときの合成抵抗の式を答えよ。',
    answer: ['1/R=1/R1+1/R2', '1/R = 1/R1 + 1/R2', '1/R=1/R₁+1/R₂'],
  },
  {
    type: 'text',
    question: 'コンデンサが電気を蓄えたり放出したりする動作をまとめて何というか。',
    answer: ['充電・放電', '充電と放電', '充放電'],
  },
  {
    type: 'text',
    question: '入力AとBがともに1のときだけ出力が1になる論理回路を何というか。',
    answer: 'AND回路',
  },
  {
    type: 'text',
    question: '入力AとBのどちらか一方でも1なら出力が1になる論理回路を何というか。',
    answer: 'OR回路',
  },
  {
    type: 'text',
    question: 'AND回路の出力を反転させた論理回路を何というか。',
    answer: 'NAND回路',
  },
  {
    type: 'text',
    question: 'OR回路の出力を反転させた論理回路を何というか。',
    answer: 'NOR回路',
  },
  {
    type: 'text',
    question: 'ダイオードとトランジスタで構成される論理回路の方式をアルファベット3文字で答えよ。',
    answer: 'DTL',
  },
  {
    type: 'text',
    question: 'DTL回路(入力A・Bのどちらかがオフのとき出力Xがオンになる回路)は、どの論理回路に相当するか。',
    answer: 'NAND回路',
  },
  {
    type: 'text',
    question: 'DTLの動作速度を上げた論理回路方式をアルファベット3文字で答えよ。',
    answer: 'TTL',
  },
  {
    type: 'text',
    question: '抵抗・ダイオード・トランジスタなどを1つのシリコンチップ上に組み上げた部品を何というか。',
    answer: ['IC', '集積回路'],
  },
  {
    type: 'text',
    question: 'SRフリップフロップで、S=0、R=0を入力したときの出力Qはどうなるか(一言で)。',
    answer: ['保持', '直前の状態を保持する', '変化しない'],
  },
  {
    type: 'text',
    question: 'SRフリップフロップで、S=1、R=0を入力したときの状態を何というか。',
    answer: 'セット',
  },
  {
    type: 'text',
    question: 'SRフリップフロップで、S=0、R=1を入力したときの状態を何というか。',
    answer: 'リセット',
  },
  {
    type: 'text',
    question: 'SRフリップフロップで、S=1、R=1を入力したときの状態を何というか。',
    answer: ['禁止', '禁止状態'],
  },
  {
    type: 'text',
    question:
      '初期状態Q=0のSRフリップフロップに、(S,R)を (1,0)→(0,0)→(0,1)→(0,0) の順に入力した。最終的なQの値を答えよ。',
    answer: ['0', 'Q=0'],
  },
  {
    type: 'text',
    question: 'クロック入力があるたびに出力が反転するフリップフロップを何というか。',
    answer: ['T-フリップフロップ', 'T-FF'],
  },
  {
    type: 'text',
    question: '10進数のデータを2進数のデータに変換する組み合わせ回路を何というか。',
    answer: 'エンコーダ',
  },
  {
    type: 'text',
    question: '2進数のデータを10進数のデータに変換する組み合わせ回路を何というか。',
    answer: 'デコーダ',
  },
  {
    type: 'text',
    question: '電圧の差を増幅する増幅回路を何というか。',
    answer: '差動増幅回路',
  },
  {
    type: 'text',
    question: '理想的なオペアンプの電圧ゲインはどれくらいとされるか。',
    answer: '無限大',
  },
  {
    type: 'text',
    question: '理想的なオペアンプの入力インピーダンスはどれくらいとされるか。',
    answer: '無限大',
  },
  {
    type: 'text',
    question: '理想的なオペアンプの出力インピーダンスはどれくらいとされるか。',
    answer: 'ゼロ',
  },
  {
    type: 'text',
    question: 'オペアンプなどで、出力結果を入力側に戻すことを何というか。',
    answer: ['帰還', 'フィードバック'],
  },
  {
    type: 'text',
    question: '増幅回路で用いられる、入力信号と逆位相の信号を戻す帰還を何というか。',
    answer: '負帰還',
  },
  {
    type: 'text',
    question: '理想OPアンプに負帰還をかけて使用するとき、非反転入力電圧V₊と反転入力電圧V₋の関係を式で答えよ。',
    answer: ['V+=V-', 'V₊=V₋', 'V+ = V-'],
  },
  {
    type: 'text',
    question: '負帰還によって、2つの入力端子があたかも同電圧になっているように見える現象を何というか。',
    answer: ['仮想短絡', 'バーチャルショート'],
  },
  {
    type: 'text',
    question: '非反転増幅回路の出力電圧V出力を、入力電圧V入力とR₁、R₂で表す式を答えよ。',
    answer: ['V出力=(1+R2/R1)V入力', 'Vout=(1+R2/R1)Vin'],
  },
  {
    type: 'text',
    question: '反転増幅回路の出力電圧V₂を、入力電圧V₁とR₁、R₂で表す式を答えよ。',
    answer: ['V2=-(R2/R1)V1', 'Vout=-(R2/R1)Vin', 'V2 = -(R2/R1)V1'],
  },
  {
    type: 'text',
    question: '反転増幅回路で V₁=0.5V、R₁=10kΩ、R₂=30kΩ のとき、出力電圧V₂はいくらか。',
    answer: ['-1.5V', '-1.5', '−1.5V'],
  },
  {
    type: 'text',
    question: 'アナログ信号をデジタル信号に変換することを何というか。',
    answer: ['A/D変換', 'AD変換'],
  },
  {
    type: 'text',
    question: 'デジタル信号をアナログ信号に変換することを何というか。',
    answer: ['D/A変換', 'DA変換'],
  },
  {
    type: 'text',
    question: 'なぜA/D変換が必要なのか、簡潔に説明せよ。',
    answer: [
      'センサ等のアナログ信号を、マイコン(コンピュータ)が処理できるデジタル信号にするため',
      'コンピュータがアナログ信号を処理できないため',
      'マイコンで処理するため',
    ],
  },
  {
    type: 'text',
    question:
      '入力電圧範囲0〜5V、分解能8ビットのA/D変換器に4.0Vを入力したとき、デジタル出力値(10進数)はいくらか。ただし255段階(最大値255)で換算する。',
    answer: ['204', '204(10進数)'],
  },
  {
    type: 'text',
    question: '上の問題(4.0V入力時のデジタル出力値204)を8ビットの2進数で答えよ。',
    answer: ['11001100', '0b11001100'],
  },
  {
    type: 'text',
    question: '7セグメントLED表示器は、デシマルポイント(DP)を除いて何個のLEDで構成されるか。',
    answer: ['7個', '7'],
  },
  {
    type: 'text',
    question: '7セグメントLED表示器で、内部のLEDのアノードが共通になっているタイプを何というか。',
    answer: 'アノードコモンタイプ',
  },
  {
    type: 'text',
    question: '7セグメントデコーダの真理値表で、セグメントを点灯させる(ON)ことを表す出力値はどちらか(数字で)。',
    answer: ['1', '1(HIGH)'],
  },
  {
    type: 'text',
    question:
      '7セグメントLED表示器で数字の「3」を表示するために点灯させるセグメントを、a,b,c,d,e,f,gの中からすべて答えよ(例: a,b,c)。',
    answer: ['a,b,c,d,g', 'a, b, c, d, g', 'abcdg'],
  },
  {
    type: 'text',
    question:
      '7セグメントLED表示器で数字の「5」を表示するために点灯させるセグメントを、a,b,c,d,e,f,gの中からすべて答えよ(例: a,b,c)。',
    answer: ['a,c,d,f,g', 'a, c, d, f, g', 'acdfg'],
  },
  {
    type: 'text',
    question: 'BCD符号を用いて10進数の「9」を4ビットの2進数で答えよ。',
    answer: ['1001', '1001₂'],
  },
];
