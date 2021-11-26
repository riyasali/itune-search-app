import { Router, Request, Response, NextFunction } from 'express';
import  ItunesController  from './controllers/itune-search.controller';

const router = Router();

router.get("/search/:artist", async (req: Request, res: Response, next: NextFunction) => {
   const itunes = new ItunesController();
  try {
    await itunes.search(req, res, next);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/search/", async (req: Request, res: Response, next: NextFunction) => {
 try {
   res.status(400).json({message: 'Bad Request. Artist name is required'});
 } catch (err) {
   res.status(500).send(err.message);
 }
});

export default router;
