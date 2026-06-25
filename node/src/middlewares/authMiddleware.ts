export function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido. Acesso negado!' });
  }

  // Se o token for válido, chama o next() para o Express seguir em frente
  next();
}