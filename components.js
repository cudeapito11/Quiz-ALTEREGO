// ============================================================================
// COMPONENTS — renderizadores das telas especiais (loading, diagnóstico,
// cards de IA, gráfico de evolução, raspadinha, VSL).
// ============================================================================

// -- LOADING --------------------------------------------------------
function renderLoadingScreen(screen) {
  var itemsHtml = screen.items.map(function (item, i) {
    return (
      '<div class="loading-item" data-index="' + i + '">' +
        '<div class="loading-item-top">' + item.title + '</div>' +
        '<div class="loading-item-sub">' + item.sub + '</div>' +
        '<div class="loading-track"><div class="loading-track-fill"></div><div class="loading-track-check"><i class="ph-thin ph-check"></i></div></div>' +
      '</div>'
    );
  }).join('');

  var wrap = createEl(
    '<div class="loading-screen">' +
      '<h1 class="loading-title">' + screen.title + '</h1>' +
      '<p class="screen-subtitle">' + screen.subtitle + '</p>' +
      '<div class="loading-items">' + itemsHtml + '</div>' +
    '</div>'
  );

  var items = wrap.querySelectorAll('.loading-item');
  var i = 0;

  function step() {
    if (i >= items.length) {
      setTimeout(function () { goToNextScreen(); }, 350);
      return;
    }
    var item = items[i];
    var fill = item.querySelector('.loading-track-fill');
    requestAnimationFrame(function () { fill.style.width = '100%'; });
    setTimeout(function () {
      item.classList.add('done');
      item.querySelector('.loading-track-check').classList.add('visible');
      i++;
      step();
    }, 1200);
  }

  setTimeout(step, 250);

  return wrap;
}

