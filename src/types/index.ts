// User related types
export interface User {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'inactive';
    region: string;
    registrationDate: string;
  }
  
  export interface UserState {
    users: User[];
    totalUsers: number;
    loading: boolean;
    error: string | null;
    currentPage: number;
    itemsPerPage: number;
  }
  
  // Analytics related types
  export interface AnalyticsState {
    totalUsers: number;
    activeUsers: number;
    deletedUsers: number;
    userRegistrationTrend: { date: string; count: number }[];
    activeVsInactiveUsers: { status: string; count: number }[];
    usersByRegion: { region: string; count: number }[];
    loading: boolean;
    error: string | null;
  }
  
  export interface RootState {
    users: UserState;
    analytics: AnalyticsState;
  }
  
  // Filter types
  export interface DateRange {
    startDate: string;
    endDate: string;
  }
  
  export interface AnalyticsFilters {
    dateRange: DateRange;
    region: string;
  }
  
  