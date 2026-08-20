// ============================================================================
// STATE — estado do quiz em memória (sem persistência, sem back-button).
// ============================================================================

var quizState = {
  currentIndex: 0,
  answers: {}
};

function saveAnswer(screenId, payload) {
  quizState.answers[screenId] = payload;
}

function goToNextScreen(screenId, payload) {
  if (screenId && payload !== undefined) {
    saveAnswer(screenId, payload);
  }
  quizState.currentIndex++;
  renderScreen(quizState.currentIndex);
}
