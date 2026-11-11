import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, GenerateContentResponse, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let currentVoiceVersion = 'natural3';

function getAiClient(): GoogleGenAI {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  app.post('/api/gemini/generate', async (req, res) => {
    try {
      const { prompt, systemInstruction, responseMimeType } = req.body || {};
      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Missing prompt' });
        return;
      }

      const ai = getAiClient();
      const config: Record<string, unknown> = {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      };
      if (systemInstruction) {
        config.systemInstruction = systemInstruction;
      }
      if (responseMimeType) {
        config.responseMimeType = responseMimeType;
      }

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config,
      });

      res.json({ text: response.text ?? '' });
    } catch (error: any) {
      console.error('Gemini API error:', error);
      res.status(error?.status || 500).json({
        error: error?.message || 'Failed to generate content from Gemini API',
      });
    }
  });

  app.post('/api/voice/upload', async (req, res) => {
    try {
      const { audioDataUrl } = req.body || {};
      if (!audioDataUrl || typeof audioDataUrl !== 'string') {
        res.status(400).json({ error: 'Geçersiz ses verisi' });
        return;
      }
      const base64Match = audioDataUrl.match(/^data:[^;]+;base64,(.+)$/);
      if (base64Match && base64Match[1]) {
        const buffer = Buffer.from(base64Match[1], 'base64');
        const targetDir = path.join(__dirname, 'public', 'assets', 'aistudio');
        fs.mkdirSync(targetDir, { recursive: true });
        const targetFile = path.join(targetDir, 'sekreter_ornek_ses.mp3');
        fs.writeFileSync(targetFile, buffer);
        currentVoiceVersion = `v_${Date.now()}`;
      }
      res.json({
        ok: true,
        audioUrl: `/assets/aistudio/sekreter_ornek_ses.mp3?v=${currentVoiceVersion}`,
      });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Ses dosyası kaydedilemedi' });
    }
  });

  app.post('/api/tts', async (_req, res) => {
    res.json({
      audioDataUrl: `/assets/aistudio/sekreter_ornek_ses.mp3?v=${currentVoiceVersion}`,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
