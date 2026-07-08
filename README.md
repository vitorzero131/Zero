# Video Editor with AI Caption Generation

This project provides an automated video caption generation system powered by Claude AI.

## Features

- Automated caption generation using Claude AI
- FFmpeg integration for video processing
- TypeScript implementation
- Express.js server for API endpoints

## Prerequisites

- Node.js (v18+)
- FFmpeg
- Anthropic API key

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file based on `.env.example` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=your_api_key_here
PORT=3000
```

## Usage

### Start the server

```bash
npm run start
```

### Generate captions for a video

```bash
npm run captions path/to/video.mp4
```

## Project Structure

- `server.ts` - Express.js server setup
- `render.ts` - Video rendering and processing
- `test-captions.ts` - Caption generation testing
- `package.json` - Project dependencies
- `tsconfig.json` - TypeScript configuration
- `nixpacks.toml` - Deployment configuration

## API Endpoints

- `POST /api/captions` - Generate captions for a video
- `GET /health` - Health check endpoint

## License

MIT
