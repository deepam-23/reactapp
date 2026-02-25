# Frontend - Analytics Dashboard

React TypeScript frontend for the Data Analytics Dashboard application.

## 🚀 Features

- Interactive dashboard with 5+ chart types
- Real-time data filtering
- JWT authentication
- Responsive Material-UI design
- Loading states and error handling
- Modern React hooks and TypeScript

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx              # Main dashboard component
│   │   │   ├── SummaryCards.tsx           # Summary statistics cards
│   │   │   ├── SalesByCategoryChart.tsx   # Pie chart component
│   │   │   ├── MonthlySalesChart.tsx      # Line chart component
│   │   │   ├── SalesByRegionChart.tsx     # Bar chart component
│   │   │   ├── TopProductsChart.tsx       # Horizontal bar chart
│   │   │   ├── SalesStatusChart.tsx       # Doughnut chart
│   │   │   └── FilterPanel.tsx            # Filtering controls
│   │   └── Auth/
│   │       └── Login.tsx                  # Login component
│   ├── services/
│   │   └── api.ts                         # API service layer
│   ├── types/
│   │   └── index.ts                       # TypeScript definitions
│   └── App.tsx                            # Main App component
├── package.json
├── .env                                   # Environment variables
└── .gitignore
```

## 🛠 Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🎨 Components

### Dashboard Components

1. **SummaryCards**: Displays key metrics (Revenue, Sales, Items, Avg Order)
2. **SalesByCategoryChart**: Pie chart showing revenue by category
3. **MonthlySalesChart**: Line chart for monthly trends
4. **SalesByRegionChart**: Bar chart comparing regional performance
5. **TopProductsChart**: Horizontal bar chart of top products
6. **SalesStatusChart**: Doughnut chart for order status distribution
7. **FilterPanel**: Date range and category/status/region filters

### Authentication

- **Login**: JWT-based authentication with form validation
- **Protected Routes**: Dashboard requires authentication
- **Token Management**: Automatic token inclusion in API requests

## 📊 Chart Library

Uses **Recharts** for data visualization:
- Pie charts for category distribution
- Line charts for trends over time
- Bar charts for comparisons
- Doughnut charts for status distribution
- Horizontal bar charts for rankings

## 🎯 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Filtering**: Instant chart updates based on filters
- **Loading States**: Proper loading indicators for all data
- **Error Handling**: User-friendly error messages
- **TypeScript**: Full type safety throughout the application
- **Material-UI**: Modern, accessible UI components

## 🔧 Environment Variables

- `REACT_APP_API_URL`: Backend API endpoint URL

## 📱 Responsive Breakpoints

- **xs**: 0px - 599px (Mobile)
- **sm**: 600px - 959px (Tablet)
- **md**: 960px - 1279px (Small Desktop)
- **lg**: 1280px - 1919px (Desktop)
- **xl**: 1920px+ (Large Desktop)
