import { jwtMiddleware } from "@/utils/middleware";
import { getTasks, addTask, updateTask, deleteTask } from "@/controllers/TaskController";

// método GET - listar as tarefas do Usuário
export async function GET(req, res) {
    return jwtMiddleware(async (req, res) => {
        await getTasks(req, res).json({ message: 'Erro ao get' });
    })(req, res);
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
