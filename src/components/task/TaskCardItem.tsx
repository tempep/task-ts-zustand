import { useState } from "react"
import { TaskResponse } from "../../interfaces";
import { useTaskStore } from "../../store/task.store";
import classNames from "classnames";
import toast from "react-hot-toast";

interface Props {
    task: TaskResponse;
}

export const TaskCardItem = ({ task }: Props) => {

    const [show, setShow] = useState(false);
    const setDragginTaskId = useTaskStore(state => state.setDragginTaskId);
    const removeDragginTaskId = useTaskStore(state => state.removeDragginTaskId);
    const deleteTask = useTaskStore(state => state.deleteTask);

    const capitalizeFirstLetter = (value: string) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    const handleDeleteTask = async (id: string) => {
        try {
            toast.promise(deleteTask(id), {
                loading: 'Deleting task...',
                success: 'Task have been deleted',
                error: 'Something went wrong!'
            });
        } catch (error) {
            toast.error(`${error}`);
        }
    }


    return (
        <div
            className="group w-full max-w-sm hover:scale-110 hover:z-20 bg-white border border-gray-200 rounded-lg shadow-md transition-all"
            draggable
            onDragStart={() => setDragginTaskId(task._id)}
            onDragEnd={() => removeDragginTaskId()}
            onMouseOver={() => show && setShow(true)}
            onMouseOut={() => setShow(false)}
        >

            <div className="flex justify-between mx-3">
                <span className={
                    classNames("text-sm font-medium", {
                        "text-green-600": task.status === 'done',
                        "text-blue-600": task.status === 'in-progress',
                        "text-yellow-400": task.status === 'pending'
                    })
                }
                >{capitalizeFirstLetter(task.status)}</span>

                <div className="relative block text-left">
                    <button
                        className="block text-gray-500 z-10 hover:bg-gray-100 rounded-lg text-sm p-1.5"
                        type="button"
                        onClick={() => setShow(!show)}
                    >
                        <span className="sr-only">Open dropdown</span>
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                    </button>
                </div>

                <div
                    className={`absolute ${show ? 'block' : 'hidden'} group-hover:mx-8 group-hover: z-20 right-0 mt-8 mx-24 w-52 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
                >
                    <ul className="py-2">
                        <li>
                            <button
                                type="button"
                                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                                onClick={() => console.log('Hello mom edit')}
                            >
                                Edit
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="w-full px-4 py-2 text-sm text-left opacity-50"
                            >
                                Export Data
                            </button>
                        </li>
                        <li>
                            <button
                                className="w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100"
                                onClick={() => handleDeleteTask(task._id)}
                            >
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col items-center pb-2">
                <h5 className="mb-1 text-xl font-medium text-black">{task.title}</h5>
    
                <p className="whitespace-nowrap overflow-hidden text-ellipsis align-bottom">{task.description}</p>
            </div>

        </div>
    )
}
