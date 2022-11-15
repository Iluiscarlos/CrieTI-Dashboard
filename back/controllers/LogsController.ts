import express, {Express, Request, Response, NextFunction} from 'express';
import LogModel from '../models/Logs';

class LogsController {

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const log = await LogModel.create();
        res.json(log);
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    }
  }
  
  
  export default new LogsController();