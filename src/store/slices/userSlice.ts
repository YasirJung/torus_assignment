import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../../types';

const initialState: UserState = {
  users: [],
  totalUsers: 0,
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 5,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.totalUsers = action.payload.length;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      state.totalUsers -= 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setUsers, setLoading, setError, deleteUser, setCurrentPage } = userSlice.actions;
export default userSlice.reducer;

