/**
 * 問題文の下に表示する画像(任意)。相対パス(例: "images/xxx.png")か
 * data URI(例: "data:image/png;base64,...")のどちらでもよい。
 * クイズ作成ツール(create.html)で追加した画像は自動的にdata URIになる。
 */
interface QuestionImage {
  image?: string;
  /** 正解の理由や解き方。回答後に表示する。 */
  explanation?: string;
}

export interface ChoiceQuestion extends QuestionImage {
  type: 'choice';
  question: string;
  choices: string[];
  answer: number;
  /**
   * choices と同じ並びの、各選択肢の解説(任意)。
   * 回答後に、選んだ選択肢と正解の選択肢の解説を表示する。
   * 未指定・空文字の選択肢は解説なしとして扱う。
   */
  explanations?: string[];
}

export interface TextQuestion extends QuestionImage {
  type: 'text';
  question: string;
  answer: string | string[];
}

export interface OrderingQuestion extends QuestionImage {
  type: 'ordering';
  question: string;
  /** 正解順に並べた語句。同じ語句を複数回含めてもよい。 */
  items: string[];
}

export interface HandwritingQuestion extends QuestionImage {
  type: 'handwriting';
  question: string;
  answer: string;
}

export type Question = ChoiceQuestion | TextQuestion | OrderingQuestion | HandwritingQuestion;

export type SubjectCategory = '履修科目' | '選択科目';

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category?: SubjectCategory;
}

export interface Exam {
  id: string;
  name: string;
  description: string;
  icon?: string;
}
