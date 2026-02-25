import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SalesByRegion } from '../../types';

interface SalesByRegionChartProps {
  data: SalesByRegion[] | null;
  loading: boolean;
}

const SalesByRegionChart: React.FC<SalesByRegionChartProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sales by Region
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
            Sales by Region
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <Typography color="textSecondary">No data available</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map(item => ({
    region: item._id,
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
          Sales by Region
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
            <Bar yAxisId="right" dataKey="orders" fill="#82ca9d" name="Orders" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesByRegionChart;
