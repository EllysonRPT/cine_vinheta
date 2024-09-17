import { jwtMiddleware } from "@/utils/middleware";
import jwt from "jsonwebtoken";
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
        return NextResponse.json({ success: false, message: "erro ao buscar tarefa" }, { status: 500 });
    }
}

// Método POST - nova tarefa
export async function POST(request) {
    try {
        await connectMongo();
        const { title } = await request.json();
        const token = request.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ success: false, message: " nao encontrado a token" }, { status: 401 });

        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decode.userId;

        const task = new Task({ userId, title });
        await task.save();
        return NextResponse.json(task);
    } catch (error) {
        console.error("erro ao adicionar eu acho", error)
    }
}
export async function DELETE(request) {
    try {
      await connectMongo();
      const { id } = await request.json();
      
      const deletedTask = await Task.findByIdAndDelete(id);
      
      if (!deletedTask) {
        return NextResponse.json({ success: false, message: "Tarefa não encontrada" }, { status: 404 });
      }
      
      return NextResponse.json({ success: true, message: "Tarefa excluída com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      return NextResponse.json({ success: false, message: "Erro ao excluir tarefa" }, { status: 500 });
    }
  }

  export async function PUT(request) {
    try {
      await connectMongo();
      const { id, title, status } = await request.json();
  
      if (!id) {
        return NextResponse.json({ success: false, message: 'ID da tarefa ausente' }, { status: 400 });
      }
  
      const task = await Task.findById(id);
      if (!task) {
        return NextResponse.json({ success: false, message: 'Tarefa não encontrada' }, { status: 404 });
      }
  
      // Atualize o título e o status
      task.title = title !== undefined ? title : task.title;
      task.status = status !== undefined ? status : task.status;
  
      await task.save();
  
      return NextResponse.json(task);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      return NextResponse.json({ success: false, message: "Erro ao atualizar tarefa" }, { status: 500 });
    }
  }




