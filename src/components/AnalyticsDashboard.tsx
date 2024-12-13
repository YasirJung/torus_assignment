import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/index.ts";
import { setAnalyticsData, setLoading, setError } from "../store/slices/analyticsSlice.ts";
import { fetchAnalyticsData } from "../services/api.ts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { DateRange, AnalyticsFilters } from "../types/index.ts";

const AnalyticsDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    totalUsers,
    activeUsers,
    deletedUsers,
    userRegistrationTrend,
    activeVsInactiveUsers,
    usersByRegion,
    loading,
    error,
  } = useSelector((state: RootState) => state.analytics);

  const [filters, setFilters] = useState<AnalyticsFilters>({
    dateRange: { startDate: "", endDate: "" },
    region: "",
  });

  const [filteredData, setFilteredData] = useState({
    totalUsers,
    activeUsers,
    deletedUsers,
    activeVsInactiveUsers,
    usersByRegion,
    userRegistrationTrend,
  });

  useEffect(() => {
    const loadAnalyticsData = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchAnalyticsData();
        dispatch(setAnalyticsData(data));
        setFilteredData(data); // Set initial filtered data
      } catch (err) {
        dispatch(setError((err as Error).message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadAnalyticsData();
  }, [dispatch]);

  const applyFilters = () => {
    const { region, dateRange } = filters;

    let filteredRegistrationTrend = userRegistrationTrend;
    let filteredUsersByRegion = usersByRegion;
    let filteredActiveInactive = activeVsInactiveUsers;
    let filteredActiveUsers = activeUsers;

    // Filter by region
    if (region) {
      const regionData = usersByRegion.find((r) => r.region === region);
      filteredActiveInactive = regionData
        ? [
            { status: "Active", count: Math.floor((regionData.count * activeUsers) / totalUsers) },
            { status: "Inactive", count: regionData.count - Math.floor((regionData.count * activeUsers) / totalUsers) },
          ]
        : [
            { status: "Active", count: 0 },
            { status: "Inactive", count: 0 },
          ];
      filteredUsersByRegion = [regionData].filter((r) => r !== undefined);
      filteredActiveUsers = filteredActiveInactive[0].count;

      // User Registration Trend filtered only by date
      filteredRegistrationTrend = userRegistrationTrend.filter((data) =>
        filteredUsersByRegion.some((r) => r.region === region)
      );
    }

    // Filter by date range
    if (dateRange.startDate && dateRange.endDate) {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      filteredRegistrationTrend = filteredRegistrationTrend.filter((data) => {
        const date = new Date(data.date);
        return date >= startDate && date <= endDate;
      });
    }

    // Update filtered data state
    setFilteredData({
      totalUsers: region
        ? filteredUsersByRegion.reduce((sum, r) => sum + r.count, 0)
        : totalUsers,
      activeUsers: filteredActiveUsers,
      deletedUsers: deletedUsers, // You can implement logic for region-specific deleted users if needed
      activeVsInactiveUsers: filteredActiveInactive,
      usersByRegion: filteredUsersByRegion,
      userRegistrationTrend: filteredRegistrationTrend,
    });
  };

  const handleDateRangeChange = (field: "startDate" | "endDate", value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      dateRange: { ...prevFilters.dateRange, [field]: value },
    }));
  };

  const handleRegionChange = (region: string) => {
    setFilters({ ...filters, region });
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

  // Group filtered user registration data by year
  const registrationByYear = filteredData.userRegistrationTrend.reduce((acc: any, current: any) => {
    const year = current.date.split("-")[0]; // Extract year from date
    acc[year] = (acc[year] || 0) + current.count; // Sum counts per year
    return acc;
  }, {});

  // Convert the grouped data into an array for the chart
  const yearlyRegistrationData = Object.keys(registrationByYear).map((year) => ({
    year,
    count: registrationByYear[year],
  }));

  if (loading) return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;

  if (error) return <div className="text-center text-red-500 text-xl mt-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Analytics Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-4xl font-bold">{filteredData.totalUsers}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Active Users</h2>
          <p className="text-4xl font-bold">{filteredData.activeUsers}</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Deleted Users</h2>
          <p className="text-4xl font-bold">{filteredData.deletedUsers}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Filters</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={filters.dateRange.startDate}
              onChange={(e) => handleDateRangeChange("startDate", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="date"
              value={filters.dateRange.endDate}
              onChange={(e) => handleDateRangeChange("endDate", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Region</label>
            <select
              value={filters.region}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">All Regions</option>
              {usersByRegion.map((region) => (
                <option key={region.region} value={region.region}>
                  {region.region}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 flex items-end">
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      {/* User Registration Trend */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Registration Trend (By Year)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yearlyRegistrationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => `${value}`} ticks={[0, 5, 10, 15, 20]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" dot />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Active vs Inactive Users and Users by Region */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Active vs Inactive Users</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={filteredData.activeVsInactiveUsers}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="status"
              >
                {filteredData.activeVsInactiveUsers.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend formatter={(value) => (value === "Active" ? "Active" : "Inactive")} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Users by Region</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData.usersByRegion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
