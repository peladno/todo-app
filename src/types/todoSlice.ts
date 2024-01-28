export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  dueDate: Date | null;
  creationDate: Date;
  status: string;
  db_id?: string;
};

export type TodoState = {
  created_by: string | null;
  shared_users: [];
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
