// ============================================
// PORTO FC MANAGER SIMULATOR - GAME DATA
// ============================================

// IDs fixos para referência (usados no seed.sql)
export const TEAM_IDS = {
  PORTO_FC: '00000000-0000-0000-0000-000000000001',
  ATLETICO_NORTE: '00000000-0000-0000-0000-000000000002',
  REAL_SANTAREM: '00000000-0000-0000-0000-000000000003',
  UNIAO_AMAZONICA: '00000000-0000-0000-0000-000000000004',
  ESTRELA_AZUL: '00000000-0000-0000-0000-000000000005',
  FENIX_FC: '00000000-0000-0000-0000-000000000006',
  AGUIAS_DO_OESTE: '00000000-0000-0000-0000-000000000007',
  IMPERIAL_FC: '00000000-0000-0000-0000-000000000008',
  TIGRES_TAPAJOS: '00000000-0000-0000-0000-000000000009'
};

// Jogadores do Porto FC (com dados offline para fallback)
export const PORTO_PLAYERS = [
  { id: null, name: 'Wagner', position: 'Goleiro', attack: 20, defense: 92, pass: 65, finishing: 15, speed: 55, stamina: 75 },
  { id: null, name: 'Lucas', position: 'Fixo', attack: 55, defense: 82, pass: 70, finishing: 45, speed: 60, stamina: 80 },
  { id: null, name: 'Daniel', position: 'Fixo', attack: 50, defense: 85, pass: 68, finishing: 40, speed: 58, stamina: 78 },
  { id: null, name: 'Gledisson', position: 'Fixo', attack: 52, defense: 80, pass: 72, finishing: 42, speed: 62, stamina: 82 },
  { id: null, name: 'Cadu', position: 'Ala', attack: 78, defense: 55, pass: 75, finishing: 72, speed: 85, stamina: 80 },
  { id: null, name: 'Vyni', position: 'Ala', attack: 75, defense: 50, pass: 80, finishing: 70, speed: 88, stamina: 78 },
  { id: null, name: 'Tayson', position: 'Ala', attack: 80, defense: 48, pass: 82, finishing: 78, speed: 90, stamina: 76 },
  { id: null, name: 'Luan', position: 'Pivô', attack: 85, defense: 40, pass: 70, finishing: 88, speed: 72, stamina: 82 },
  { id: null, name: 'Erick', position: 'Pivô', attack: 82, defense: 38, pass: 72, finishing: 85, speed: 75, stamina: 80 }
];

