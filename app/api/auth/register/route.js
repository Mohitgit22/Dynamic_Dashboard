// app/api/auth/register/route.js
import { hash } from 'bcryptjs';
import prisma from '../../../../lib/prisma';

export async function POST(req) {
    const { name, email, password } = await req.json();
    const hashedPassword = await hash(password, 10);
    console.log("Hashed Password:", hashedPassword); // Debugging log
    
    
    const user = await prisma.user.create({
        data: { 
            name,
            email, 
            password: hashedPassword 
        }
    });
    
    return Response.json({ user });
}