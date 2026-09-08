export interface ChoiceQuestion {
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

export interface TextQuestion {
  type: 'text';
  question: string;
  answer: string | string[];
}

export interface HandwritingQuestion {
  type: 'handwriting';
  question: string;
  answer: string;
}

export type Question = ChoiceQuestion | TextQuestion | HandwritingQuestion;

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
