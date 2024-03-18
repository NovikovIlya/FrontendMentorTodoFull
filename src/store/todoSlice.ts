import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialType, TodoItem } from '../types/types';

export const getData = createAsyncThunk('get/getData', async () => {
  const { data } = await axios.get('https://412097daab842550.mokky.dev/all');
  return data.reverse();
});

export const postData = createAsyncThunk('post/postData', async (text: string) => {
  const { data } = await axios.post('https://412097daab842550.mokky.dev/all', {
    title: text,
    completed: false,
  });
  return data;
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
  sort: 'all',
  todos: [],
  isLoad: true,
  isError: false,
};

export const sliceData = createSlice({
  name: 'sliceData',
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
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
      state.isLoad = true;
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
  },
});

export const { setSort } = sliceData.actions;
export default sliceData.reducer;
