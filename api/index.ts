import express, { type Request, Response, NextFunction } from "express";
// !! THIS IS THE FIX !!
// The files are still in the 'server' folder, so we point there.
import { registerRoutes } from "../server/routes";
import { log } from "../server/vite";

// This is in the correct top-level scope
declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

// This will be our cached Express app
let app: express.Express | null = null;

// This async function sets up our app one time
async function setupApp() {
  if (app) {
    return app;
  }

  const newApp = express();

  newApp.use(express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  }));
  newApp.use(express.urlencoded({ extended: false }));

  // Logging middleware
  newApp.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }
        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }
        log(logLine);
      }
    });

    next();
  });

  // Register all your API routes
  await registerRoutes(newApp);

  // The error handler (no typos)
  newApp.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err); // Log the error
  });

  // Cache the app and return it
  app = newApp;
  return app;
}

// This is the function Vercel will call on every API request
export default async function handler(req: Request, res: Response) {
  const expressApp = await setupApp();
  return expressApp(req, res);
}
