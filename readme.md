<h1 align="center">Projeto Final Mobile</h1>

<h2 align="center">Dependências do Projeto</h2>

[VSCode](https://code.visualstudio.com)

[Android Studio](https://developer.android.com/studio/run/managing-avds?hl=pt-br)

<h3 align="center">Extensões do Projeto</h2>

[GitGraph](vscode:extension/mhutchie.git-graph)

[Prettier](vscode:extension/esbenp.prettier-vscode)

[ESLint](vscode:extension/dbaeumer.vscode-eslint)

<h3 align="center">Configuração</h2>

Após ter instalado o Vscode, Android Studio, Node e todas as extensões do projeto, vamos instalar as depedências do projeto. Para isso rode o seguinte comando no terminal:

`npm install`

Agora, vamos configurar o projeto para a formatação padrão.

Todas os arquivos no PullRequest's desse projeto devem estar devidamente formatados, então esses passos são essenciais.

Com o projeto aberto, digite o comando:

```Formating
COMMAND + SHIFT + P    (MacOs)
CTRL + SHIFT + P       (Windows)
```

Digite: ">Format Document With" no prompt, dê enter e escolha o Prettier.

Em seguida.

Em "Settings ou (Ctrl +)", digite "Format" e selecione o box "Editor:Format on Save"

Perceba, essa configuração têm que ser feita globalmente, cuidado para não pular uma das etapas e configurar apenas para um arquivo.

Agora com o Projeto configurado, toda vez que você digitar:

```Formating
COMMAND + SHIFT + S    (MacOs)
CTRL + SHIFT + S      (Windows)
```

O seu projeto ira ser formatado automaticamente.

<h3 align="center">Rodar o Projeto</h2>

Para iniciar o emulador, sempre verifique o arquivo package.json e seus scripts.

```json
"scripts": {
    "android": "expo start --android"
},
```

Algumas formas de inicializar o projeto:

```json
    npm expo start
    npx expo start
    yarn expo start
    npm expo start --android
    npx expo start --android
    yarn expo start --android
```

```json
    --android já inicia no emulador caso o emulador já esteja configurado nas váriaveis de ambiente.
```
