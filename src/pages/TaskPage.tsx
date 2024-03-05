import { useEffect } from "react";
import { useTaskStore } from "../store/task.store"
import { TaskCardContainer } from "../components/task/TaskCardContainer";


export const TaskPage = () => {

  const getTasks = useTaskStore(state => state.getTasks);
  const pendingTasks = useTaskStore(state => state.getTaskByStatus('pending'));
  const doneTasks = useTaskStore(state => state.getTaskByStatus('done'));
  const inProgressTasks = useTaskStore(state => state.getTaskByStatus('in-progress'));

  useEffect(() => {
    getTasks();
  }, []);



  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      <TaskCardContainer createNewTask title='Pendientes' status='pending' tasks={pendingTasks} />

      <TaskCardContainer title='Avanzando' status='in-progress' tasks={inProgressTasks} />

      <TaskCardContainer title='Terminadas' status='done' tasks={doneTasks} />

    </div>
  )
}