// -- DIAGNÓSTICO ------------------------------------------------------
function renderDiagnosisScreen(screen) {
  var wrap = createEl(
    '<div>' +
      '<div class="diagnosis-card">' +
        '<div class="diagnosis-photo">' +
          '<img class="bw-photo" src="' + screen.photo + '" alt="">' +
          '<div class="diagnosis-overlay-label">' + screen.levelLabel + '</div>' +
          '<span class="level-badge diagnosis-overlay-badge">' + screen.levelBadge + '</span>' +
        '</div>' +
        '<div class="diagnosis-body">' +
          '<h2 style="font-size:1.05rem;margin-bottom:3px;text-align:center">' + screen.summaryTitle + '</h2>' +
          '<p class="diagnosis-summary">' + screen.summary + '</p>' +
          '<div class="gauge-track"><div class="gauge-thumb"></div></div>' +
          '<div class="gauge-labels">' +
            screen.gaugeLabels.map(function (l) { return '<span>' + l + '</span>'; }).join('') +
          '</div>' +
          '<div class="alert-card"><span>⚠️</span><span>' + screen.alertText + '</span></div>' +
          '<div class="metrics-grid">' +
            screen.metrics.map(function (m) {
              return '<div class="metric-grid-card"><div class="metric-grid-value">' + m.value + '</div><div class="metric-grid-label">' + m.label + '</div></div>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</div>' +
      '<button class="btn-primary">' + screen.cta + '</button>' +
    '</div>'
  );
  wrap.querySelector('.btn-primary').addEventListener('click', function () {
    goToNextScreen();
  });

  var thumb = wrap.querySelector('.gauge-thumb');
  setTimeout(function () {
    thumb.style.left = screen.gaugePosition + '%';
  }, 150);

  return wrap;
}

// -- AI CARDS -----------------------------------------------------------
function renderAiCardsScreen(screen) {
  var wrap = createEl(
    '<div>' +
      '<div class="badge-pill"><span class="star">★</span>' + screen.badge + '</div>' +
      '<h1 class="screen-title">' + screen.title + '</h1>' +
      '<p class="screen-subtitle">' + screen.subtitle + '</p>' +
      '<div class="ai-cards-grid">' +
        screen.cards.map(function (c) {
          return '<div class="ai-card"><div class="ai-card-icon">' + c.icon + '</div><p class="ai-card-title">' + c.title + '</p><p class="ai-card-desc">' + c.desc + '</p></div>';
        }).join('') +
      '</div>' +
      '<div class="btn-spacer"></div>' +
      '<button class="btn-primary">' + screen.cta + '</button>' +
    '</div>'
  );
  wrap.querySelector('.btn-primary').addEventListener('click', function () {
    goToNextScreen();
  });
  return wrap;
}

// -- GRÁFICO 21 DIAS ------------------------------------------------------
var CHART_POINTS = {
  start: { x: 10, y: 115 },
  d7: { x: 100, y: 85 },
  d14: { x: 200, y: 50 },
  end: { x: 290, y: 18 }
};
var CHART_ANIM_MS = 1800;

function renderChartScreen(screen) {
  var svgHtml =
    '<svg viewBox="0 0 300 140" class="chart-svg" style="width:100%;height:auto;overflow:visible">' +
      '<defs>' +
        '<linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#F87171"/>' +
          '<stop offset="45%" stop-color="#FBBF24"/>' +
          '<stop offset="100%" stop-color="#4ADE80"/>' +
        '</linearGradient>' +
        '<linearGradient id="areaGrad" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#4ADE80" stop-opacity="0.02"/>' +
          '<stop offset="100%" stop-color="#4ADE80" stop-opacity="0.15"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<path id="evo-area" d="M10,115 C55,105 65,95 100,85 C140,73 165,60 200,50 C230,42 260,28 290,18 L290,140 L10,140 Z" ' +
        'fill="url(#areaGrad)" stroke="none"/>' +
      '<path id="evo-path" d="M10,115 C55,105 65,95 100,85 C140,73 165,60 200,50 C230,42 260,28 290,18" ' +
        'fill="none" stroke="url(#lineGrad)" stroke-width="3.5" stroke-linecap="round"/>' +
      '<circle id="dot-7" class="chart-dot" cx="100" cy="85" r="4" fill="#FBBF24"/>' +
      '<circle id="dot-14" class="chart-dot" cx="200" cy="50" r="4" fill="#A3E635"/>' +
      '<circle id="dot-end" class="chart-dot" cx="290" cy="18" r="5" fill="#4ADE80"/>' +
    '</svg>';

  var startPct = { left: (CHART_POINTS.start.x / 300) * 100, top: (CHART_POINTS.start.y / 140) * 100 };
  var endPct = { right: 100 - (CHART_POINTS.end.x / 300) * 100, top: (CHART_POINTS.end.y / 140) * 100 };

  var wrap = createEl(
    '<div>' +
      '<div class="badge-pill"><span class="star">★</span>' + screen.badge + '</div>' +
      '<h1 class="screen-title">' + screen.title + '</h1>' +
      '<p class="screen-subtitle">' + screen.subtitle + '</p>' +
      '<div class="chart-card">' +
        '<div class="chart-svg-wrap">' +
          svgHtml +
          '<div class="chart-popup chart-popup-start" style="left:' + startPct.left + '%;top:' + startPct.top + '%">Hoje</div>' +
          '<div class="chart-popup chart-popup-end" style="right:' + endPct.right + '%;top:' + endPct.top + '%">Com o ALTER EGO</div>' +
        '</div>' +
        '<div class="chart-x-axis">' +
          screen.xLabels.map(function (l) { return '<span>' + l + '</span>'; }).join('') +
        '</div>' +
      '</div>' +
      '<div class="btn-spacer"></div>' +
      '<button class="btn-primary">' + screen.cta + '</button>' +
    '</div>'
  );

  var path = wrap.querySelector('#evo-path');
  var areaPath = wrap.querySelector('#evo-area');
  var popupStart = wrap.querySelector('.chart-popup-start');
  var popupEnd = wrap.querySelector('.chart-popup-end');
  var dot7 = wrap.querySelector('#dot-7');
  var dot14 = wrap.querySelector('#dot-14');
  var dotEnd = wrap.querySelector('#dot-end');

  var length = 0;

  function tAtPoint(target) {
    var best = 0, bestDist = Infinity;
    var steps = 120;
    for (var i = 0; i <= steps; i++) {
      var t = i / steps;
      var p = path.getPointAtLength(t * length);
      var dx = p.x - target.x, dy = p.y - target.y;
      var dist = dx * dx + dy * dy;
      if (dist < bestDist) { bestDist = dist; best = t; }
    }
    return best;
  }

  function pulse(dot) {
    dot.classList.remove('pulse');
    void dot.offsetWidth;
    dot.classList.add('pulse');
  }

  var played = false;
  function playAnimation() {
    if (played) return;
    played = true;

    popupStart.classList.add('visible');
    path.style.strokeDashoffset = '0';
    areaPath.style.opacity = '1';

    var t7 = tAtPoint(CHART_POINTS.d7);
    var t14 = tAtPoint(CHART_POINTS.d14);

    setTimeout(function () { pulse(dot7); }, t7 * CHART_ANIM_MS);
    setTimeout(function () { pulse(dot14); }, t14 * CHART_ANIM_MS);
    setTimeout(function () {
      pulse(dotEnd);
      popupEnd.classList.add('visible');
    }, CHART_ANIM_MS);
  }

  // path.getTotalLength() e o IntersectionObserver precisam do SVG já conectado
  // ao document. Nesse ponto o wrap retornado por renderChartScreen ainda está
  // fora do DOM (render.js só faz o appendChild depois desta função retornar),
  // e em navegadores mobile (WebKit/Safari em especial) isso faz getTotalLength()
  // voltar 0 e o observer nunca reportar interseção — deixando visíveis só os
  // 3 pontos estáticos do SVG, sem linha e sem o marcador "Hoje". Adiar pro
  // próximo frame (mesmo padrão de duplo rAF já usado em render.js) garante
  // que o elemento já esteja anexado e com layout calculado.
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'stroke-dashoffset ' + CHART_ANIM_MS + 'ms ease';

      areaPath.style.opacity = '0';
      areaPath.style.transition = 'opacity ' + CHART_ANIM_MS + 'ms ease';

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            playAnimation();
            observer.disconnect();
          }
        });
      }, { threshold: 0.4 });
      observer.observe(path);
    });
  });

  wrap.querySelector('.btn-primary').addEventListener('click', function () {
    goToNextScreen();
  });
  return wrap;
}

