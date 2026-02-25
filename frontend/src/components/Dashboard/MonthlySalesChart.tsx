import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthlySales } from '../../types';

interface MonthlySalesChartProps {
  data: MonthlySales[] | null;
  loading: boolean;
}

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const MonthlySalesChart: React.FC<MonthlySalesChartProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Monthly Sales Trend
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Monthly Sales Trend
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <Typography color="textSecondary">No data available</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map(item => ({
    month: monthNames[item.month - 1],
    revenue: item.totalAmount,
    orders: item.count
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ backgroundColor: 'white', p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
          <Typography variant="body2">
            <strong>{label}</strong>
          </Typography>
          <Typography variant="body2" color="#8884d8">
            Revenue: ${payload[0].value.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="#82ca9d">
            Orders: {payload[1].value}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Monthly Sales Trend
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              strokeWidth={2}
              name="Revenue ($)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Orders"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlySalesChart;
