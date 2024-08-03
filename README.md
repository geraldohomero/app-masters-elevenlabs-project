Projeto [Next.js](https://nextjs.org/) criado com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Começando

 Clone o repositório:
   ```bash
   git clone https://github.com/geraldohomero/app-masters-elevenlabs-project.git
   ```

No terminal:

```bash
npm install
```

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) 

# Projeto Texto em Voz

Este projeto é uma aplicação web que converte texto em voz utilizando a `API` da `ElevenLabs`. O projeto foi desenvolvido como parte do `Projeto App Masters` e utiliza diversas tecnologias modernas, incluindo React, TypeScript e [Material-UI](https://mui.com/material-ui/).

## Funcionalidades

- **Entrada de Texto**: Permite ao usuário digitar o texto que deseja converter em voz.
- **Seleção de Voz**: O usuário pode selecionar diferentes vozes disponíveis para a conversão.
- **Reprodução de Áudio**: O usuário pode ouvir a conversão do texto em voz diretamente na aplicação.
- **Download de Áudio**: O usuário pode baixar o áudio gerado em formato MP3.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Material-UI**: Biblioteca de componentes de interface de usuário para React.
- **API da ElevenLabs**: Serviço de conversão de texto em voz.
- **Vercel Blob Storage**: Serviço de armazenamento de arquivos para download.
- **Vercel**: Plataforma de deploy de aplicações web.

## Estrutura do Projeto

### Componentes Principais

- **textInput**: Componente para entrada de texto.
- **voiceSelect**: Componente para seleção de voz.
- **voiceDetails**: Componente que exibe detalhes da voz selecionada.
- **listaVozes**: Componente principal que integra os demais componentes e gerencia o estado da aplicação.

### Temas

- **Theme**: Configuração de tema escuro utilizando `Material-UI`.

### Traduções

- **Translations**: Mapeamento de traduções para `labels` utilizados na aplicação.

### Estrutura de diretórios

```markdown
.
├── app/
│   ├── components/
│   │   ├── listaVozes.tsx
│   │   ├── textInput.tsx
│   │   ├── theme.tsx
│   │   ├── translations.tsx
│   │   ├── voiceDetails.tsx
│   │   └── voiceSelect.tsx
│   ├── types/
│   |   └── voice.d.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.module.css
│   └── page.tsx
├── node_modules
├── pages/
│   └── api/
│       ├── get-audio.ts
│       └── voices.ts
├── public/
├── .env.local
├── .gitignore
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```
***
![image](https://github.com/user-attachments/assets/d0ed6ed7-92de-4043-b0bf-349a4695cc46)

