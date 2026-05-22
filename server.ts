import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Mood Interpreter Endpoint
  app.post("/api/interpret-mood", async (req: Request, res: Response) => {
    try {
      const { prompt } = req.body;
      if (!prompt) return res.status(400).json({ error: "Prompt is required" });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `You are the Creative Director of AURA, a high-end interior design studio that blends Axel Vervoordt's wabi-sabi philosophy with Zaha Hadid's architectural futurism. 
          Your tone is minimalist, sophisticated, and poetic. 
          Analyze the user's description of their space or feeling and provide a design interpretation.
          
          Return a JSON object with:
          - name: A poetic 'Spatial Mood Name' (e.g., 'Wabi-Sabi Mornings').
          - palette: A curated 5-color material palette. Each item must have a 'hex' code and a 'material' description.
          - principles: Exactly 3 design principles applied to this space (max 10 words each).
          - direction: A poetic one-sentence design direction.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              palette: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    hex: { type: Type.STRING },
                    material: { type: Type.STRING }
                  },
                  required: ["hex", "material"]
                },
                minItems: 5,
                maxItems: 5
              },
              principles: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                minItems: 3,
                maxItems: 3
              },
              direction: { type: Type.STRING }
            },
            required: ["name", "palette", "principles", "direction"]
          }
        }
      });

      const result = JSON.parse(response.text || "{}");
      res.json(result);
    } catch (error) {
      console.error("AI Interpretation Error:", error);
      res.status(500).json({ error: "Failed to interpret mood" });
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
