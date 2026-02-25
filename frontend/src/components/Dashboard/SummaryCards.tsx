import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  AttachMoney,
  Receipt
} from '@mui/icons-material';
import { DashboardSummary } from '../../types';

interface SummaryCardsProps {
  summary: DashboardSummary | null;
  loading: boolean;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary, loading }) => {
  const cards = [
    {
      title: 'Total Revenue',
      value: summary ? `$${summary.totalRevenue.toLocaleString()}` : '$0',
      icon: <AttachMoney />,
      color: '#4CAF50'
    },
    {
      title: 'Total Sales',
      value: summary ? summary.totalSales.toLocaleString() : '0',
      icon: <ShoppingCart />,
      color: '#2196F3'
    },
    {
      title: 'Items Sold',
      value: summary ? summary.totalItemsSold.toLocaleString() : '0',
      icon: <Receipt />,
      color: '#FF9800'
    },
    {
      title: 'Avg Order Value',
      value: summary ? `$${summary.averageOrderValue}` : '$0',
      icon: <TrendingUp />,
      color: '#9C27B0'
    }
  ];

  if (loading) {
    return (
      <Grid container spacing={3}>
        {cards.map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Box sx={{ mr: 2 }}>
                    <div style={{ width: 40, height: 40, backgroundColor: '#f0f0f0', borderRadius: '50%' }} />
                  </Box>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      Loading...
                    </Typography>
                    <Typography variant="h6">
                      --
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    mr: 2,
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: card.color,
                    color: 'white'
                  }}
                >
                  {card.icon}
                </Box>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="overline">
                    {card.title}
                  </Typography>
                  <Typography variant="h6">
                    {card.value}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;
