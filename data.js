// ============================================================================
// DATA — conteúdo e configuração de todas as telas do quiz.
// A ordem do array define a ordem linear do funil.
// ============================================================================

var OPTION_COLORS = ['teal', 'green', 'yellow', 'red', 'purple'];

var MALE_PHOTOS = {
  transition: 'imagens/boas-maos-hero.jpg',
  diagnosis: 'imagens/diagnostico-hero.jpg',
  chatAvatar: 'imagens/lucas-avatar-final.jpg',
  avatar1: 'imagens/avatares/avatar-1.jpg',
  avatar2: 'imagens/avatares/avatar-2.jpg',
  avatar3: 'imagens/avatares/avatar-3.jpg',
  avatar4: 'imagens/avatares/avatar-4.jpg',
  avatar5: 'imagens/avatares/avatar-5.jpg'
};

var SCREENS = [

  // 1. INTRO -----------------------------------------------------------
  {
    id: 'intro',
    type: 'intro',
    showProgress: false,
    title: 'Você está em <span class="hl">ótimas mãos</span>.',
    subtitle: 'Milhares de pessoas já botaram a rotina e a disciplina em ordem com o ALTER EGO.',
    visualTitle: 'Pare de viver no automático',
    visualDesc: 'Ele cuida das suas metas, da sua rotina e da sua palavra. Você volta pro controle da sua vida.',
    metrics: [
      { value: '+460 mil', title: 'Metas batidas', desc: 'assinaladas no sistema', icon: 'ph-check-square', iconColor: 'dark-green' },
      { value: '+7,9 mil', title: 'Hábitos', desc: 'acompanhados todo dia', icon: 'ph-sparkle', iconColor: 'aqua' }
    ],
    cta: 'Continuar'
  },

  // 2. Qual dessas é você hoje -------------------------------------------
  {
    id: 'q-mood',
    type: 'question',
    showProgress: true,
    selectMode: 'single',
    maxSelect: 1,
    badge: 'Diagnóstico em 60 segundos',
    title: 'Qual dessas é <span class="hl">você</span> hoje?',
    subtitle: 'Seja honesto. É o primeiro passo pra virar o jogo.',
    options: [
      { id: 'a', icon: 'ph-arrows-clockwise', label: 'Vivo no automático, não saio do lugar' },
      { id: 'b', icon: 'ph-wallet', label: 'Não sobra dinheiro no fim do mês' },
      { id: 'c', icon: 'ph-moon-stars', label: 'Tenho sonhos, mas vivem pra depois' },
      { id: 'd', icon: 'ph-prohibit', label: 'Tô no meu limite, exausto' }
    ],
    cta: 'Continuar'
  },

  // 3. Sexo (efeito de personalização, sem ramificação) --------------------
  {
    id: 'q-gender',
    type: 'question',
    showProgress: true,
    selectMode: 'single',
    maxSelect: 1,
    title: 'Qual é o seu <span class="hl">sexo</span>?',
    subtitle: 'Pra personalizar o seu diagnóstico.',
    options: [
      { id: 'm', icon: 'ph-gender-male', label: 'Masculino' },
      { id: 'f', icon: 'ph-gender-female', label: 'Feminino' }
    ],
    cta: 'Continuar'
  },

  // 4. Faixa de idade -------------------------------------------------------
  {
    id: 'q-age',
    type: 'question',
    showProgress: true,
    selectMode: 'single',
    maxSelect: 1,
    title: 'Qual a sua <span class="hl">faixa de idade</span>?',
    subtitle: 'Pra adaptar o plano ao seu momento de vida.',
    options: [
      { id: '18-24', icon: 'ph-sparkle', label: '18 a 24' },
      { id: '25-34', icon: 'ph-triangle', label: '25 a 34' },
      { id: '35-44', icon: 'ph-diamond', label: '35 a 44' },
      { id: '45+', icon: 'ph-star', label: '45+' }
    ],
    cta: 'Continuar'
  },

  // 5. Transição "Você está em boas mãos" -----------------------------------
  {
    id: 'transition-1',
    type: 'transition',
    showProgress: true,
    photo: MALE_PHOTOS.transition,
    title: 'Você está em <span class="hl">boas mãos</span>.',
    subtitle: 'Trate isso como um momento de reflexão honesta. Seus dados são seus: a IA usa só pra montar seu plano.',
    smallText: '+2.400 pessoas já fizeram esse diagnóstico',
    cta: 'Vamos lá'
  },

  // 6. Chat simulado ----------------------------------------------------
  {
    id: 'chat-sim',
    type: 'chat',
    showProgress: true,
    title: 'Você está exatamente no <span class="hl">lugar certo</span>.',
    avatar: MALE_PHOTOS.chatAvatar,
    messages: [
      { time: '10:08', text: 'Bom dia! Sei nem como agradecer, o app tem me ajudado muito! Organizou minha vida de uma forma que nao consigo mem explicar! Todo sucesso a nos!' },
      { time: '16:39', text: 'Essa IA tá me ajudando muito a ter uma rotina, depois que terminei meu namoro eu tava meio sem rumo e essa IA tá me ajudando a focar nos meus objetivos' }
    ],
    unreadLabel: '1 unread message',
    inputPlaceholder: 'Digite uma mensagem...',
    cta: 'Quero isso',
    footerText: '+2.400 pessoas já fizeram esse diagnóstico'
  },

  // 7. Há quanto tempo incomoda -------------------------------------------
  {
    id: 'q-duration',
    type: 'question',
    showProgress: true,
    selectMode: 'single',
    maxSelect: 1,
    title: 'Há quanto tempo isso te <span class="hl">incomoda</span>?',
    subtitle: 'Isso ajuda a IA a medir sua urgência.',
    options: [
      { id: 'weeks', icon: 'ph-sparkle', label: 'Começou agora' },
      { id: 'months', icon: 'ph-calendar', label: 'Uns meses' },
      { id: 'year', icon: 'ph-clock-clockwise', label: 'Mais de 1 ano' },
      { id: 'always', icon: 'ph-infinity', label: 'Já perdi a conta' }
    ],
    cta: 'Continuar'
  },

  // 8. O que mais te faz largar no meio ------------------------------------
  {
    id: 'q-dropout',
    type: 'question',
    showProgress: true,
    selectMode: 'single',
    maxSelect: 1,
    title: 'O que mais te faz <span class="hl">largar</span> no meio?',
    subtitle: 'Seja honesto. É aqui que mora a virada.',
    options: [
      { id: 'time', icon: 'ph-moon', label: 'Perco a motivação' },
      { id: 'discipline', icon: 'ph-x-circle', label: 'Começo empolgado e largo' },
      { id: 'results', icon: 'ph-arrows-clockwise', label: 'Minha rotina vira bagunça' },
      { id: 'accountability', icon: 'ph-diamond', label: 'Falta disciplina pra manter' }
    ],
    cta: 'Continuar',
    footerText: '+2.400 pessoas já fizeram esse diagnóstico'
  },

  // 9. Onde quer mudar (multi até 3) ---------------------------------------
  {
    id: 'q-change-areas',
    type: 'question',
    showProgress: true,
    selectMode: 'multi',
    maxSelect: 3,
    title: 'Onde você mais quer <span class="hl">mudar</span>?',
    subtitle: 'Escolha até 3.',
    options: [
      { id: 'routine', icon: 'ph-heartbeat', label: 'Meu corpo e saúde' },
      { id: 'focus', icon: 'ph-currency-circle-dollar', label: 'Minhas finanças' },
      { id: 'health', icon: 'ph-heart', label: 'Minha vida amorosa' },
      { id: 'finance', icon: 'ph-target', label: 'Minha rotina e foco' },
      { id: 'relationships', icon: 'ph-sparkle', label: 'Minha confiança' },
      { id: 'confidence', icon: 'ph-lightning', label: 'Minha energia' }
    ],
    cta: 'Continuar'
  },

  // 10-12. Escalas de concordância ------------------------------------------
  {
    id: 'scale-1',
    type: 'scale',
    showProgress: true,
    quote: '"Meus dias são todos <span class="hl">iguais</span>."',
    question: 'Quanto você concorda com isso?',
    cta: 'Continuar'
  },
  {
    id: 'scale-2',
    type: 'scale',
    showProgress: true,
    quote: '"Sinto a vida passando <span class="hl">sem mim</span>."',
    question: 'Quanto você concorda com isso?',
    cta: 'Continuar'
  },
  {
    id: 'scale-3',
    type: 'scale',
    showProgress: true,
    quote: '"Vivo reagindo, <span class="hl">nunca no controle</span>."',
    question: 'Quanto você concorda com isso?',
    cta: 'Continuar'
  },

  // 13. Prova social ----------------------------------------------------
  {
    id: 'social-proof',
    type: 'social-proof',
    showProgress: true,
    avatars: [MALE_PHOTOS.avatar1, MALE_PHOTOS.avatar2, MALE_PHOTOS.avatar3, MALE_PHOTOS.avatar4, MALE_PHOTOS.avatar5],
    countBadge: '+2.4k',
    title: 'Junte-se a <span class="hl">+2.400 pessoas</span>',
    stars: '<span class="star">★★★★★</span> 4,9 · 98% recomendam',
    carouselItems: [
      'têm propósito',
      'Voltei a evoluir',
      'Retomei o controle',
      'Saí do modo espera',
      'Minha palavra vale de novo'
    ],
    description: 'Gente que estava no caos e finalmente organizou rotina, dinheiro e metas com a ajuda da IA.',
    cta: 'Continuar'
  },

  // 14. O que quer destravar primeiro (multi até 3) --------------------------
  {
    id: 'q-unlock',
    type: 'question',
    showProgress: true,
    selectMode: 'multi',
    maxSelect: 3,
    title: 'O que você quer <span class="hl">destravar</span> primeiro?',
    subtitle: 'Escolha até 3.',
    options: [
      { id: 'morning', icon: 'ph-sparkle', label: 'Disciplina no automático' },
      { id: 'training', icon: 'ph-barbell', label: 'O corpo que eu quero' },
      { id: 'work-focus', icon: 'ph-currency-circle-dollar', label: 'Dinheiro sob controle' },
      { id: 'sleep', icon: 'ph-arrows-clockwise', label: 'Uma rotina que se mantém' },
      { id: 'money', icon: 'ph-star', label: 'Mais confiança' },
      { id: 'self-esteem', icon: 'ph-compass', label: 'Propósito e direção' }
    ],
    cta: 'Continuar'
  },

  // 15. Minutos por dia ---------------------------------------------------
  {
    id: 'q-minutes',
    type: 'question',
    showProgress: true,
    selectMode: 'single',
    maxSelect: 1,
    title: 'Quantos minutos por dia você consegue <span class="hl">investir em você</span>?',
    subtitle: 'Dica: 10 min já mudam o jogo.',
    options: [
      { id: '5', icon: 'ph-clock', label: 'Só uns 5 min' },
      { id: '10', icon: 'ph-timer', label: '10 a 15 min' },
      { id: '20', icon: 'ph-hourglass', label: 'Mais de 20 min' },
      { id: '30+', icon: 'ph-sparkle', label: 'O que precisar' }
    ],
    cta: 'Continuar'
  },

  // 16. Pronto pra mudar (binário) ------------------------------------------
  {
    id: 'q-ready',
    type: 'binary',
    showProgress: true,
    eyebrow: 'Pra liberar seu diagnóstico',
    title: 'Você está pronto pra <span class="hl">mudar de verdade</span> agora?',
    optionNo: 'Não',
    optionYes: 'Sim'
  },

  // LOADING -----------------------------------------------------------
  {
    id: 'loading',
    type: 'loading',
    showProgress: false,
    title: 'Montando seu plano personalizado.',
    subtitle: 'Com base nas suas respostas. Você pode ajustar a qualquer momento.',
    items: [
      { title: 'Mapeando seu bloqueio', sub: 'O Piloto Automático · O Ralo Invisível' },
      { title: 'Analisando suas respostas', sub: 'com IA' },
      { title: 'Ajustando ao seu tempo', sub: '5 min/dia' },
      { title: 'Montando seu plano de 7 dias', sub: '1 meta priorizada' }
    ]
  },

  // DIAGNÓSTICO -----------------------------------------------------------
  {
    id: 'diagnosis',
    type: 'diagnosis',
    showProgress: false,
    photo: MALE_PHOTOS.diagnosis,
    levelLabel: 'Nível de desorganização',
    levelBadge: 'Alto',
    summaryTitle: 'Resumo do seu diagnóstico',
    summary: 'Suas respostas mostram um padrão claro: você tem clareza do que quer, mas falta estrutura diária pra sustentar a mudança. Isso é mais comum — e mais simples de resolver — do que parece.',
    gaugePosition: 72,
    gaugeLabels: ['Baixo', 'Normal', 'Médio', 'Alto'],
    alertText: 'Acorda, trabalha, dorme, repete. Os dias passam iguais e você sente a vida passando. E o primeiro lugar onde o automático te custa caro é o bolso: quem vive no automático deixa o dinheiro vazar sem nem perceber. Cada semana parada é dinheiro e tempo que não voltam.',
    metrics: [
      { value: 'Baixo', label: 'Controle do dia' },
      { value: 'Difuso', label: 'Propósito' },
      { value: 'No automático', label: 'Rotina' },
      { value: 'Invisível', label: 'Progresso' }
    ],
    cta: 'Ver meu plano'
  },

  // CARDS "A IA FAZ O TRABALHO" ---------------------------------------------
  {
    id: 'ai-cards',
    type: 'ai-cards',
    showProgress: false,
    badge: 'A IA faz o trabalho',
    title: 'A IA monta. <span class="hl">Você só executa</span>.',
    subtitle: 'Não é app de anotação. É uma IA que trabalha por você.',
    cards: [
      { icon: '🧭', title: 'Monta seu dia', desc: 'Organiza sua rotina' },
      { icon: '🔔', title: 'Cuida da grana', desc: 'Acha cada vazamento' },
      { icon: '⚙️', title: 'Te cobra na hora', desc: 'Pra você não largar' },
      { icon: '💬', title: 'Aprende com você', desc: 'Ajusta ao seu ritmo' }
    ],
    cta: 'Continuar'
  },

  // GRÁFICO DE EVOLUÇÃO 21 DIAS -------------------------------------------
  {
    id: 'chart',
    type: 'chart',
    showProgress: false,
    badge: 'Sua evolução com o ALTER EGO',
    title: 'Sua vida no controle em <span class="hl">21 dias</span>',
    subtitle: 'Sua evolução começa hoje e acelera a cada dia com o ALTER EGO.',
    xLabels: ['Hoje', '7 dias', '14 dias', '21 dias'],
    cta: 'Ver meu plano'
  },

  // RASPADINHA -----------------------------------------------------------
  {
    id: 'scratch',
    type: 'scratch',
    showProgress: false,
    badge: 'Você ganhou um brinde',
    title: 'Raspe e revele o <span class="hl">seu brinde</span>',
    subtitle: 'Passe o dedo pra revelar. O que sair daqui é seu.',
    scratchLabel: 'RASPE PARA REVELAR',
    revealLabel: '<span class="hl">SEU PRÊMIO CHEGOU</span>',
    revealPrice: 'De R$149 por R$27/mês',
    cta: 'Continuar'
  },

  // VSL ---------------------------------------------------------------
  {
    id: 'vsl',
    type: 'vsl',
    showProgress: false,
    title: 'Assista o vídeo abaixo antes de continuar',
    context: 'Isso explica exatamente como o ALTER EGO vai te ajudar a manter a consistência a partir de hoje.',
    cta: 'Quero garantir minha vaga'
  },

  // OFERTA (pós-VSL, tela final antes do checkout) --------------------------
  {
    id: 'offer',
    type: 'offer',
    showProgress: false,
    countdownSeconds: 220, // 03:40
    countdownLabel: 'Sua condição especial termina em',
    title: 'SAIA DO PILOTO AUTOMÁTICO.<br>COMECE PELO SEU DINHEIRO.',
    comparison: {
      now: {
        label: 'Agora',
        photo: 'imagens/boas-maos-hero.jpg',
        metrics: [
          { label: 'Seus dias', value: 'No automático', pct: 18 },
          { label: 'Controle', value: 'Reativo', pct: 27 },
          { label: 'Progresso', value: 'Invisível', pct: 12 }
        ]
      },
      after: {
        label: 'Com ALTER EGO',
        photo: 'imagens/oferta-depois.jpg',
        metrics: [
          { label: 'Seus dias', value: 'Com propósito', pct: 84 },
          { label: 'Controle', value: 'No comando', pct: 91 },
          { label: 'Progresso', value: 'Visível', pct: 87 }
        ]
      }
    },
    unlockText: 'Você desbloqueou seu desconto',
    planLabel: 'PLANO MENSAL',
    oldPrice: 'De R$149',
    dailyPrice: 'R$0,87/dia',
    newPrice: 'R$27/mês',
    cta: 'QUERO DESTRAVAR AGORA',
    secureText: 'Pagamento seguro · processado pela Hotmart',
    checkoutUrl: 'https://go.hotmart.com/K106754226E?dp=1'
  }
];
