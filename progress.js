// ============================================================================
// PROGRESS — barra de progresso "estilo story" com 3 segmentos fixos,
// dividindo proporcionalmente o total de telas de pergunta em 3 blocos.
// Cada bloco tem um nome (mostrado acima da barra) e, só na última tela
// de cada bloco (exceto o último), um aviso de transição abaixo da barra.
// ============================================================================

var PROGRESS_SEGMENT_NAMES = ['Perfil', 'Hábitos', 'Diagnóstico'];

// Mapa das 21 telas do quiz (intro → raspadinha) para o GA4: número real da
// tela, nome curto da etapa e segmento. VSL e oferta ficam fora dessa
// numeração — são rastreadas por eventos de marco próprios (entrou_vsl,
// clicou_destravar), não por trackQuizStep.
var QUIZ_STEP_MAP = {
  'intro': { numero: 1, nome: 'intro', segmento: 'PERFIL' },
  'q-mood': { numero: 2, nome: 'pergunta_estado_atual', segmento: 'PERFIL' },
  'q-gender': { numero: 3, nome: 'pergunta_sexo', segmento: 'PERFIL' },
  'q-age': { numero: 4, nome: 'pergunta_idade', segmento: 'PERFIL' },
  'transition-1': { numero: 5, nome: 'transicao_boas_maos', segmento: 'PERFIL' },
  'chat-sim': { numero: 6, nome: 'chat_simulado', segmento: 'PERFIL' },
  'q-duration': { numero: 7, nome: 'pergunta_tempo_incomodo', segmento: 'HÁBITOS' },
  'q-dropout': { numero: 8, nome: 'pergunta_motivo_desistencia', segmento: 'HÁBITOS' },
  'q-change-areas': { numero: 9, nome: 'pergunta_areas_mudanca', segmento: 'HÁBITOS' },
  'scale-1': { numero: 10, nome: 'escala_dias_iguais', segmento: 'HÁBITOS' },
  'scale-2': { numero: 11, nome: 'escala_vida_passando', segmento: 'HÁBITOS' },
  'scale-3': { numero: 12, nome: 'escala_sem_controle', segmento: 'DIAGNÓSTICO' },
  'social-proof': { numero: 13, nome: 'prova_social', segmento: 'DIAGNÓSTICO' },
  'q-unlock': { numero: 14, nome: 'pergunta_prioridades', segmento: 'DIAGNÓSTICO' },
  'q-minutes': { numero: 15, nome: 'pergunta_minutos_dia', segmento: 'DIAGNÓSTICO' },
  'q-ready': { numero: 16, nome: 'pergunta_pronto_mudar', segmento: 'DIAGNÓSTICO' },
  'loading': { numero: 17, nome: 'loading_plano', segmento: 'DIAGNÓSTICO' },
  'diagnosis': { numero: 18, nome: 'diagnostico_resumo', segmento: 'DIAGNÓSTICO' },
  'ai-cards': { numero: 19, nome: 'ia_beneficios', segmento: 'DIAGNÓSTICO' },
  'chart': { numero: 20, nome: 'grafico_evolucao', segmento: 'DIAGNÓSTICO' },
  'scratch': { numero: 21, nome: 'raspadinha', segmento: 'DIAGNÓSTICO' }
};

function trackQuizStep(numero, nomeEtapa, segmento) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'quiz_step', {
      step_number: numero,
      step_name: nomeEtapa,
      segmento: segmento
    });
  }
}

function updateProgressBar(screen) {
  var stepInfo = QUIZ_STEP_MAP[screen.id];
  if (stepInfo) {
    trackQuizStep(stepInfo.numero, stepInfo.nome, stepInfo.segmento);
  }

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
