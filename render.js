// ============================================================================
// RENDER — router principal: monta a tela atual em #app e troca com fade.
// ============================================================================

var RENDERERS = {
  intro: renderIntroScreen,
  question: renderQuestionScreen,
  binary: renderBinaryScreen,
  transition: renderTransitionScreen,
  chat: renderChatScreen,
  scale: renderScaleScreen,
  'social-proof': renderSocialProofScreen,
  loading: renderLoadingScreen,
  diagnosis: renderDiagnosisScreen,
  'ai-cards': renderAiCardsScreen,
  chart: renderChartScreen,
  scratch: renderScratchScreen,
  vsl: renderVslScreen,
  offer: renderOfferScreen
};

function renderScreen(index) {
  var screen = SCREENS[index];
  if (!screen) return;

  updateProgressBar(screen);

  var app = document.getElementById('app');
  var current = app.querySelector('.screen');

  var mount = function () {
    var el = document.createElement('div');
    el.className = 'screen';
    var renderFn = RENDERERS[screen.type];
    el.appendChild(renderFn(screen));
    app.innerHTML = '';
    app.appendChild(el);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.classList.add('entering');
      });
    });
    window.scrollTo(0, 0);
  };

  if (current) {
    current.classList.add('leaving');
    setTimeout(mount, 180);
  } else {
    mount();
  }
}

// -- helpers ---------------------------------------------------------------

function createEl(html) {
  var wrap = document.createElement('div');
  wrap.innerHTML = html.trim();
  return wrap.firstElementChild;
}

function buildOptionCard(option, index, selectMode, isSelected) {
  var color = OPTION_COLORS[index % OPTION_COLORS.length];
  var indicatorType = selectMode === 'multi' ? 'checkbox' : 'radio';
  var badgeMultiClass = selectMode === 'multi' ? ' multi' : '';
  var card = createEl(
    '<div class="option-card' + (isSelected ? ' selected' : '') + '" data-option-id="' + option.id + '">' +
      '<div class="option-icon-badge c-' + color + badgeMultiClass + '"><i class="ph ' + option.icon + '"></i></div>' +
      '<div class="option-label">' + option.label + '</div>' +
      '<div class="option-indicator ' + indicatorType + (isSelected ? ' checked' : '') + '"></div>' +
    '</div>'
  );
  return card;
}

// -- INTRO -------------------------------------------------------------
var INTRO_PHONE_ICON =
  '<svg width="32" height="50" viewBox="0 0 32 50" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="2" y="2" width="28" height="46" rx="8" stroke="var(--color-accent)" stroke-width="2.25" fill="rgba(139,92,246,0.08)"/>' +
    '<rect x="11" y="7.5" width="10" height="3" rx="1.5" fill="var(--color-accent)"/>' +
    '<circle cx="10.5" cy="19" r="3" fill="var(--color-accent)"/>' +
    '<circle cx="16" cy="19" r="3" fill="#4ADE80"/>' +
    '<circle cx="21.5" cy="19" r="3" fill="#7DD3FC"/>' +
  '</svg>';

