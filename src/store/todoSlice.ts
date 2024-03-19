import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialType, TodoItem } from '../types/types';

export const getData = createAsyncThunk('get/getData', async () => {
  const { data } = await axios.get('https://412097daab842550.mokky.dev/all');
  return data.reverse();
});

export const postData = createAsyncThunk('post/postData', async (text: string,{dispatch}) => {
  const tempId = Date.now(); // Генерация временного ID
  const tempTodo = { id: tempId, title: text, completed: false };

  // Оптимистичное добавление
  dispatch(sliceData.actions.addTempTodo(tempTodo));
  
  try {
    const { data } = await axios.post('https://412097daab842550.mokky.dev/all', {
      title: text,
      completed: false,
    });
    return data;
  } catch (error) {
    dispatch(sliceData.actions.removeTempTodo(tempId));
    console.log(error);
  }
});

export const changeData = createAsyncThunk(
  'patch/changeData',
  async (obj: { id: number; completed: boolean }) => {
    const { data } = await axios.patch(`https://412097daab842550.mokky.dev/all/${obj.id}`, {
      completed: obj.completed,
    });
    return data;
  },
);

export const deleteData = createAsyncThunk('delete/deleteData', async (array: TodoItem[]) => {
  const { data } = await axios.patch(`https://412097daab842550.mokky.dev/all`, array);
  return data;
});

const initialState: InitialType = {
  theme: 'light',
  sort: 'all',
  todos: [],
  isLoad: true,
  isError: false,
  tempTodos : [],
};

export const sliceData = createSlice({
  name: 'sliceData',
  initialState,
  reducers: {
    addTempTodo: (state, action) => {
      // @ts-expect-error: Необходимо для временного решения проблемы типизации"
      state.tempTodos && state.tempTodos.unshift(action.payload) ;
    },
    removeTempTodo: (state, action) => {
      state.tempTodos && (state.tempTodos = state.tempTodos.filter((todo) => todo.id !== action.payload));
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setChangeTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Получение
    builder.addCase(getData.pending, (state) => {
      state.todos = [];
      state.isLoad = true;
      state.isError = false;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.isLoad = false;
      state.isError = false;
    });
    builder.addCase(getData.rejected, (state) => {
      state.todos = [];
      state.isLoad = false;
      state.isError = true;
    });
    // Изменение
    builder.addCase(changeData.pending, (state) => {
      state.isLoad = false;
      state.isError = false;
    });
    builder.addCase(changeData.fulfilled, (state) => {
      state.isLoad = false;
      state.isError = false;
    });
    builder.addCase(changeData.rejected, (state) => {
      state.isLoad = false;
      state.isError = true;
    });

    builder.addCase(deleteData.pending, (state) => {
      state.isLoad = true;
      state.isError = false;
    });
    builder.addCase(deleteData.fulfilled, (state) => {
      state.isLoad = false;
      state.isError = false;
    });
    builder.addCase(deleteData.rejected, (state) => {
      state.isLoad = false;
      state.isError = true;
    });
    builder.addCase(postData.fulfilled, (state, action) => {
      // @ts-expect-error: Необходимо для временного решения проблемы типизации"
      // Удаляем временную задачу и добавляем полученную от сервера
      state.tempTodos && (state.tempTodos = state.tempTodos.filter((todo: TodoItem) => todo.id !== action.meta.arg.tempId));
      // @ts-expect-error: Необходимо для временного решения проблемы типизации"
      state.todos && state.todos.unshift(action.payload );
    });
  },
});

export const { setSort,addTempTodo, removeTempTodo, setChangeTheme } = sliceData.actions;
export default sliceData.reducer;
