import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Autenticação necessária' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Aqui está sendo atribuído o userId ao req.user
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};
