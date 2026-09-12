// クイズ作成ツール(ノーコード)。
// public/create.html から読み込まれる素のJavaScript(ビルド不要、TypeScriptのバンドルとは独立)。
(function () {
  'use strict';

  const CHOICE_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];
  const MAX_CHOICES = CHOICE_LABELS.length;
  const DRAFT_KEY = 'quiz-builder-draft';

  const categoryTabs = document.getElementById('category-tabs');
  const typeTabs = document.getElementById('type-tabs');
  const typeHelp = document.getElementById('type-help');
  const choiceFields = document.getElementById('choice-fields');
  const textFields = document.getElementById('text-fields');
  const handwritingFields = document.getElementById('handwriting-fields');
  const choiceList = document.getElementById('choice-list');
  const textAnswerList = document.getElementById('text-answer-list');
  const btnAddChoice = document.getElementById('btn-add-choice');
  const btnAddTextAnswer = document.getElementById('btn-add-text-answer');
  const qQuestion = document.getElementById('q-question');
  const qImage = document.getElementById('q-image');
  const qImagePreviewWrap = document.getElementById('q-image-preview-wrap');
  const qImagePreview = document.getElementById('q-image-preview');
  const btnRemoveImage = document.getElementById('btn-remove-image');
  const qHandwritingAnswer = document.getElementById('q-handwriting-answer');
  const formError = document.getElementById('form-error');
  const btnSubmit = document.getElementById('btn-submit');
  const btnCancelEdit = document.getElementById('btn-cancel-edit');
  const questionCountEl = document.getElementById('question-count');
  const questionListEl = document.getElementById('question-list');
  const questionListEmpty = document.getElementById('question-list-empty');
  const fileNameInput = document.getElementById('file-name');
  const btnDownload = document.getElementById('btn-download');
  const fileImport = document.getElementById('file-import');
  const btnClearDraft = document.getElementById('btn-clear-draft');
  const formHeading = document.getElementById('form-heading');

  const TYPE_HELP = {
    choice: '4択などの選択問題です。選択肢は2〜6個まで追加できます。',
    text: '答えを入力してもらう形式です。読み方や表記が複数ある場合は「別の答え方を追加」してください。',
    handwriting:
      '自己採点形式です。回答者は画面に手書きし、「答えを確認」を押すと正解が表示されます(自動採点はしません)。',
  };

  const TYPE_LABEL = { choice: '選択式', text: '記述式', handwriting: '手書き' };

  let currentType = 'choice';
  let currentCategory = '履修科目';
  let questions = [];
  let editingIndex = null;
  let currentImageDataUrl = null;

  const MAX_IMAGE_DIMENSION = 1000; // px
  const JPEG_FALLBACK_THRESHOLD = 700 * 1024; // このデータURI文字数を超えたらJPEGに切り替える

  // アップロードされた画像を、大きすぎる場合は縮小・再圧縮してdata URIにする。
  // イラストや図表向けにまずPNGで試し、大きければJPEGに落とす。
  function readImageAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('画像の読み込みに失敗しました。'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('画像の読み込みに失敗しました。'));
        img.onload = () => {
          let { width, height } = img;
          if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
            const scale = MAX_IMAGE_DIMENSION / Math.max(width, height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          let dataUrl = canvas.toDataURL('image/png');
          if (dataUrl.length > JPEG_FALLBACK_THRESHOLD) {
            dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          }
          resolve(dataUrl);
        };
        img.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  function showImagePreview(dataUrl) {
    currentImageDataUrl = dataUrl;
    qImagePreview.src = dataUrl;
    qImagePreviewWrap.hidden = false;
  }

  function hideImagePreview() {
    currentImageDataUrl = null;
    qImagePreview.src = '';
    qImagePreviewWrap.hidden = true;
    qImage.value = '';
  }

  qImage.addEventListener('change', () => {
    const file = qImage.files && qImage.files[0];
    if (!file) return;
    readImageAsDataUrl(file)
      .then((dataUrl) => showImagePreview(dataUrl))
      .catch((err) => {
        showError(err.message || '画像の読み込みに失敗しました。');
        qImage.value = '';
      });
  });

  btnRemoveImage.addEventListener('click', () => hideImagePreview());

  // 保存/読み込み形式は { category, questions } のオブジェクト。
  // 以前のバージョンでは questions の配列だけを保存していたので、
  // そちらも読み込めるように両対応にしておく。
  function normalizeLoaded(parsed) {
    if (Array.isArray(parsed)) {
      return { category: '履修科目', questions: parsed };
    }
    if (parsed && typeof parsed === 'object' && Array.isArray(parsed.questions)) {
      return {
        category: parsed.category === '選択科目' ? '選択科目' : '履修科目',
        questions: parsed.questions,
      };
    }
    return { category: '履修科目', questions: [] };
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return { category: '履修科目', questions: [] };
      return normalizeLoaded(JSON.parse(raw));
    } catch {
      return { category: '履修科目', questions: [] };
    }
  }

  function saveDraft() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ category: currentCategory, questions }));
    } catch {
      // 保存できなくても致命的ではないので無視する(プライベートモード等)
    }
  }

  function setCategory(category) {
    currentCategory = category === '選択科目' ? '選択科目' : '履修科目';
    Array.from(categoryTabs.children).forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.category === currentCategory);
    });
    saveDraft();
  }

  categoryTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.builder-category-tab');
    if (!btn) return;
    setCategory(btn.dataset.category);
  });

  function setType(type) {
    currentType = type;
    Array.from(typeTabs.children).forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.type === type);
    });
    choiceFields.hidden = type !== 'choice';
    textFields.hidden = type !== 'text';
    handwritingFields.hidden = type !== 'handwriting';
    typeHelp.textContent = TYPE_HELP[type];
  }

  typeTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.builder-type-tab');
    if (!btn) return;
    setType(btn.dataset.type);
  });

  function createChoiceRow(text, checked, explanation) {
    const row = document.createElement('div');
    row.className = 'builder-choice-row';
    row.innerHTML =
      '<input type="radio" name="choice-correct" />' +
      '<span class="builder-choice-label"></span>' +
      '<input type="text" class="builder-choice-text" placeholder="選択肢を入力" />' +
      '<button type="button" class="builder-row-remove" aria-label="この選択肢を削除">×</button>' +
      '<input type="text" class="builder-choice-explanation" placeholder="この選択肢の解説(任意・不正解で選ばれたときに表示)" />';
    row.querySelector('.builder-choice-text').value = text || '';
    row.querySelector('.builder-choice-explanation').value = explanation || '';
    row.querySelector('input[type="radio"]').checked = !!checked;
    row.querySelector('.builder-row-remove').addEventListener('click', () => {
      if (choiceList.children.length <= 2) return;
      row.remove();
      relabelChoices();
    });
    return row;
  }

  function relabelChoices() {
    Array.from(choiceList.children).forEach((row, i) => {
      row.querySelector('.builder-choice-label').textContent = CHOICE_LABELS[i] || String(i + 1);
    });
    btnAddChoice.hidden = choiceList.children.length >= MAX_CHOICES;
  }

  function resetChoiceRows(choicesArr, answerIndex, explanationsArr) {
    choiceList.innerHTML = '';
    const initial = choicesArr && choicesArr.length ? choicesArr : ['', '', '', ''];
    const exps = explanationsArr || [];
    initial.forEach((text, i) => {
      choiceList.appendChild(createChoiceRow(text, i === answerIndex, exps[i]));
    });
    if (choiceList.querySelectorAll('input[type="radio"]:checked').length === 0) {
      const first = choiceList.querySelector('input[type="radio"]');
      if (first) first.checked = true;
    }
    relabelChoices();
  }

  btnAddChoice.addEventListener('click', () => {
    if (choiceList.children.length >= MAX_CHOICES) return;
    choiceList.appendChild(createChoiceRow('', false));
    relabelChoices();
  });

  function createAnswerRow(text) {
    const row = document.createElement('div');
    row.className = 'builder-answer-row';
    row.innerHTML =
      '<input type="text" placeholder="正解を入力" />' +
      '<button type="button" class="builder-row-remove" aria-label="この答え方を削除">×</button>';
    row.querySelector('input[type="text"]').value = text || '';
    row.querySelector('.builder-row-remove').addEventListener('click', () => {
      if (textAnswerList.children.length <= 1) return;
      row.remove();
    });
    return row;
  }

  function resetAnswerRows(answers) {
    textAnswerList.innerHTML = '';
    const initial = answers && answers.length ? answers : [''];
    initial.forEach((text) => textAnswerList.appendChild(createAnswerRow(text)));
  }

  btnAddTextAnswer.addEventListener('click', () => {
    textAnswerList.appendChild(createAnswerRow(''));
  });

  function showError(msg) {
    formError.textContent = msg;
    formError.hidden = false;
  }

  function clearError() {
    formError.hidden = true;
    formError.textContent = '';
  }

  function resetForm() {
    qQuestion.value = '';
    qHandwritingAnswer.value = '';
    resetChoiceRows(null, 0);
    resetAnswerRows(null);
    hideImagePreview();
    setType('choice');
    editingIndex = null;
    btnSubmit.textContent = 'この問題を追加する';
    btnCancelEdit.hidden = true;
    clearError();
  }

  function buildQuestionFromForm() {
    const questionText = qQuestion.value.trim();
    if (!questionText) return { error: '問題文を入力してください。' };

    if (currentType === 'choice') {
      const rows = Array.from(choiceList.children);
      const choices = rows.map((r) => r.querySelector('.builder-choice-text').value.trim());
      const nonEmptyCount = choices.filter((c) => c).length;
      if (nonEmptyCount < 2) return { error: '選択肢は2つ以上入力してください。' };
      if (choices.some((c) => !c)) return { error: '空の選択肢があります。削除するか入力してください。' };
      const checkedRow = rows.findIndex((r) => r.querySelector('input[type="radio"]').checked);
      if (checkedRow === -1) return { error: '正解を1つ選んでください。' };
      const explanations = rows.map((r) => r.querySelector('.builder-choice-explanation').value.trim());
      const question = { type: 'choice', question: questionText, choices, answer: checkedRow };
      if (explanations.some((e) => e)) question.explanations = explanations;
      if (currentImageDataUrl) question.image = currentImageDataUrl;
      return { value: question };
    }

    if (currentType === 'text') {
      const rows = Array.from(textAnswerList.children);
      const answers = rows.map((r) => r.querySelector('input[type="text"]').value.trim()).filter((a) => a);
      if (answers.length === 0) return { error: '正解を1つ以上入力してください。' };
      const question = { type: 'text', question: questionText, answer: answers.length === 1 ? answers[0] : answers };
      if (currentImageDataUrl) question.image = currentImageDataUrl;
      return { value: question };
    }

    const answer = qHandwritingAnswer.value.trim();
    if (!answer) return { error: '正解を入力してください。' };
    const question = { type: 'handwriting', question: questionText, answer };
    if (currentImageDataUrl) question.image = currentImageDataUrl;
    return { value: question };
  }

  function renderQuestionList() {
    questionCountEl.textContent = String(questions.length);
    questionListEmpty.hidden = questions.length > 0;
    questionListEl.innerHTML = '';

    questions.forEach((q, index) => {
      const card = document.createElement('div');
      card.className = 'builder-question-card';

      let answerSummary = '';
      if (q.type === 'choice') {
        const label = CHOICE_LABELS[q.answer] || String(q.answer + 1);
        answerSummary = `正解: ${label}. ${q.choices[q.answer]}`;
        if (Array.isArray(q.explanations) && q.explanations.some((e) => e && e.trim())) {
          answerSummary += ' ・解説あり';
        }
      } else if (q.type === 'text') {
        const arr = Array.isArray(q.answer) ? q.answer : [q.answer];
        answerSummary = `正解: ${arr.join(' / ')}`;
      } else {
        answerSummary = `正解: ${q.answer}`;
      }

      const imageHtml = q.image ? '<img class="builder-question-thumb" alt="" />' : '';
      card.innerHTML =
        '<div class="builder-question-head">' +
        `<span class="builder-question-badge">${TYPE_LABEL[q.type] || q.type}</span>` +
        '<div class="builder-question-actions">' +
        '<button type="button" class="btn-edit">編集</button>' +
        '<button type="button" class="btn-delete is-danger">削除</button>' +
        '</div></div>' +
        '<p class="builder-question-text"></p>' +
        imageHtml +
        '<p class="builder-question-answer"></p>';
      card.querySelector('.builder-question-text').textContent = `${index + 1}. ${q.question}`;
      if (q.image) card.querySelector('.builder-question-thumb').src = q.image;
      card.querySelector('.builder-question-answer').textContent = answerSummary;
      card.querySelector('.btn-edit').addEventListener('click', () => startEdit(index));
      card.querySelector('.btn-delete').addEventListener('click', () => deleteQuestion(index));
      questionListEl.appendChild(card);
    });

    btnDownload.disabled = questions.length === 0;
  }

  function startEdit(index) {
    const q = questions[index];
    editingIndex = index;
    qQuestion.value = q.question;
    setType(q.type);
    if (q.type === 'choice') {
      resetChoiceRows(q.choices, q.answer, q.explanations);
    } else if (q.type === 'text') {
      resetAnswerRows(Array.isArray(q.answer) ? q.answer : [q.answer]);
    } else {
      qHandwritingAnswer.value = q.answer;
    }
    if (q.image) {
      showImagePreview(q.image);
    } else {
      hideImagePreview();
    }
    btnSubmit.textContent = 'この問題を更新する';
    btnCancelEdit.hidden = false;
    clearError();
    formHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function deleteQuestion(index) {
    if (!window.confirm('この問題を削除しますか?')) return;
    questions.splice(index, 1);
    if (editingIndex === index) resetForm();
    saveDraft();
    renderQuestionList();
  }

  btnCancelEdit.addEventListener('click', () => resetForm());

  btnSubmit.addEventListener('click', () => {
    const result = buildQuestionFromForm();
    if (result.error) {
      showError(result.error);
      return;
    }
    if (editingIndex !== null) {
      questions[editingIndex] = result.value;
    } else {
      questions.push(result.value);
    }
    saveDraft();
    renderQuestionList();
    resetForm();
  });

  btnClearDraft.addEventListener('click', () => {
    if (questions.length === 0) return;
    if (!window.confirm('追加したすべての問題を削除します。よろしいですか?')) return;
    questions = [];
    saveDraft();
    renderQuestionList();
    resetForm();
  });

  // src/data/<試験>/<科目>.ts に置けるTypeScriptモジュールとして書き出す。
  // 「履修科目/選択科目」の分類はコメント行に残し、再読み込み時に復元する。
  function buildTsFile() {
    const body = JSON.stringify(questions, null, 2);
    return (
      "import type { Question } from '../../types.js';\n\n" +
      `// 分類: ${currentCategory}\n` +
      `export const questions: Question[] = ${body};\n`
    );
  }

  btnDownload.addEventListener('click', () => {
    if (questions.length === 0) return;
    const name =
      (fileNameInput.value || 'questions').trim().replace(/\.(ts|json)$/i, '') || 'questions';
    const blob = new Blob([buildTsFile()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.ts`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // このツールが書き出す .ts と、旧バージョンの .json の両方を読めるようにする。
  function parseImportedFile(raw) {
    const text = String(raw);

    if (/export\s+const\s+questions/.test(text)) {
      const m = text.match(/export\s+const\s+questions\s*(?::[^=]*)?=\s*(\[[\s\S]*\])\s*;?\s*$/);
      if (!m) throw new Error('invalid shape');
      const parsedQuestions = JSON.parse(m[1]);
      if (!Array.isArray(parsedQuestions)) throw new Error('invalid shape');
      const catMatch = text.match(/\/\/\s*分類:\s*(\S+)/);
      return normalizeLoaded({
        category: catMatch ? catMatch[1].trim() : '履修科目',
        questions: parsedQuestions,
      });
    }

    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed) && !(parsed && Array.isArray(parsed.questions))) {
      throw new Error('invalid shape');
    }
    return normalizeLoaded(parsed);
  }

  fileImport.addEventListener('change', () => {
    const file = fileImport.files && fileImport.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const normalized = parseImportedFile(reader.result);
        questions = normalized.questions;
        setCategory(normalized.category);
        saveDraft();
        renderQuestionList();
        resetForm();
      } catch {
        window.alert('ファイルの読み込みに失敗しました。このツールでダウンロードしたファイルを選んでください。');
      }
      fileImport.value = '';
    };
    reader.readAsText(file, 'utf-8');
  });

  // 初期化
  const initial = loadDraft();
  questions = initial.questions;
  resetChoiceRows(null, 0);
  resetAnswerRows(null);
  setType('choice');
  setCategory(initial.category);
  renderQuestionList();
})();
