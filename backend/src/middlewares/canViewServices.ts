import { Request, Response, NextFunction } from 'express';

export function canViewServices(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.user?.role === 'admin' || req.user?.role === 'viewer') {
    return next();
  }

  return res.status(403).json({ message: 'Acesso negado' });
}
