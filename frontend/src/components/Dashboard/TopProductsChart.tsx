import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TopProduct } from '../../types';

interface TopProductsChartProps {
  data: TopProduct[] | null;
  loading: boolean;
}

const TopProductsChart: React.FC<TopProductsChartProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Top Products by Revenue
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
            Top Products by Revenue
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <Typography color="textSecondary">No data available</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map(item => ({
    name: item._id.length > 15 ? item._id.substring(0, 15) + '...' : item._id,
    fullName: item._id,
    revenue: item.totalAmount,
    quantity: item.totalQuantity
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ backgroundColor: 'white', p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
          <Typography variant="body2">
            <strong>{payload[0].payload.fullName}</strong>
          </Typography>
          <Typography variant="body2" color="#8884d8">
            Revenue: ${payload[0].value.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="#82ca9d">
            Quantity: {payload[0].payload.quantity}
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
          Top Products by Revenue
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TopProductsChart;