function renderIntroScreen(screen) {
  var wrap = createEl(
    '<div class="intro-screen">' +
      '<h1 class="screen-title">' + screen.title + '</h1>' +
      '<p class="screen-subtitle">' + screen.subtitle + '</p>' +
      '<div class="intro-visual-card">' +
        '<div class="intro-visual-icon">' + INTRO_PHONE_ICON + '</div>' +
        '<div class="intro-visual-text">' +
          '<p class="intro-visual-title">' + screen.visualTitle + '</p>' +
          '<p class="intro-visual-desc">' + screen.visualDesc + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="metrics-row">' +
        screen.metrics.map(function (m) {
          return '<div class="metric-card">' +
            '<div class="metric-icon-badge c-' + m.iconColor + '"><i class="ph ' + m.icon + '"></i></div>' +
            '<div class="metric-value">' + m.value + '</div><div class="metric-title">' + m.title + '</div><div class="metric-desc">' + m.desc + '</div></div>';
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

// -- QUESTION (single / multi) ------------------------------------------
function renderQuestionScreen(screen) {
  var selected = [];

  var wrap = createEl(
    '<div>' +
      (screen.badge ? '<div class="badge-pill"><span class="star">★</span>' + screen.badge + '</div>' : '') +
      '<h1 class="screen-title">' + screen.title + '</h1>' +
      (screen.subtitle ? '<p class="screen-subtitle">' + screen.subtitle + '</p>' : '<div style="margin-bottom:24px"></div>') +
      '<div class="options-list"></div>' +
      '<div class="btn-spacer"></div>' +
      '<button class="btn-primary" disabled>' + screen.cta + '</button>' +
      (screen.footerText ? '<p class="transition-text">' + screen.footerText + '</p>' : '') +
    '</div>'
  );

  var list = wrap.querySelector('.options-list');
  var btn = wrap.querySelector('.btn-primary');

  screen.options.forEach(function (option, index) {
    var card = buildOptionCard(option, index, screen.selectMode, false);
    card.addEventListener('click', function () {
      if (screen.selectMode === 'single') {
        selected = [option.id];
        list.querySelectorAll('.option-card').forEach(function (c) {
          c.classList.remove('selected');
          c.querySelector('.option-indicator').classList.remove('checked');
        });
        card.classList.add('selected');
        card.querySelector('.option-indicator').classList.add('checked');
      } else {
        var idx = selected.indexOf(option.id);
        if (idx > -1) {
          selected.splice(idx, 1);
          card.classList.remove('selected');
          card.querySelector('.option-indicator').classList.remove('checked');
        } else {
          if (selected.length >= screen.maxSelect) return;
          selected.push(option.id);
          card.classList.add('selected');
          card.querySelector('.option-indicator').classList.add('checked');
        }
      }
      btn.disabled = selected.length === 0;
    });
    list.appendChild(card);
  });

  btn.addEventListener('click', function () {
    if (selected.length === 0) return;
    goToNextScreen(screen.id, selected);
  });

  return wrap;
}

// -- BINARY (sim/não) ----------------------------------------------------
function renderBinaryScreen(screen) {
  var wrap = createEl(
    '<div class="binary-screen">' +
      '<div class="eyebrow">' + screen.eyebrow + '</div>' +
      '<h1 class="screen-title">' + screen.title + '</h1>' +
      '<div class="binary-buttons">' +
        '<button class="btn-secondary" data-value="no">' + screen.optionNo + '</button>' +
        '<button class="btn-primary" data-value="yes">' + screen.optionYes + '</button>' +
      '</div>' +
    '</div>'
  );
  wrap.querySelectorAll('[data-value]').forEach(function (b) {
    b.addEventListener('click', function () {
      goToNextScreen(screen.id, b.getAttribute('data-value'));
    });
  });
  return wrap;
}

// -- TRANSITION ---------------------------------------------------------
function renderTransitionScreen(screen) {
  var wrap = createEl(
    '<div>' +
      '<div class="transition-photo-wrap">' +
        '<img class="bw-photo" src="' + screen.photo + '" alt="">' +
      '</div>' +
      '<h1 class="screen-title">' + screen.title + '</h1>' +
      '<p class="screen-subtitle">' + screen.subtitle + '</p>' +
      '<div class="btn-spacer"></div>' +
      '<button class="btn-primary">' + screen.cta + '</button>' +
      '<p class="transition-text">' + screen.smallText + '</p>' +
    '</div>'
  );
  wrap.querySelector('.btn-primary').addEventListener('click', function () {
    goToNextScreen();
  });
  return wrap;
}

// -- CHAT -----------------------------------------------------------
function renderChatScreen(screen) {
  var msg1 = screen.messages[0];
  var msg2 = screen.messages[1];

  var wrap = createEl(
    '<div>' +
      '<h1 class="screen-title">' + screen.title + '</h1>' +
      '<div style="margin-bottom:24px"></div>' +
      '<div class="chat-card">' +
        '<div class="chat-timestamp">' + msg1.time + '</div>' +
        '<div class="chat-message-row">' +
          '<div class="chat-avatar"><img class="color-photo" src="' + screen.avatar + '" alt=""></div>' +
          '<div class="chat-bubble">' + msg1.text + '</div>' +
        '</div>' +
        '<div class="chat-unread-divider"><span class="chat-unread-badge">' + screen.unreadLabel + '</span></div>' +
        '<div class="chat-bubble chat-bubble-2">' +
          '<span>' + msg2.text + '</span>' +
          '<span class="chat-bubble-time">' + msg2.time + '</span>' +
        '</div>' +
        '<div class="chat-fake-input">' +
          '<i class="ph ph-plus"></i>' +
          '<span>' + screen.inputPlaceholder + '</span>' +
          '<i class="ph ph-camera"></i>' +
          '<i class="ph ph-microphone"></i>' +
        '</div>' +
      '</div>' +
      '<div class="btn-spacer"></div>' +
      '<button class="btn-primary">' + screen.cta + '</button>' +
      (screen.footerText ? '<p class="transition-text">' + screen.footerText + '</p>' : '') +
    '</div>'
  );
  wrap.querySelector('.btn-primary').addEventListener('click', function () {
    goToNextScreen();
  });
  return wrap;
}

// -- SCALE ----------------------------------------------------------
var SCALE_ICONS = [
  { icon: 'ph-smiley-sad', color: '#F87171' },
  { icon: 'ph-smiley-x-eyes', color: '#FB923C' },
  { icon: 'ph-smiley-meh', color: '#FBBF24' },
  { icon: 'ph-smiley', color: '#A3E635' },
  { icon: 'ph-thumbs-up', color: '#4ADE80' }
];

function renderScaleScreen(screen) {
  var advancing = false;

  var wrap = createEl(
    '<div>' +
      '<p class="scale-quote">' + screen.quote + '</p>' +
      '<p class="scale-question">' + screen.question + '</p>' +
      '<div class="scale-emojis"></div>' +
      '<div class="scale-labels"><span>Discordo total</span><span>Concordo total</span></div>' +
    '</div>'
  );

  var row = wrap.querySelector('.scale-emojis');

  SCALE_ICONS.forEach(function (item, i) {
    var b = createEl('<div class="scale-emoji-btn"><i class="ph ' + item.icon + '" style="color:' + item.color + '"></i></div>');
    b.addEventListener('click', function () {
      if (advancing) return;
      advancing = true;
      row.querySelectorAll('.scale-emoji-btn').forEach(function (x) { x.classList.remove('selected'); });
      b.classList.add('selected');
      setTimeout(function () {
        goToNextScreen(screen.id, i + 1);
      }, 350);
    });
    row.appendChild(b);
  });

  return wrap;
}

// -- SOCIAL PROOF -----------------------------------------------------
function renderSocialProofScreen(screen) {
  var carouselHtml = screen.carouselItems.map(function (t) {
    return '<div class="carousel-badge">' + t + '</div>';
  }).join('');

  var wrap = createEl(
    '<div>' +
      '<div class="avatars-row">' +
        '<div class="avatars-stack">' +
          screen.avatars.map(function (a) { return '<img class="color-photo" src="' + a + '" alt="">'; }).join('') +
        '</div>' +
        '<div class="avatars-count-badge">' + screen.countBadge + '</div>' +
      '</div>' +
      '<h1 class="screen-title">' + screen.title + '</h1>' +
      '<p class="social-stars">' + screen.stars + '</p>' +
      '<div class="carousel-wrap"><div class="carousel-track">' + carouselHtml + carouselHtml + '</div></div>' +
      '<p class="social-desc">' + screen.description + '</p>' +
      '<div class="btn-spacer"></div>' +
      '<button class="btn-primary">' + screen.cta + '</button>' +
    '</div>'
  );
  wrap.querySelector('.btn-primary').addEventListener('click', function () {
    goToNextScreen();
  });
  return wrap;
}
