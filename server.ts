import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json());

  // API Route for Locutor Penélope / Recado do Sítio
  app.post("/api/locutor", async (req, res) => {
    try {
      const { prompt, stationName, listenerName, city } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      const fallbackText = `Eeeu compadre ${listenerName || 'ouvinte'} lá de ${city || 'Mato Grosso'}! A rádio ${stationName || 'Vila Real 98.3'} tá no ar com o melhor do modão xucro! Ajeita o fone, toma aquele tereré trincando de gelado e vamo rodar o som do sertão!`;

      if (!apiKey) {
        return res.json({ text: fallbackText });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `Você é o "Penélope", o lendário e carismático locutor da madrugada das rádios de Mato Grosso e do sertão caipira. 
Seu estilo é autêntico, saudosista, caipira e sertanejo de raiz. 
Você usa expressões típicas como: "tchô", "comadre", "compadre", "moço do céu", "tereré gelado", "modão xucro", "ajeita o chapéu", "sítio", "fazenda", "ôôô trem bão".
Responda ao pedido do ouvinte mandando um alô caloroso no ar ou contando um pequeno causo em 2 a 4 frases bem animadas e caipiras.`;

      const userMessage = prompt || `Mande um alô para o ouvinte ${listenerName || 'do sítio'} que está ouvindo a rádio ${stationName || 'Vila Real 98.3'}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessage,
        config: { systemInstruction }
      });

      res.json({ text: response.text || fallbackText });
    } catch (err: any) {
      console.error("Locutor API error:", err?.message || err);
      res.json({
        text: "Eiiita nóis! O sinal deu uma chiada na serra de Chapada dos Guimarães, mas o modão não para! Ajeita o chapéu e bora ouvir a viola chorar!"
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
