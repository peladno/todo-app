export type NewTask = {
  description: string;
  dueDate: Date;
  name: string;
  status: 'pending' | 'completed' | 'deleted';
};

export interface Task extends NewTask {
  created_at: Date;
  id: string;
  task_list_id: string;
}

export type TodoState = {
  tasks: Task[];
  isLoading: boolean;
  isError: boolean;
  error: string | null | unknown;
};

export enum TodoActionTypes {
  FETCH_TASK = 'FETCH_TASK',
  EDIT_TASK = 'EDIT_TASK',
  DELETE_TASK = 'DELETE_TASK',
  ADD_TASK = 'ADD_TASK',
  FETCH_TASKS_BY_DUE_DATE = 'FETCH_TASKS_BY_DUE_DATE',
}
