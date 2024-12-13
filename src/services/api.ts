import { User } from '../types';

const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', region: 'North America', registrationDate: '2020-01-15' },
    { id: 2, name: 'Grace Lee', email: 'grace@example.com', status: 'inactive', region: 'North America', registrationDate: '2023-03-12' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', region: 'Europe', registrationDate: '2021-02-20' },
    { id: 4, name: 'Oliver Young', email: 'oliver@example.com', status: 'active', region: 'Europe', registrationDate: '2022-04-10' },
    { id: 5, name: 'Rajesh Kumar', email: 'rajesh@example.com', status: 'active', region: 'Asia', registrationDate: '2019-05-18' },
    { id: 6, name: 'Priya Sharma', email: 'priya@example.com', status: 'inactive', region: 'Asia', registrationDate: '2024-06-02' },
    { id: 7, name: 'Aarav Patel', email: 'aarav@example.com', status: 'active', region: 'Asia', registrationDate: '2021-06-15' },
    { id: 8, name: 'Neha Gupta', email: 'neha@example.com', status: 'inactive', region: 'Asia', registrationDate: '2021-07-05' },
    { id: 9, name: 'Li Wei', email: 'liwei@example.com', status: 'active', region: 'Asia', registrationDate: '2020-07-20' },
    { id: 10, name: 'Zhang Min', email: 'zhangmin@example.com', status: 'inactive', region: 'Asia', registrationDate: '2018-08-10' },
    { id: 11, name: 'Wang Fang', email: 'wangfang@example.com', status: 'active', region: 'Asia', registrationDate: '2024-09-08' },
    { id: 12, name: 'Carlos Gonzalez', email: 'carlos@example.com', status: 'active', region: 'South America', registrationDate: '2024-10-12' },
    { id: 13, name: 'Sofia Martinez', email: 'sofia@example.com', status: 'inactive', region: 'South America', registrationDate: '2022-11-05' },
    { id: 14, name: 'Adeola Okafor', email: 'adeola@example.com', status: 'active', region: 'Africa', registrationDate: '2021-01-20' },
    { id: 15, name: 'Thandiwe Ndlovu', email: 'thandiwe@example.com', status: 'inactive', region: 'Africa', registrationDate: '2020-02-18' },
    { id: 16, name: 'Liam Cooper', email: 'liam@example.com', status: 'active', region: 'Oceania', registrationDate: '2023-03-25' },
    { id: 17, name: 'Amelia Brown', email: 'amelia@example.com', status: 'inactive', region: 'Oceania', registrationDate: '2024-04-22' },
    { id: 18, name: 'Ahmed Al-Farsi', email: 'ahmed@example.com', status: 'active', region: 'Middle East', registrationDate: '2021-05-15' },
    { id: 19, name: 'Fatima Khalid', email: 'fatima@example.com', status: 'inactive', region: 'Middle East', registrationDate: '2022-06-10' },
    { id: 20, name: 'Hiroshi Tanaka', email: 'hiroshi@example.com', status: 'active', region: 'Asia', registrationDate: '2020-07-25' },
    { id: 21, name: 'Yuki Nakamura', email: 'yuki@example.com', status: 'inactive', region: 'Asia', registrationDate: '2019-08-15' },
    { id: 22, name: 'Emma Davies', email: 'emma@example.com', status: 'active', region: 'Europe', registrationDate: '2020-09-01' },
    { id: 23, name: 'Lucas Martin', email: 'lucas@example.com', status: 'inactive', region: 'Europe', registrationDate: '2021-10-20' },
    { id: 24, name: 'Mia Johnson', email: 'mia@example.com', status: 'active', region: 'North America', registrationDate: '2022-11-15' },
    { id: 25, name: 'Ethan Wilson', email: 'ethan@example.com', status: 'inactive', region: 'North America', registrationDate: '2023-12-01' },
];

export const fetchUsers = async (): Promise<User[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockUsers;
};

export const fetchAnalyticsData = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Calculate the required data from mockUsers
    const totalUsers = mockUsers.length;
    const activeUsers = mockUsers.filter(user => user.status === 'active').length;
    const inactiveUsers = mockUsers.filter(user => user.status === 'inactive').length;
    const usersByRegion = Array.from(
      mockUsers.reduce((map, user) => {
        map.set(user.region, (map.get(user.region) || 0) + 1);
        return map;
      }, new Map<string, number>())
    ).map(([region, count]) => ({ region, count }));
  
    const userRegistrationTrend = mockUsers.reduce((trend, user) => {
      const yearMonth = user.registrationDate.slice(0, 7); // Extract year-month (YYYY-MM)
      const existing = trend.find(entry => entry.date === yearMonth);
      if (existing) {
        existing.count += 1;
      } else {
        trend.push({ date: yearMonth, count: 1 });
      }
      return trend;
    }, [] as { date: string; count: number }[]).sort((a, b) => a.date.localeCompare(b.date));
  
    return {
      totalUsers,
      activeUsers,
      deletedUsers: 0, // Track this dynamically in your app
      userRegistrationTrend,
      activeVsInactiveUsers: [
        { status: 'Active', count: activeUsers },
        { status: 'Inactive', count: inactiveUsers },
      ],
      usersByRegion,
    };
};
  

