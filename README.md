<<<<<<< HEAD
# ⚽ Porto FC Manager Simulator

**Um simulador de partidas de futsal do Porto FC** - Acompanhe partidas emocionantes em tempo real com narração, estatísticas e muito mais!

![Porto FC](https://img.shields.io/badge/Porto%20FC-Manager%20Simulator-gold)
![React](https://img.shields.io/badge/React-18.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)

## 📋 Sobre o Projeto

O **Porto FC Manager Simulator** é um sistema web interativo que simula partidas de futsal. O usuário inicia a partida e acompanha os acontecimentos em tempo real através de:

- ✅ Narração detalhada dos eventos
- ✅ Placar atualizado dinamicamente
- ✅ Estatísticas completas da partida
- ✅ Histórico de partidas
- ✅ Classificação do campeonato
- ✅ Artilheiros e assistências
- ✅ MVP da partida

## 🚀 Tecnologias

### Front-end
- **React 18** - Biblioteca JavaScript para interfaces
- **Vite 5** - Build tool rápida
- **React Router DOM 6** - Navegação SPA
- **CSS3** - Estilização moderna com variáveis CSS

### Back-end (Opcional)
- **Supabase** - Plataforma backend-as-a-service
- **PostgreSQL** - Banco de dados relacional

### Hospedagem
- **GitHub Pages** - Front-end
- **Supabase** - Banco de dados

## ⚙️ Funcionalidades

### 🎮 Simulação de Partidas
- Simulação completa de 40 minutos (2 tempos de 20)
- Eventos automáticos: passes, chutes, defesas, gols, faltas, cartões
- Atributos dos jogadores influenciam os eventos
- Velocidade de simulação ajustável (0.5x, 1x, 2x, 4x)

### 📊 Estatísticas em Tempo Real
- Posse de bola
- Finalizações (totais e no alvo)
- Defesas
- Faltas
- Cartões (amarelos e vermelhos)
- Escanteios

### 👥 Times
- **Porto FC** - 9 jogadores com atributos únicos
- **8 Adversários** - Elencos gerados automaticamente

### 🏆 Competição
- Campeonato automático com todos os times
- Sistema de pontuação (vitória=3, empate=1, derrota=0)
- Classificação completa
- Artilharia e assistências da temporada

## 🎨 Design

- **Cores:** Azul escuro (#1a237e), Branco, Dourado (#d4af37)
- **Tema escuro** padrão
- Layout responsivo (Desktop, Tablet, Celular)
- Animações suaves e feedback visual
- Interface moderna com gradientes e efeitos glassmorphism

## 📁 Estrutura do Projeto

```
porto-fc-manager-simulator/
├── public/
├── src/
│   ├── assets/
│   │   └── favicon.svg
│   ├── components/
│   ├── database/
│   │   ├── schema.sql          # Script SQL completo
│   │   └── seed.sql            # Dados iniciais
│   ├── hooks/
│   ├── pages/
│   │   ├── Home.jsx            # Tela inicial
│   │   ├── Match.jsx           # Tela de partida
│   │   ├── History.jsx         # Histórico de partidas
│   │   ├── Standings.jsx       # Classificação
│   │   └── Pages.css           # Estilos das páginas
│   ├── services/
│   │   ├── supabase.js         # Serviços Supabase
│   │   ├── gameData.js         # Dados do jogo
│   │   └── matchSimulation.js  # Motor de simulação
│   ├── styles/
│   │   └── global.css          # Estilos globais
│   ├── App.jsx                 # Componente principal
│   └── main.jsx                # Entry point
├── .env.example                # Exemplo de variáveis de ambiente
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/seuusuario/porto-fc-manager-simulator.git
cd porto-fc-manager-simulator
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o Supabase (opcional)**
   - Crie uma conta em [supabase.com](https://supabase.com)
   - Crie um novo projeto
   - Execute os scripts SQL em `src/database/schema.sql` e `src/database/seed.sql`
   - Copie `.env.example` para `.env` e preencha com suas credenciais

4. **Execute em desenvolvimento**
```bash
npm run dev
```

5. **Build para produção**
```bash
npm run build
```

### Deploy no GitHub Pages

1. Atualize o campo `homepage` em `package.json` com seu username do GitHub
2. Execute:
```bash
npm run deploy
```

## 📊 Banco de Dados (Supabase)

### Estrutura das Tabelas

| Tabela | Descrição |
|--------|-----------|
| `teams` | Times cadastrados |
| `players` | Jogadores com atributos |
| `matches` | Partidas realizadas |
| `match_events` | Eventos das partidas |
| `standings` | Classificação do campeonato |
| `season_stats` | Estatísticas individuais |

### Atributos dos Jogadores
- **Attack** (1-100) - Capacidade ofensiva
- **Defense** (1-100) - Capacidade defensiva
- **Pass** (1-100) - Qualidade do passe
- **Finishing** (1-100) - Finalização
- **Speed** (1-100) - Velocidade
- **Stamina** (1-100) - Resistência

## 👥 Time do Porto FC

| Jogador | Posição | Ataque | Defesa | Passe | Finalização | Velocidade | Resistência |
|---------|---------|--------|--------|-------|-------------|------------|-------------|
| Wagner | Goleiro | 20 | 92 | 65 | 15 | 55 | 75 |
| Lucas | Fixo | 55 | 82 | 70 | 45 | 60 | 80 |
| Daniel | Fixo | 50 | 85 | 68 | 40 | 58 | 78 |
| Gledisson | Fixo | 52 | 80 | 72 | 42 | 62 | 82 |
| Cadu | Ala | 78 | 55 | 75 | 72 | 85 | 80 |
| Vyni | Ala | 75 | 50 | 80 | 70 | 88 | 78 |
| Tayson | Ala | 80 | 48 | 82 | 78 | 90 | 76 |
| Luan | Pivô | 85 | 40 | 70 | 88 | 72 | 82 |
| Erick | Pivô | 82 | 38 | 72 | 85 | 75 | 80 |

## 🏟️ Adversários

- Atlético Norte
- Real Santarém
- União Amazônica
- Estrela Azul
- Fênix FC
- Águias do Oeste
- Imperial FC
- Tigres do Tapajós

## 🎯 Como Jogar

1. Na **Tela Inicial**, clique em "Nova Partida"
2. Um adversário aleatório será selecionado automaticamente
3. A partida será simulada em tempo real (2-4 minutos reais)
4. Acompanhe os eventos pelo feed de narração
5. Veja as estatísticas sendo atualizadas
6. Ao final, confira o resultado e o MVP da partida
7. Acesse o **Histórico** para ver partidas anteriores
8. Veja a **Classificação** do campeonato completo

## 🔄 Motor de Simulação

O sistema simula partidas baseado em:
- Atributos individuais dos jogadores
- Sistema de pesos probabilísticos para eventos
- Progressão minuto a minuto
- Geração de narrativas contextualizadas
- Cálculo de posse de bola e estatísticas

### Ciclo de Simulação
1. Determinar equipe com posse de bola
2. Selecionar jogador participante baseado na posição
3. Calcular ação com base nos atributos
4. Gerar evento com narração contextual
5. Atualizar estatísticas e placar
6. Repetir por 40 minutos

## 📱 Responsividade

O layout é totalmente responsivo:
- **Desktop:** Layout completo com grid de 2 colunas na partida
- **Tablet:** Adaptação para telas médias
- **Celular:** Layout vertical otimizado para telas pequenas

## 🎨 Personalização

### Cores Tema
```css
--porto-blue: #1a237e;
--porto-gold: #d4af37;
--porto-white: #ffffff;
```

### Velocidade de Simulação
Ajustável durante a partida: 0.5x, 1x, 2x, 4x

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
1. Fazer um Fork do projeto
2. Criar uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 🙏 Agradecimentos

- Inspirado no futebol de botão e futsal
- Porto FC - Time de coração
- Comunidade React e Supabase

---

**#ForçaPorto** ⚽💙
=======
# gamerFut
>>>>>>> bf281eb760a131413c70c8a4b288b534ad32bafd
