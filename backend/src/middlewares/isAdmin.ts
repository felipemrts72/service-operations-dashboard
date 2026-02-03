import { Request, Response, NextFunction } from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.userRole !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Acesso restrito a administradores' });
  }

  return next();
}
