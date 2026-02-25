import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { FilterOptions } from '../../types';

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
  loading: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, loading }) => {
  const [filters, setFilters] = useState<FilterOptions>({});

  const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Home & Garden', 'Sports'];
  const statuses = ['completed', 'pending', 'cancelled'];
  const regions = ['North', 'South', 'East', 'West', 'Central'];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateChange = (key: 'startDate' | 'endDate', date: Dayjs | null) => {
    const value = date ? date.toISOString() : undefined;
    handleFilterChange(key, value);
  };

  const clearFilters = () => {
    const emptyFilters = {};
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <DatePicker
                label="Start Date"
                value={filters.startDate ? dayjs(filters.startDate) : null}
                onChange={(date) => handleDateChange('startDate', date)}
                disabled={loading}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <DatePicker
                label="End Date"
                value={filters.endDate ? dayjs(filters.endDate) : null}
                onChange={(date) => handleDateChange('endDate', date)}
                disabled={loading}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth disabled={loading}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category || ''}
                  onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                >
                  <MenuItem value="">All</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth disabled={loading}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || ''}
                  onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
                >
                  <MenuItem value="">All</MenuItem>
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth disabled={loading}>
                <InputLabel>Region</InputLabel>
                <Select
                  value={filters.region || ''}
                  onChange={(e) => handleFilterChange('region', e.target.value || undefined)}
                >
                  <MenuItem value="">All</MenuItem>
                  {regions.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  onClick={clearFilters}
                  disabled={loading}
                >
                  Clear Filters
                </Button>
              </Box>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
