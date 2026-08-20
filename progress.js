// ============================================================================
// PROGRESS — barra de progresso "estilo story" com 3 segmentos fixos,
// dividindo proporcionalmente o total de telas de pergunta em 3 blocos.
// Cada bloco tem um nome (mostrado acima da barra) e, só na última tela
// de cada bloco (exceto o último), um aviso de transição abaixo da barra.
// ============================================================================

var PROGRESS_SEGMENT_NAMES = ['Perfil', 'Hábitos', 'Diagnóstico'];

function updateProgressBar(screen) {
  var wrap = document.getElementById('progress-wrap');
  var bar = document.getElementById('progress-bar');
  var segmentLabel = document.getElementById('progress-segment-label');
  var nextLabel = document.getElementById('progress-next-label');

  if (!screen.showProgress) {
    wrap.classList.add('hidden');
    return;
  }
  wrap.classList.remove('hidden');

  var questionScreens = SCREENS.filter(function (s) { return s.showProgress; });
  var qIndex = questionScreens.indexOf(screen);
  var segmentSize = questionScreens.length / 3;
  var segmentIndex = Math.min(2, Math.floor(qIndex / segmentSize));

  var fills = bar.querySelectorAll('.segment-fill');
  fills.forEach(function (fillEl, i) {
    var segmentStart = i * segmentSize;
    var pct;
    if (qIndex >= segmentStart + segmentSize) {
      pct = 100;
    } else if (qIndex < segmentStart) {
      pct = 0;
    } else {
      pct = ((qIndex - segmentStart + 1) / segmentSize) * 100;
    }
    fillEl.style.width = pct + '%';
  });

  segmentLabel.textContent = PROGRESS_SEGMENT_NAMES[segmentIndex];

  var isLastOfSegment = qIndex === (segmentIndex + 1) * segmentSize - 1;
  var hasNextSegment = segmentIndex < PROGRESS_SEGMENT_NAMES.length - 1;
  nextLabel.textContent = (isLastOfSegment && hasNextSegment)
    ? 'Próximo: ' + PROGRESS_SEGMENT_NAMES[segmentIndex + 1]
    : '';
}
