# YouTube MP3 Downloader

Este projeto é um script Node.js que baixa e converte vídeos do YouTube para arquivos MP3, salvando-os na pasta Downloads do seu PC. Se já existir um arquivo com o mesmo nome, ele renomeará automaticamente para evitar conflitos.

## Pré-requisitos

Certifique-se de ter o Node.js e npm instalados em sua máquina.

## Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/youtube-mp3-downloader.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd youtube-mp3-downloader
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

## Uso

Para usar o script, substitua o URL do vídeo do YouTube pelo URL do vídeo que você deseja baixar e execute o script:

```javascript
const videoUrl = 'https://www.youtube.com/watch?v=B1ykr-a5G9g'; // Substitua com o URL do vídeo do YouTube
 const videoTitle = info.videoDetails.title;
  res.download(outputPath, `${videoTitle}.mp3`);