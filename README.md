# Meu Perfil Dev

Aplicativo mobile de perfil pessoal desenvolvido com React Native e Expo, com foco em apresentar informações profissionais de forma simples, moderna e visualmente agradável.

## Visão geral

Este projeto funciona como uma landing page mobile para um perfil profissional, com:

- foto de perfil
- nome e cargo
- descrição pessoal
- lista de habilidades
- contador de curtidas
- botão de contato

A interface foi pensada para ser leve, responsiva e fácil de adaptar para outros perfis profissionais.

## Tecnologias utilizadas

- React Native
- Expo
- JavaScript
- React Native StyleSheet

## Estrutura do projeto

```bash
meu-perfil-dev/
├── App.js                 # Tela principal da aplicação
├── components/
│   └── Header.js          # Componente de cabeçalho
├── assets/                # Ícones e imagens do app
├── app.json               # Configuração do Expo
├── index.js               # Ponto de entrada da aplicação
├── package.json           # Dependências e scripts do projeto
├── README.md              # Documentação do projeto
└── LICENSE                # Licença do projeto
```

## Funcionalidades

- Exibição de avatar com imagem externa
- Nome e profissão em destaque
- Seção "Sobre mim" com texto de apresentação
- Lista de competências técnicas e sociais
- Botão para incrementar curtidas
- Alerta de contato com e-mail

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js
- npm ou yarn
- Expo CLI
- Android Studio ou emulador Android, ou o Expo Go no celular

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/meu-perfil-dev.git
cd meu-perfil-dev
```

2. Instale as dependências:

```bash
npm install
```

## Como executar

Inicie o ambiente de desenvolvimento com:

```bash
npm start
```

Em seguida, você pode:

- abrir no emulador Android com:

```bash
npm run android
```

- abrir no simulador iOS:

```bash
npm run ios
```

- rodar em navegador web:

```bash
npm run web
```

## Scripts disponíveis

No arquivo `package.json`, os scripts principais são:

```bash
npm start
npm run android
npm run ios
npm run web
```

## Observações

Este projeto foi desenvolvido como exemplo inicial de um perfil profissional em React Native, sendo uma boa base para evoluções futuras, como:

- adicionar redes sociais
- incluir projetos e portfólio
- criar navegação entre telas
- integrar com backend ou CMS

## Licença

Este projeto está licenciado sob a licença MIT.
