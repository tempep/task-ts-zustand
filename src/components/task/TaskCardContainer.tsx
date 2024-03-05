import { useState } from "react";
import { useTask } from "../../hooks/useTask";
import { ModalNewTask, TaskCardItem } from "../index";
import { IoCheckmarkCircleOutline, IoRocketOutline, IoWarningOutline } from "react-icons/io5";
import { TaskResponse, TaskStatus } from "../../interfaces";
import classNames from "classnames";
import { useTaskStore } from "../../store/task.store";

interface Props {
    title: string;
    tasks: TaskResponse[];
    status: TaskStatus;
    createNewTask?: boolean;
}

export const TaskCardContainer = ({ title, tasks, status, createNewTask }: Props) => {
    const { handleDragOver, handleDragLeave, handleDrop, isDragging, onDragOver } = useTask({ status });
    const arrayTasks = useTaskStore( state => state.tasks );
    const [modal, setModal] = useState(false);

    const toggleModal = (): void => {
        setModal(!modal);
    }

    return (
        <>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={
                    classNames('!text-black border-4 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]', {
                        'border-dotted border-blue-500': isDragging,
                        'border-double border-green-500': isDragging && onDragOver,
                    })
                }>

                {/* Task Header */}
                <div className="relative flex flex-row justify-between mb-2">

                    <div className="flex items-center justify-center">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
                            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
                                {status === 'done' ? (
                                    <IoCheckmarkCircleOutline size={50} />
                                ) : status === 'in-progress' ? (
                                    <IoRocketOutline size={50} />
                                ) : <IoWarningOutline size={50} />
                                }
                            </span>
                        </div>
                        <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
                    </div>

                    {
                        createNewTask && (
                            <button
                                onClick={() => setModal(true)}
                                className="group px-4 py-2 bg-transparent text-black hover:bg-sky-500 hover:scale-110 rounded-full shadow-md transition">
                                <span className={
                                    classNames("font-medium group-hover:animate-none group-hover:text-white", {
                                        'animate-ping': arrayTasks.length === 0
                                    })
                                }>New</span>
                            </button>
                        )
                    }

                </div>

                {/* Task Items */}
                <div className="h-full w-full flex flex-col items-center gap-2">
                    {
                        tasks.length !== 0 ? (
                            tasks.map(task => (
                                <TaskCardItem task={task} key={task._id} />
                            ))
                        ) : <span className="text-2xl font-bold text-center">There is no task. Create or drag one over here!</span>
                    }
                </div>

                {/* Modal new task */}
                {modal && (
                        <ModalNewTask toggleModal={toggleModal} />
                )}

            </div>
        </>
    )
}