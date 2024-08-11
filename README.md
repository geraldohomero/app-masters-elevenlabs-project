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

Este projeto é uma aplicação web que converte texto em voz utilizando a `API` da `ElevenLabs`. O projeto foi desenvolvido como parte do `Projeto App Masters` e utiliza diversas tecnologias modernas, incluindo React, TypeScript e [Ant Design](https://ant.design/).

## Funcionalidades

- **Entrada de Texto**: Permite ao usuário digitar o texto que deseja converter em voz.
- **Seleção de Voz**: O usuário pode selecionar diferentes vozes disponíveis para a conversão.
- **Reprodução de Áudio**: O usuário pode ouvir a conversão do texto em voz diretamente na aplicação.
- **Download de Áudio**: O usuário pode baixar o áudio gerado em formato MP3.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Ant Design**: Biblioteca de componentes de interface de usuário para React.
- **API da ElevenLabs**: Serviço de conversão de texto em voz.
- **Vercel Blob Storage**: Serviço de armazenamento de arquivos para download.
- **Vercel**: Plataforma de deploy de aplicações web.

## Estrutura do Projeto

### Componentes Principais

- **textInput**: Componente para entrada de texto.
- **voiceSelect**: Componente para seleção de voz.
- **voiceDetails**: Componente que exibe detalhes da voz selecionada.
- **VoiceFilter.tsx**: Componente de filtro da lista de vozes
- **listaVozes**: Componente principal que integra os demais componentes e gerencia o estado da aplicação.

### Estrutura de diretórios

```markdown
.
├── app/
│   ├── components/
│   │   ├── listaVozes.tsx
│   │   ├── textInput.tsx
│   │   ├── voiceDetails.tsx
│   │   └── voiceSelect.tsx
│   ├── hooks/
│   |   └── useVoiceFilter.ts
│   ├── types/
│   |   └── voice.d.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
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
![image](https://github.com/user-attachments/assets/55884a3b-b22e-4f80-be22-187ab7c91037)

