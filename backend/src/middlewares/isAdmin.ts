import { Request, Response, NextFunction } from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Acesso restrito a administradores' });
  }

  next();
}
