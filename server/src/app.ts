import config from "config";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { version } from "../package.json";
import { createShortUrl, getShortUrl } from "./controllers/shortUrl.controller";

import db from "./db";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  cors({
    origin: config.get("corsOrgin"),
  })
);

const port = config.get("port");

app.listen(port, () => {
  console.log(`App listing on http://localhost:${port}`);

  db();
});

// Healthcheck
app.get("/healthcheck", (req: Request, res: Response) => {
  res.send(`Running version: ${version}`);
});

// Creating a short URL
app.post("/api/url", createShortUrl);

// Redirecting
app.get("/:shortId", getShortUrl);
