
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../../../lib/prisma';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // Find user by email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
        }

        // Compare password
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.NEXT_PUBLIC_JWT_SECRET, {
            expiresIn: '1h', // Token expires in 1 hour
        });

        // Set token in cookies
        return new Response(JSON.stringify({ message: 'Login successful', token }), {
            status: 200,
            headers: {
                'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=3600;`, // 1 hour expiry
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