// Times adversários
export const ADVERSARY_TEAMS = [
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Atlético Norte',
    players: [
      { id: null, name: 'Carlos', position: 'Goleiro', attack: 15, defense: 85, pass: 50, finishing: 10, speed: 45, stamina: 70 },
      { id: null, name: 'Roberto', position: 'Fixo', attack: 45, defense: 78, pass: 60, finishing: 35, speed: 55, stamina: 75 },
      { id: null, name: 'Marcos', position: 'Fixo', attack: 48, defense: 75, pass: 58, finishing: 38, speed: 58, stamina: 72 },
      { id: null, name: 'Pedro', position: 'Ala', attack: 65, defense: 50, pass: 68, finishing: 60, speed: 80, stamina: 74 },
      { id: null, name: 'João', position: 'Pivô', attack: 72, defense: 35, pass: 62, finishing: 75, speed: 68, stamina: 78 }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Real Santarém',
    players: [
      { id: null, name: 'Felipe', position: 'Goleiro', attack: 18, defense: 82, pass: 55, finishing: 12, speed: 48, stamina: 72 },
      { id: null, name: 'André', position: 'Fixo', attack: 50, defense: 76, pass: 62, finishing: 40, speed: 56, stamina: 74 },
      { id: null, name: 'Thiago', position: 'Fixo', attack: 46, defense: 78, pass: 60, finishing: 36, speed: 54, stamina: 76 },
      { id: null, name: 'Rafael', position: 'Ala', attack: 68, defense: 48, pass: 70, finishing: 62, speed: 82, stamina: 76 },
      { id: null, name: 'Bruno', position: 'Pivô', attack: 74, defense: 32, pass: 64, finishing: 78, speed: 70, stamina: 80 }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'União Amazônica',
    players: [
      { id: null, name: 'Diego', position: 'Goleiro', attack: 16, defense: 88, pass: 52, finishing: 11, speed: 46, stamina: 74 },
      { id: null, name: 'Gabriel', position: 'Fixo', attack: 52, defense: 80, pass: 65, finishing: 42, speed: 60, stamina: 78 },
      { id: null, name: 'Luis', position: 'Fixo', attack: 48, defense: 82, pass: 62, finishing: 38, speed: 58, stamina: 76 },
      { id: null, name: 'Matheus', position: 'Ala', attack: 70, defense: 52, pass: 72, finishing: 65, speed: 85, stamina: 78 },
      { id: null, name: 'Gustavo', position: 'Pivô', attack: 76, defense: 36, pass: 66, finishing: 80, speed: 72, stamina: 82 }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    name: 'Estrela Azul',
    players: [
      { id: null, name: 'Vinícius', position: 'Goleiro', attack: 20, defense: 86, pass: 54, finishing: 14, speed: 50, stamina: 76 },
      { id: null, name: 'Henrique', position: 'Fixo', attack: 54, defense: 78, pass: 64, finishing: 44, speed: 62, stamina: 78 },
      { id: null, name: 'Paulo', position: 'Fixo', attack: 50, defense: 80, pass: 60, finishing: 40, speed: 60, stamina: 80 },
      { id: null, name: 'Igor', position: 'Ala', attack: 72, defense: 50, pass: 74, finishing: 68, speed: 86, stamina: 80 },
      { id: null, name: 'Leonardo', position: 'Pivô', attack: 78, defense: 34, pass: 68, finishing: 82, speed: 74, stamina: 84 }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    name: 'Fênix FC',
    players: [
      { id: null, name: 'Alex', position: 'Goleiro', attack: 14, defense: 84, pass: 48, finishing: 10, speed: 44, stamina: 72 },
      { id: null, name: 'Samuel', position: 'Fixo', attack: 48, defense: 76, pass: 62, finishing: 38, speed: 56, stamina: 74 },
      { id: null, name: 'Victor', position: 'Fixo', attack: 44, defense: 78, pass: 60, finishing: 36, speed: 54, stamina: 76 },
      { id: null, name: 'Otávio', position: 'Ala', attack: 66, defense: 48, pass: 68, finishing: 62, speed: 80, stamina: 76 },
      { id: null, name: 'Ricardo', position: 'Pivô', attack: 72, defense: 34, pass: 62, finishing: 76, speed: 70, stamina: 78 }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000007',
    name: 'Águias do Oeste',
    players: [
      { id: null, name: 'Murilo', position: 'Goleiro', attack: 18, defense: 88, pass: 56, finishing: 12, speed: 48, stamina: 74 },
      { id: null, name: 'Danilo', position: 'Fixo', attack: 52, defense: 82, pass: 66, finishing: 42, speed: 60, stamina: 80 },
      { id: null, name: 'Eduardo', position: 'Fixo', attack: 50, defense: 80, pass: 64, finishing: 40, speed: 58, stamina: 78 },
      { id: null, name: 'Fábio', position: 'Ala', attack: 74, defense: 52, pass: 76, finishing: 70, speed: 88, stamina: 80 },
      { id: null, name: 'Caio', position: 'Pivô', attack: 80, defense: 36, pass: 70, finishing: 84, speed: 76, stamina: 84 }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000008',
    name: 'Imperial FC',
    players: [
      { id: null, name: 'Igor', position: 'Goleiro', attack: 16, defense: 86, pass: 52, finishing: 10, speed: 46, stamina: 72 },
      { id: null, name: 'Luan', position: 'Fixo', attack: 50, defense: 80, pass: 64, finishing: 40, speed: 58, stamina: 78 },
      { id: null, name: 'Ruan', position: 'Fixo', attack: 48, defense: 78, pass: 62, finishing: 38, speed: 56, stamina: 76 },
      { id: null, name: 'Kauã', position: 'Ala', attack: 70, defense: 50, pass: 72, finishing: 66, speed: 84, stamina: 78 },
      { id: null, name: 'Yuri', position: 'Pivô', attack: 76, defense: 34, pass: 66, finishing: 80, speed: 72, stamina: 82 }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000009',
    name: 'Tigres do Tapajós',
    players: [
      { id: null, name: 'Natan', position: 'Goleiro', attack: 18, defense: 90, pass: 58, finishing: 14, speed: 50, stamina: 76 },
      { id: null, name: 'Otávio', position: 'Fixo', attack: 56, defense: 84, pass: 70, finishing: 46, speed: 64, stamina: 82 },
      { id: null, name: 'Pedro', position: 'Fixo', attack: 52, defense: 82, pass: 68, finishing: 42, speed: 62, stamina: 80 },
      { id: null, name: 'Sérgio', position: 'Ala', attack: 76, defense: 54, pass: 78, finishing: 72, speed: 90, stamina: 82 },
      { id: null, name: 'Tiago', position: 'Pivô', attack: 82, defense: 38, pass: 72, finishing: 86, speed: 78, stamina: 86 }
    ]
  }
];

// Narrações para diferentes eventos
export const NARRATIONS = {
  passe: [
    '{player} faz um passe preciso para {player2}.',
    '{player} toca curto para {player2}.',
    'Passe de {player} encontra {player2} livre.',
    '{player} inverte o jogo para {player2}.',
    'Lançamento de {player} para {player2}.'
  ],
  chute: [
    '{player} finaliza de longe!',
    '{player} chuta cruzado!',
    '{player} tenta o gol!',
    'Chute forte de {player}!',
    '{player} arrisca de fora da área!'
  ],
  defesa: [
    'Grande defesa de {player}!',
    '{player} espalma para escanteio!',
    '{player} faz uma defesa espetacular!',
    '{player} seguro nas mãos!',
    '{player} evita o gol com uma defesa firme!'
  ],
  desarme: [
    '{player} desarma o adversário!',
    'Corte preciso de {player}.',
    '{player} rouba a bola!',
    '{player} fecha o espaço e recupera a posse.',
    'Desarme limpo de {player}!'
  ],
  contraAtaque: [
    'CONTRA-ATAQUE! {player} puxa a velocidade!',
    'Rápido contra-golpe liderado por {player}!',
    '{player} acelera o jogo no contra-ataque!',
    'Transição rápida! {player} avança com a bola!'
  ],
  falta: [
    'Falta cometida por {player}.',
    '{player} para o avanço com falta.',
    'Falta tática de {player}.',
    '{player} comete a infração.'
  ],
  cartaoAmarelo: [
    'Cartão AMARELO para {player}!',
    '{player} é advertido com cartão amarelo.',
    'Primeiro amarelo do jogo para {player}.'
  ],
  cartaoVermelho: [
    'CARTÃO VERMELHO! {player} está fora do jogo!',
    'Expulsão! {player} recebe o vermelho direto!',
    'Segundo amarelo! {player} está expulso!'
  ],
  escanteio: [
    'Escanteio para {team}.',
    '{team} tem escanteio.',
    'Bola na bandeira! Escanteio para {team}.'
  ],
  gol: [
    'GOOOOOL DO {team}! {player} marca um golaço!',
    'GOL! {player} balança as redes para o {team}!',
    'QUE GOL! {player} não desperdiça! {team} comemora!',
    'É GOL! {player} manda para o fundo da rede!',
    'GOLAÇO! {player} faz um hat-trick!'
  ],
  lesao: [
    '{player} sente uma lesão leve. O jogo para por um instante.',
    '{player} está no chão sentido o impacto. Lesão leve.',
    'Preocupação! {player} se lesionou levemente.'
  ],
  assistencia: [
    'Assistência perfeita de {player} para {player2}!',
    '{player} serviu {player2} com maestria!',
    'Passe genial de {player} para o gol de {player2}!'
  ],
  recuperacao: [
    '{player} recupera a posse de bola.',
    '{player} intercepta o passe adversário!',
    '{player} rouba a bola no meio-campo.'
  ],
  cruzamento: [
    '{player} cruza na área!',
    'Cruzamento preciso de {player}!',
    '{player} levanta a bola na área!'
  ]
};

// Posições e suas funções primárias
export const POSITION_ROLES = {
  Goleiro: { primary: 'defense', secondary: 'pass' },
  Fixo: { primary: 'defense', secondary: 'pass' },
  Ala: { primary: 'attack', secondary: 'speed' },
  'Pivô': { primary: 'attack', secondary: 'finishing' }
};

// Eventos por tipo de posse
export const POSSESSION_EVENTS = {
  attacking: ['passe', 'chute', 'cruzamento', 'escanteio', 'gol'],
  defending: ['desarme', 'recuperacao', 'falta', 'contraAtaque'],
  neutral: ['passe', 'recuperacao', 'desarme']
};