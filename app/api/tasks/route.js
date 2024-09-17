import { jwtMiddleware } from "@/utils/middleware";
import { getTasks, addTask, updateTask, deleteTask } from "@/controllers/TaskController";
import { connect } from "mongoose";
import connectMongo from "@/utils/dbConnect";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

// método GET - listar as tarefas do Usuário
export async function GET(req, res) {
try {
    await connectMongo();

const tasks = await Task.find();
return NextResponse.json(tasks);

} catch (error) {
    console.error("erro ao buscar tarefa", error);
    return NextResponse.json({success:false, message:"erro ao buscar tarefa" },{status:500});
}   
}

// Método POST - nova tarefa
export async function POST(req, res) {
try {
   await connectMongo();
   const {title }= await request.json();
   const token= request.headers.get('authorization')?.split(' ')[1];

   if (!token) {
    return NextResponse.json({success:false,message:" nao encontrado a token"},{status:401});
    
   }
   const decode=jwt.verify(token, process.env.JWT_SECRET );
   const userId = decode.userId;

   const task = new Task({userId,title});
   await task.save();
   return NextResponse.json(task);
} catch (error) {
   console.error("erro ao adicionar eu acho",error) 
}
}

// Método PUT - Atualiza uma tarefa existente
export async function PUT(req, res) {
    return jwtMiddleware(async (req, res) => {
        await updateTask(req, res).json({ message: 'Erro ao atualizar put' });;
    })(req, res);
}

// Método DELETE - Deleta uma tarefa existente
export async function DELETE(req, res) {
    return jwtMiddleware(async (req, res) => {
        await deleteTask(req, res).json({ message: 'Erro ao atualizar delete' });;
    })(req, res);
}
