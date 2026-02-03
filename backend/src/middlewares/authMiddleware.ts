import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  role: 'admin' | 'viewer';
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // formato esperado: Bearer TOKEN
  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Token mal formatado' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    // anexa o userId na request
    req.userId = decoded.userId;
    req.userRole = decoded.role;

    return next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
