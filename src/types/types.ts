export type InitialType = {
    todos: TodoItem[] | [];
    isLoad: boolean;
    isError: boolean;
    sort:string;
    tempTodos? : TodoItem[] | [];
  }
  export type TodoItem = {
    id: number;
    title: string;
    completed: boolean;
   
  }

