'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css'; // Verifique se o caminho está correto

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data); // Verifique se a API retorna o array correto
      } else {
        router.push('/login');
      }
    };

    fetchTasks();
  }, [router]);

  const updateTask = async () => {
    // Função para atualizar a tarefa
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image
          src="/logo.png" // Caminho relativo à pasta public
          alt="Logo"
          className={styles.logo}
          width={90}
          height={30}
        />
        <nav>
          <ul className={styles.navButtons}>
            <li><a href="/">Home</a></li>
            <li><a href="/register">Registrar</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <h1>Sessões em Aberto</h1>

        <div className={styles.contentContainer}>
          <div className={styles.taskListContainer}>
            <ul className={styles.taskList}>
              {tasks.map((task) => (
                <li key={task._id} className={styles.taskItem}>
                  {editTaskId === task._id ? (
                    <>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className={styles.input}
                      />
                      <button onClick={updateTask} className={styles.button}>
                        Salvar
                      </button>
                    </>
                  ) : (
                    <>
                      {task.title}
                      {/* Adicione botões para editar ou excluir tarefas aqui */}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.imageContainer}>
            <Image
              src="/furiosa.png"
              alt="Imagem personalizada"
              width={300}
              height={300}
            />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 CineVinheta. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
