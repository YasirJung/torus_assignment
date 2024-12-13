import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnalyticsState } from '../../types';

const initialState: AnalyticsState = {
  totalUsers: 0,
  activeUsers: 0,
  deletedUsers: 0,
  userRegistrationTrend: [],
  activeVsInactiveUsers: [],
  usersByRegion: [],
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setAnalyticsData: (state, action: PayloadAction<Partial<AnalyticsState>>) => {
      return { ...state, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    incrementDeletedUsers: (state) => {
      state.deletedUsers += 1;
    },
  },
});

export const { setAnalyticsData, setLoading, setError, incrementDeletedUsers } = analyticsSlice.actions;
export default analyticsSlice.reducer;

