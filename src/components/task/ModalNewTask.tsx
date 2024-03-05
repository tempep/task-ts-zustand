import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoReaderOutline } from "react-icons/io5";
import { useTaskStore } from "../../store/task.store";
import toast from "react-hot-toast";


interface Inputs {
    title: string;
    description: string;
}

interface Props {
    toggleModal: () => void;
}

export const ModalNewTask = ({ toggleModal }: Props) => {
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<Inputs>();
    const newTask = useTaskStore(state => state.newTask);

    const onSubmit: SubmitHandler<Inputs> = async ({ title, description }) => {
        try {
            toast.promise(newTask(title, description), {
                loading: 'Saving new task...',
                success: 'Task have been saved!',
                error: 'Something went wrong, try again.'
            });
            reset();
            toggleModal();
        } catch (error) {
            toast.error(`${error}`);
        }
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[999]">
            {/* Modal Overlay */}
            <div className="fixed top-0 left-0 bottom-0 right-0 w-full bg-[rgba(49,49,49,0.8)] h-full"></div>
            {/* Modal content */}
            <div className="absolute w-1/4 top-[15%] left-[40%] animate-trans-top">
                <div className="p-12 shadow-md rounded-sm bg-white">

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col justify-center gap-3 p-12 bg-indigo-100 w-full rounded-sm shadow-lg"
                    >

                        <IoReaderOutline size={100} className="self-center" />
                        <h2 className="text-center text-2xl font-medium">New Task</h2>

                        <div className="flex flex-col">
                            <label htmlFor="title" className="">Title</label>
                            <input
                                type="text"
                                id="title"
                                autoComplete="off"
                                placeholder="Type a title for your task here..."
                                className="px-2.5 py-3 w-full text-sm text-gray-900 rounded-lg shadow-md focus:outline-none"
                                {...register('title', { required: true })}
                            />
                            {errors.title && <span className="text-red-600">The title is required</span>}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                autoComplete="off"
                                placeholder="Type a description for your task here..."
                                rows={3}
                                className="px-2.5 py-3 w-full text-sm text-gray-900 rounded-lg shadow-md focus:outline-none"
                                {...register('description', { required: true })}
                            >
                            </textarea>
                            {errors.description && <span className="text-red-600">The description is required</span>}
                        </div>

                        <button
                            type="submit"
                            className={
                                classNames("px-4 py-2 self-center w-1/2 bg-indigo-600 rounded-sm text-white shadow-md mt-2 opacity-50", {
                                    '!opacity-100 transition hover:scale-110': isValid,
                                    'hover:scale-100 cursor-default': !isValid,
                                })
                            }
                        >
                            Create
                        </button>

                    </form>

                </div>

                {/* Modal close button */}
                <button
                    type="button"
                    className="absolute top-1 right-2 text-3xl hover:scale-125 transition"
                    onClick={toggleModal}
                >&times;</button>
            </div>
        </div>
    )
}