// -- RASPADINHA ----------------------------------------------------------
function renderScratchScreen(screen) {
  var wrap = createEl(
    '<div>' +
      '<div class="badge-pill"><span class="star">★</span>' + screen.badge + '</div>' +
      '<h1 class="screen-title">' + screen.title + '</h1>' +
      '<p class="scratch-hint">' + screen.subtitle + '</p>' +
      '<div class="scratch-card">' +
        '<div class="scratch-reveal">' +
          '<div class="reveal-label">' + screen.revealLabel + '</div>' +
          '<div class="reveal-price">' + screen.revealPrice + '</div>' +
        '</div>' +
        '<canvas class="scratch-canvas"></canvas>' +
      '</div>' +
      '<button class="btn-primary" disabled>' + screen.cta + '</button>' +
    '</div>'
  );

  var canvas = wrap.querySelector('.scratch-canvas');
  var cardEl = wrap.querySelector('.scratch-card');
  var btn = wrap.querySelector('.btn-primary');
  var ctx = canvas.getContext('2d');
  var revealed = false;
  var scratching = false;

  function setupCanvas() {
    var rect = cardEl.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    drawGoldLayer();
  }

  function drawGoldLayer() {
    var w = canvas.width, h = canvas.height;
    var grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#E8C468');
    grad.addColorStop(0.5, '#C9A24B');
    grad.addColorStop(1, '#8A6B2A');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#5C3A17';
    ctx.font = "700 13px 'Outfit', -apple-system, 'Segoe UI', Roboto, Helvetica, sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(screen.scratchLabel, w / 2, h / 2);
  }

  function getPoint(e) {
    var rect = canvas.getBoundingClientRect();
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function scratchAt(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
  }

  function checkProgress() {
    if (revealed) return;
    var w = canvas.width, h = canvas.height;
    if (w === 0 || h === 0) return;
    var sampleStep = 8;
    var transparent = 0, total = 0;
    var data = ctx.getImageData(0, 0, w, h).data;
    for (var y = 0; y < h; y += sampleStep) {
      for (var x = 0; x < w; x += sampleStep) {
        var idx = (y * w + x) * 4;
        total++;
        if (data[idx + 3] < 40) transparent++;
      }
    }
    if (total > 0 && transparent / total > 0.5) {
      revealComplete();
    }
  }

  function revealComplete() {
    revealed = true;
    canvas.style.opacity = '0';
    setTimeout(function () { canvas.style.display = 'none'; }, 650);
    btn.disabled = false;
    if (typeof confetti === 'function') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    if (typeof gtag !== 'undefined') {
      gtag('event', 'raspadinha_revelada');
    }
  }

  function pointerDown(e) {
    scratching = true;
    var p = getPoint(e);
    scratchAt(p.x, p.y);
  }
  function pointerMove(e) {
    if (!scratching) return;
    if (e.cancelable) e.preventDefault();
    var p = getPoint(e);
    scratchAt(p.x, p.y);
    checkProgress();
  }
  function pointerUp() {
    if (!scratching) return;
    scratching = false;
    checkProgress();
  }

  canvas.addEventListener('mousedown', pointerDown);
  canvas.addEventListener('mousemove', pointerMove);
  window.addEventListener('mouseup', pointerUp);
  canvas.addEventListener('touchstart', pointerDown, { passive: true });
  canvas.addEventListener('touchmove', pointerMove, { passive: false });
  canvas.addEventListener('touchend', pointerUp);

  btn.addEventListener('click', function () {
    if (btn.disabled) return;
    goToNextScreen();
  });

  setTimeout(setupCanvas, 30);

  return wrap;
}

// -- VSL --------------------------------------------------------------
// ID do player Vturb — precisa bater exatamente com o id usado no embed
// abaixo e com o script carregado em index.html/loadVturbPlayerScript.
var VTURB_PLAYER_ID = 'vid-6a86e94652e9eb50c1261932';
var vturbScriptInjected = false;

function loadVturbPlayerScript() {
  if (vturbScriptInjected) return;
  vturbScriptInjected = true;
  var s = document.createElement('script');
  s.src = 'https://scripts.converteai.net/bcf1bb09-b851-4887-a1c4-476057b1927e/players/6a86e94652e9eb50c1261932/v4/player.js';
  s.async = true;
  document.head.appendChild(s);
}

function renderVslScreen(screen) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'entrou_vsl');
  }

  var wrap = createEl(
    '<div style="margin-top:-18px;margin-bottom:-30px;">' +
      '<div class="vsl-player">' +
        '<vturb-smartplayer id="' + VTURB_PLAYER_ID + '" style="display: block; margin: 0 auto; width: 100%; max-width: 320px;">' +
          '<div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 177.77777777777777% 0 0; z-index: 0; background-color: black;"></div>' +
        '</vturb-smartplayer>' +
      '</div>' +
      '<p class="vsl-context">' + screen.context + '</p>' +
      '<button id="vsl-cta-button" class="btn-primary vsl-cta-hidden">' + screen.cta + '</button>' +
    '</div>'
  );

  loadVturbPlayerScript();

  var player = wrap.querySelector('#' + VTURB_PLAYER_ID);
  var ctaButton = wrap.querySelector('#vsl-cta-button');
  var revealed = false;

  function revealCta() {
    if (revealed) return;
    revealed = true;
    ctaButton.classList.remove('vsl-cta-hidden');
    ctaButton.style.display = 'flex';
    ctaButton.classList.add('vsl-cta-fade-in');
  }

  // O smartplayer da Vturb é um web component (<vturb-smartplayer>), não uma
  // tag <video> nativa — 'timeupdate'/'ended' de HTMLMediaElement não existem
  // nele. Os eventos abaixo (video:timeupdate, video:ended) foram confirmados
  // baixando e inspecionando o bundle real (smartplayer-wc v4/smartplayer.js):
  // são CustomEvents de fato disparados no próprio elemento, não uma suposição.
  player.addEventListener('video:timeupdate', function (e) {
    var duration = player.playback && player.playback.duration;
    var currentTime = e.detail && typeof e.detail.time === 'number' ? e.detail.time : null;
    if (!duration || !isFinite(duration) || duration <= 0 || currentTime === null) return;
    var remaining = duration - currentTime;
    var threshold = Math.max(15, duration * 0.1); // últimos 15s, ou 10% do vídeo se ele for longo
    if (remaining <= threshold) revealCta();
  });

  // garante que o botão apareça mesmo se o vídeo terminar sem disparar o timeupdate final
  player.addEventListener('video:ended', revealCta);

  ctaButton.addEventListener('click', function () {
    goToNextScreen();
  });
  return wrap;
}

