import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generatePoem } from "./openai";
import { z } from "zod";

const poemRequestSchema = z.object({
  theme: z.string().min(1)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Poem generation endpoint
  app.post("/api/generate-poem", async (req, res) => {
    try {
      const validation = poemRequestSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Tema requerido para generar el poema" 
        });
      }

      const { theme } = validation.data;
      const result = await generatePoem({ theme });
      
      return res.json(result);
    } catch (error) {
      console.error("Error in poem generation route:", error);
      return res.status(500).json({ 
        error: "Error interno del servidor al generar el poema" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
