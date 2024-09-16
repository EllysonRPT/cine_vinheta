import User from "@/models/User";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { username, password } = await request.json();
  await connectMongo();

  try {
    const user = await User.findOne({ username });
    
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ success: false, message: 'Credenciais inválidas' }, { status: 400 });
    }

    // Gerar o token de autorização
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erro no servidor' }, { status: 500 });
  }
}
