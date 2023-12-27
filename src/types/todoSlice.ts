export type Task = {
  id: string;
  userId: string | undefined;
  title: string;
  description: string;
  dueDate: Date;
  creationDate: Date;
  status: string;
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
}
