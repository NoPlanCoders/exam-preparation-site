import type { Exam, Subject, Question } from '../types.js';
import { QUIZ_EXAMS } from './exams.js';
import { subjects as zenkiKimatsuSubjects } from './4i-zenki-kimatsu/subjects.js';
import { questions as zenkiKimatsuDatabaseChoice } from './4i-zenki-kimatsu/database-choice.js';
import { questions as zenkiKimatsuDatabaseText } from './4i-zenki-kimatsu/database-text.js';
import { questions as zenkiKimatsuGameTheoryChoice } from './4i-zenki-kimatsu/game-theory-choice.js';
import { questions as zenkiKimatsuGameTheoryText } from './4i-zenki-kimatsu/game-theory-text.js';
import { questions as zenkiKimatsuGameTheoryHandwriting } from './4i-zenki-kimatsu/game-theory-handwriting.js';
import { questions as zenkiKimatsuMechatronicsChoice } from './4i-zenki-kimatsu/mechatronics-choice.js';
import { questions as zenkiKimatsuMechatronicsText } from './4i-zenki-kimatsu/mechatronics-text.js';
import { questions as zenkiKimatsuDataStructuresChoice } from './4i-zenki-kimatsu/data-structures-choice.js';
import { questions as zenkiKimatsuDataStructuresText } from './4i-zenki-kimatsu/data-structures-text.js';
import { questions as zenkiKimatsuOsChoice } from './4i-zenki-kimatsu/os-choice.js';
import { questions as zenkiKimatsuOsText } from './4i-zenki-kimatsu/os-text.js';
import { questions as zenkiKimatsuNumericalMethodsChoice } from './4i-zenki-kimatsu/numerical-methods-choice.js';
import { questions as zenkiKimatsuNumericalMethodsText } from './4i-zenki-kimatsu/numerical-methods-text.js';
import { questions as zenkiKimatsuNumericalMethodsHandwriting } from './4i-zenki-kimatsu/numerical-methods-handwriting.js';
import { questions as zenkiKimatsuControlEngineeringChoice } from './4i-zenki-kimatsu/control-engineering-choice.js';
import { questions as zenkiKimatsuControlEngineeringText } from './4i-zenki-kimatsu/control-engineering-text.js';
import { questions as zenkiKimatsuControlEngineeringHandwriting } from './4i-zenki-kimatsu/control-engineering-handwriting.js';
import { questions as zenkiKimatsuKoreanChoice } from './4i-zenki-kimatsu/korean-choice.js';
import { questions as zenkiKimatsuEconomicsChoice } from './4i-zenki-kimatsu/economics-choice.js';
import { questions as zenkiKimatsuEconomicsHandwriting } from './4i-zenki-kimatsu/economics-handwriting.js';
import { questions as zenkiKimatsuAppliedPhysicsChoice } from './4i-zenki-kimatsu/applied-physics-choice.js';
import { questions as zenkiKimatsuAppliedPhysicsHandwriting } from './4i-zenki-kimatsu/applied-physics-handwriting.js';

interface ExamData {
  subjects: Subject[];
  questions: Record<string, Question[]>;
}

// 新しい試験を追加するときは、上部に import を追加してから
// ここに1エントリ追加する。既存エントリには触れなくてよい。
const examData: Record<string, ExamData> = {
  '4i-zenki-kimatsu': {
    subjects: zenkiKimatsuSubjects,
    questions: {
      'database-choice': zenkiKimatsuDatabaseChoice,
      'database-text': zenkiKimatsuDatabaseText,
      'game-theory-choice': zenkiKimatsuGameTheoryChoice,
      'game-theory-text': zenkiKimatsuGameTheoryText,
      'game-theory-handwriting': zenkiKimatsuGameTheoryHandwriting,
      'mechatronics-choice': zenkiKimatsuMechatronicsChoice,
      'mechatronics-text': zenkiKimatsuMechatronicsText,
      'data-structures-choice': zenkiKimatsuDataStructuresChoice,
      'data-structures-text': zenkiKimatsuDataStructuresText,
      'os-choice': zenkiKimatsuOsChoice,
      'os-text': zenkiKimatsuOsText,
      'numerical-methods-choice': zenkiKimatsuNumericalMethodsChoice,
      'numerical-methods-text': zenkiKimatsuNumericalMethodsText,
      'numerical-methods-handwriting': zenkiKimatsuNumericalMethodsHandwriting,
      'control-engineering-choice': zenkiKimatsuControlEngineeringChoice,
      'control-engineering-text': zenkiKimatsuControlEngineeringText,
      'control-engineering-handwriting': zenkiKimatsuControlEngineeringHandwriting,
      'korean-choice': zenkiKimatsuKoreanChoice,
      'economics-choice': zenkiKimatsuEconomicsChoice,
      'economics-handwriting': zenkiKimatsuEconomicsHandwriting,
      'applied-physics-choice': zenkiKimatsuAppliedPhysicsChoice,
      'applied-physics-handwriting': zenkiKimatsuAppliedPhysicsHandwriting,
    },
  },
};

export function getExams(): Exam[] {
  return QUIZ_EXAMS;
}

export function getSubjects(examId: string): Subject[] {
  return examData[examId]?.subjects ?? [];
}

export function getQuestions(examId: string, subjectId: string): Question[] {
  return examData[examId]?.questions[subjectId] ?? [];
}
