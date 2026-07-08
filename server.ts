import express, { Express, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import Anthropic from "@anthropic-ai/sdk";

const app: Express = express();
const port = process.env.PORT || 3000;
const client = new Anthropic();

const upload = multer({ dest: "uploads/" });

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.post(
  "/api/captions",
  upload.single("video"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: "No video file provided" });
      return;
    }

    try {
      const videoPath = req.file.path;
      const videoName = req.file.originalname;

      const message = await client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `Generate captions for a video named "${videoName}". Please provide detailed captions describing the visual content and suggest a title.`,
          },
        ],
      });

      // Clean up uploaded file
      await fs.unlink(videoPath);

      if (message.content[0].type === "text") {
        res.json({
          success: true,
          captions: message.content[0].text,
          videoName,
        });
      } else {
        res.status(500).json({ error: "Unexpected response format from AI" });
      }
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
