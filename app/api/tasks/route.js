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
    return jwtMiddleware(async (req, res) => {
        await addTask(req, res).json({ message: 'Erro ao atualizar Post' });;
    })(req, res);
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