// -- OFERTA -------------------------------------------------------------
function formatMMSS(totalSeconds) {
  var m = Math.floor(totalSeconds / 60);
  var s = totalSeconds % 60;
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

function renderCompareCard(data, tone) {
  var metricsHtml = data.metrics.map(function (m) {
    return (
      '<div class="offer-metric-block">' +
        '<div class="offer-metric-row"><span>' + m.label + '</span><span>' + m.value + '</span></div>' +
        '<div class="offer-progress-track"><div class="offer-progress-fill" style="width:' + m.pct + '%"></div></div>' +
      '</div>'
    );
  }).join('');
  var photoClass = tone === 'bad' ? 'offer-photo-tone-bad' : 'color-photo';
  return (
    '<div class="offer-compare-card offer-tone-' + tone + '">' +
      '<div class="offer-compare-photo"><img class="' + photoClass + '" src="' + data.photo + '" alt=""></div>' +
      '<div class="offer-compare-label">' + data.label + '</div>' +
      metricsHtml +
    '</div>'
  );
}

function renderOfferScreen(screen) {
  var wrap = createEl(
    '<div class="offer-screen">' +
      '<div class="offer-countdown-bar">' +
        '<i class="ph ph-clock"></i>' +
        '<span>' + screen.countdownLabel + ' <strong id="offer-countdown">' + formatMMSS(screen.countdownSeconds) + '</strong></span>' +
      '</div>' +
      '<h1 class="offer-title">' + screen.title + '</h1>' +
      '<div class="offer-compare-stack">' +
        renderCompareCard(screen.comparison.now, 'bad') +
        renderCompareCard(screen.comparison.after, 'good') +
      '</div>' +
      '<div class="offer-block">' +
        '<p class="offer-unlock-text"><i class="ph ph-lock-simple"></i> ' + screen.unlockText + '</p>' +
        '<div class="offer-price-card">' +
          '<div class="badge-pill offer-plan-badge">' + screen.planLabel + '</div>' +
          '<div class="offer-price-old">' + screen.oldPrice + '</div>' +
          '<div class="offer-price-daily">' + screen.dailyPrice + '</div>' +
          '<div class="offer-price-monthly">' + screen.newPrice + '</div>' +
        '</div>' +
        '<button class="btn-primary offer-cta-btn">' + screen.cta + '</button>' +
        '<p class="offer-secure-text"><i class="ph ph-lock-simple"></i> ' + screen.secureText + '</p>' +
      '</div>' +
    '</div>'
  );

  var remaining = screen.countdownSeconds;
  var countdownEl = wrap.querySelector('#offer-countdown');
  var timer = setInterval(function () {
    remaining--;
    if (remaining <= 0) {
      remaining = 0;
      countdownEl.textContent = formatMMSS(0);
      clearInterval(timer);
      return;
    }
    countdownEl.textContent = formatMMSS(remaining);
  }, 1000);

  wrap.querySelector('.offer-cta-btn').addEventListener('click', function () {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'clicou_destravar');
    }
    window.open(screen.checkoutUrl, '_blank');
  });

  return wrap;
}
