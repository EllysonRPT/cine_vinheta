import User from "@/models/User";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';


export async function POST(request) {
    const {username, password} = await request.json();
    console.log("dados recebidos", {username, password});
    await connectMongo();
    //verificar se o user existe
    try {
        const user = await User.findOne({username});
       const isPasswordValue = await bcrypt.compare(password, user.password);
       console.log("senha valida", isPasswordValue);


        //CRIAR MINHA TOKEN DE AUTORIZAÇÃO
        const token = jwt.sign({ userId: user._id },
             process.env.JWT_SECRET, { expiresIn: '1h' });
        return NextResponse.json({ token });


    } catch (error) {
        return NextResponse.json({success:false},{status:400});
    }
   
}
