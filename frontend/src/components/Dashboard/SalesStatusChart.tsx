import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { SalesStatus } from '../../types';

interface SalesStatusChartProps {
  data: SalesStatus[] | null;
  loading: boolean;
}

const COLORS = {
  completed: '#4CAF50',
  pending: '#FF9800',
  cancelled: '#F44336'
};

const SalesStatusChart: React.FC<SalesStatusChartProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sales Status Distribution
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
            Sales Status Distribution
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <Typography color="textSecondary">No data available</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map(item => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    value: item.count,
    amount: item.totalAmount
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ backgroundColor: 'white', p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
          <Typography variant="body2">
            <strong>{payload[0].name}</strong>
          </Typography>
          <Typography variant="body2">
            Orders: {payload[0].value}
          </Typography>
          <Typography variant="body2">
            Amount: ${payload[0].payload.amount.toLocaleString()}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const getFillColor = (name: string) => {
    const key = name.toLowerCase() as keyof typeof COLORS;
    return COLORS[key] || '#8884d8';
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Sales Status Distribution
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getFillColor(entry.name)} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesStatusChart;
