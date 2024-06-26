const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const os = require('os');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors({
  origin: [
    '*',
    'http://localhost:3000'
  ]
}));

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
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const outputFilePath = path.join(outputPath, `${title}.mp3`);

    const videoReadableStream = ytdl(url, { filter: 'audioonly' });

    ffmpeg(videoReadableStream)
      .audioBitrate(128)
      .save(outputFilePath)
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

const downloadsFolder = path.join(os.homedir(), 'Downloads');

app.get('/download', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).send('URL do vídeo é obrigatória');
  }

  downloadAndConvertToMp3(videoUrl, downloadsFolder);

  res.send('Download iniciado. Verifique o console para status.');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
