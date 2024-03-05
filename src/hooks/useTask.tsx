import { DragEvent, useState } from "react"
import { TaskStatus } from "../interfaces"
import { useTaskStore } from "../store/task.store"

interface Props {
  status: TaskStatus
}

export const useTask = ({ status }: Props) => {

  const [onDragOver, setOnDragOver] = useState(false);

  const isDragging = useTaskStore(state => state.draggingTaskId);
  const onTaskDrop = useTaskStore(state => state.onTaskDrop);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(true);
  }
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
  }
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  }

  const newTask = () => {
    console.log('Hello mom!');
  }


  return {
    //Properties
    isDragging,


    //Methods
    onDragOver,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    newTask,

  }
}
