import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }   

        console.log(user.password)
        console.log("password:", password)

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha inválida' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({ token });
    }
    catch (error) {
        console.error("ERRO DO SERVIDOR:", error);
        return res.status(500).json({ message: 'Erro ao autenticar o usuário' });
    }
}
export const register = async (req, res) => {
    try {
        const { name, email, password, password_confirmation } = req.body;

        if (password !== password_confirmation) {
            return res.status(400).json({ message: 'As senhas não coincidem' });
        }
        if (!name || !email || !password || !password_confirmation) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }
        
        // 2. Verifica se o usuário já existe no banco
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Este e-mail já está cadastrado' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({ data: { name, email, password: hashedPassword } });
        return res.status(201).json({message: 'Usuário cadastrado com sucesso!',user: newUser});
    } catch (error) {
        console.error("ERRO DO SERVIDOR:", error);
        return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
}
