# Paróquia Santíssima Trindade

Site institucional da Paróquia Santíssima Trindade — Teresina.

Scaffold em **Vue 3 + Vuetify + Vite**, com **Bun** como gerenciador de pacotes. Seções placeholder: Home, Sobre, Missas, Eventos e Contato.

## Pré-requisitos

- [Bun](https://bun.sh/) 1.4+
- Node.js 22.18+ ou 24.12+

## Configuração do projeto

```sh
bun install
```

### Desenvolvimento (hot-reload)

```sh
bun dev
```

### Build de produção

```sh
bun run build
```

### Preview do build

```sh
bun run preview
```

### Lint (oxlint + ESLint)

```sh
bun lint
```

### Formatação (Prettier)

```sh
bun run format
```

## Estrutura

```
src/
  components/   # Navbar, seções e rodapé
  data/         # Conteúdo e links do site
  plugins/      # Vuetify
  router/       # vue-router (âncoras da landing)
  styles/       # CSS global
```

## Stack

- Vue 3
- Vuetify 4
- Vue Router
- Vite 8
- @mdi/font
- ESLint + oxlint + Prettier
