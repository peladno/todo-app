export type Task = {
  created_at: Date;
  description: string;
  dueDate: Date;
  id: string;
  name: string;
  status: string;
  task_list_id: string;
};

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
