
import { getTask,createTask } from "@/controllers/TaskController";
import { NextResponse } from "next/server";
import { jwtMiddleware } from "@/utils/middleware";

// método GET - listar as tarefas do Usuário
export async function GET(req, res) {
    return jwtMiddleware(async (req, res) => {
        await getTodos(req, res);
    })(req, res);
}


// Método POST - nova tarefa
export async function POST(req, res) {
    return jwtMiddleware(async (req, res) => {
        await addTodo(req, res);
    })(req, res);
}


// Método PUT -  Atualiza uma tarefa existente
export async function PUT(req, res) {
    return jwtMiddleware(async (req, res) => {
        await updateTodo(req, res);
    })(req, res);
}


// Método DELETE -  Deleta uma tarefa existente
export async function DELETE(req, res) {
    return jwtMiddleware(async (req, res) => {
        await deleteTodo(req, res);
    })(req, res);
}
