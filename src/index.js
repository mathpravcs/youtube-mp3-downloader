const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Função para gerar um nome de arquivo único
function generateUniqueFilename(filepath) {
  let uniquePath = filepath;
  let counter = 1;

  while (fs.existsSync(uniquePath)) {
    const parsedPath = path.parse(filepath);
    uniquePath = path.join(parsedPath.dir, `${parsedPath.name}(${counter})${parsedPath.ext}`);
    counter += 1;
  }

  return uniquePath;
}

// Função para baixar e converter vídeo do YouTube para MP3
async function downloadAndConvertToMp3(url, outputPath) {
  try {
    const videoReadableStream = ytdl(url, { filter: 'audioonly' });

    ffmpeg(videoReadableStream)
      .audioBitrate(128)
      .save(outputPath)
      .on('end', () => {
        console.log('Download e conversão concluídos!');
      })
      .on('error', err => {
        console.error('Erro durante o processo:', err);
      });
  } catch (err) {
    console.error('Erro ao baixar o vídeo:', err);
  }
}

// Exemplo de uso
const videoUrl = 'https://www.youtube.com/watch?v=5TwgxM6GWfo'; // Substitua com o URL do vídeo do YouTube
const downloadsFolder = path.join(os.homedir(), 'Downloads');
const initialOutputFilePath = path.join(downloadsFolder, 'output.mp3');
const uniqueOutputFilePath = generateUniqueFilename(initialOutputFilePath);

downloadAndConvertToMp3(videoUrl, uniqueOutputFilePath);
