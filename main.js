// ============================================================================
// MAIN — bootstrap do quiz.
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'quiz_iniciado');
  }
  renderScreen(quizState.currentIndex);
});
