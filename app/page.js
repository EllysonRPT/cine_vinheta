// pages/index.js (ou app/page.js)
'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import styles from './page.module.css'; // Certifique-se de que este caminho está correto

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
        setTasks(data); // Certifique-se de que a API retorna o array correto
      } else {
        router.push('/login');
      }
    };

    fetchTasks();
  }, [router]);
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        {/* Logo no canto superior esquerdo */}
        <Image
          src="/logo.png" // Caminho relativo à pasta public
          alt="Logo"
          className={styles.logo}
          width={90} // Ajuste o tamanho conforme necessário
          height={30} // Ajuste o tamanho conforme necessário
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
        <h1>SESSÕES EM ABERTO</h1>
        <ol>
          <li>
            Bem-vindo à Página Inicial
          </li>
        </ol>

        <div className={styles.ctas}>
       
            Sessões Aberta
            
         

        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
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
      </main>

      <footer className={styles.footer}>
        <p>

        </p>
      </footer>
    </div>
  );
} 