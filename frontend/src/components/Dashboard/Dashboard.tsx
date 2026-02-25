import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  Snackbar
} from '@mui/material';
import { analyticsAPI } from '../../services/api';
import {
  DashboardSummary,
  SalesByCategory,
  MonthlySales,
  SalesByRegion,
  TopProduct,
  SalesStatus,
  FilterOptions
} from '../../types';

import SummaryCards from './SummaryCards';
import SalesByCategoryChart from './SalesByCategoryChart';
import MonthlySalesChart from './MonthlySalesChart';
import SalesByRegionChart from './SalesByRegionChart';
import TopProductsChart from './TopProductsChart';
import SalesStatusChart from './SalesStatusChart';
import FilterPanel from './FilterPanel';

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [salesByCategory, setSalesByCategory] = useState<SalesByCategory[] | null>(null);
  const [monthlySales, setMonthlySales] = useState<MonthlySales[] | null>(null);
  const [salesByRegion, setSalesByRegion] = useState<SalesByRegion[] | null>(null);
  const [topProducts, setTopProducts] = useState<TopProduct[] | null>(null);
  const [salesStatus, setSalesStatus] = useState<SalesStatus[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});

  const fetchDashboardData = async (currentFilters: FilterOptions) => {
    try {
      setLoading(true);
      setError(null);

      const [
        summaryResponse,
        categoryResponse,
        monthlyResponse,
        regionResponse,
        topProductsResponse,
        statusResponse
      ] = await Promise.all([
        analyticsAPI.getSummary(currentFilters),
        analyticsAPI.getSalesByCategory(currentFilters),
        analyticsAPI.getMonthlySales(currentFilters),
        analyticsAPI.getSalesByRegion(currentFilters),
        analyticsAPI.getTopProducts({ limit: 10 }),
        analyticsAPI.getSalesStatus(currentFilters)
      ]);

      setSummary(summaryResponse.data);
      setSalesByCategory(categoryResponse.data);
      setMonthlySales(monthlyResponse.data);
      setSalesByRegion(regionResponse.data);
      setTopProducts(topProductsResponse.data);
      setSalesStatus(statusResponse.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(filters);
  }, [filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Analytics Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Monitor your sales performance and business metrics
        </Typography>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>

        <Box sx={{ mb: 4 }}>
          <FilterPanel onFilterChange={handleFilterChange} loading={loading} />
        </Box>

        <Box sx={{ mb: 4 }}>
          <SummaryCards summary={summary} loading={loading} />
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <SalesByCategoryChart data={salesByCategory} loading={loading} />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <SalesStatusChart data={salesStatus} loading={loading} />
          </Grid>
          <Grid size={12}>
            <MonthlySalesChart data={monthlySales} loading={loading} />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <SalesByRegionChart data={salesByRegion} loading={loading} />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TopProductsChart data={topProducts} loading={loading} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
