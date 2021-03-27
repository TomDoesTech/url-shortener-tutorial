import { Request, Response } from "express";
import ShortUrl from "../models/shortUrl.model";
import Analytics from "../models/analytics.model";

export async function createShortUrl(req: Request, res: Response) {
  const { destination } = req.body;

  const shortUrl = await ShortUrl.create({
    destination,
  });

  return res.send(shortUrl);
}

export async function getShortUrl(req: Request, res: Response) {
  const { shortId } = req.params;

  const shortUrl = await ShortUrl.findOne({
    shortId,
  });

  if (!shortUrl) {
    return res.sendStatus(404);
  }

  Analytics.create({
    shortUrl: shortUrl._id,
  });

  return res.redirect(shortUrl.destination);
}
