import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const IDLE = 'idle';
export const LOADING = 'loading';

export const loadBooks = createAsyncThunk(
  'books/list',
  async (payload, thunkAPI) => {

    try {
      const response = await axios.get(`http://localhost:8000/api/books/book`,{params:payload});

      console.log(response, response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  },
);


const internalInitialState = {
  books: [],
  book: null,
  error: null,
  loading: IDLE, // false ,not busy
};

export const bookSlice = createSlice({
  name: 'book',
  initialState: internalInitialState,
  reducers: {
  
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // loadbooks
    builder.addCase(loadBooks.pending, (state) => ({
      ...state,
      loading: LOADING,
    }));
    builder.addCase(loadBooks.rejected, (state, action) => ({
      ...state,
      loading: IDLE,
      error: action.payload.error,
    }));
    builder.addCase(loadBooks.fulfilled, (state, action) => {
      state.loading = IDLE;
      //total data => action.payload.data
      //up => {...respose.data } or response.data => action.payload
      state.books = action.payload.results;
      
      return state;
    });

  },
});

export const { reset,} = bookSlice.actions;