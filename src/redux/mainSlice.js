import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],
  main: [],
  today: [],
  md: {},
};
const api_key = import.meta.env.VITE_API_KEY;

export const getTop140Movies = createAsyncThunk(
  "main/getTop140Movies",
  async () => {
    const allMovies = [];
    for (let i = 2; i <= 98; i++) {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=${i}`
      );
      allMovies.push(...res.data.results);
    }

    return allMovies; // 140 фильм чогултулду
  }
);

export const getFIRST = createAsyncThunk("main/getFIRST", async () => {
  let res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=7`
  );
  return res.data.results;
});

export const getToday = createAsyncThunk("main/getToday", async () => {
  let res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
  );
  return res.data.results;
});


export const mainSlice = createSlice({
  name: "MAIN",
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.main = [];
      state.today = [];
      state.movies = [];
    },
    getMovieDetails(state, action) {
      state.md = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFIRST.fulfilled, (state, action) => {
      state.main = action.payload;
    });
    builder.addCase(getFIRST.rejected, (state, action) => {
      console.error("Fetch error:", action.error);
    });
    builder.addCase(getToday.fulfilled, (state, action) => {
      state.today = action.payload;
    });
    builder.addCase(getTop140Movies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});
export const { clearMovies, getMovieDetails, } = mainSlice.actions;
export default mainSlice.reducer;
