
export type TaskStatus = 'pending' | 'in-progress' | 'done';

export interface TaskResponse {
    _id:         string;
    title:       string;
    description: string;
    date:        string;
    user:        string;
    createdAt:   string;
    updatedAt:   string;
    status: TaskStatus;
    __v: string;
}