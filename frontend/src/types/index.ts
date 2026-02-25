export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Sale {
  _id: string;
  product: string;
  category: string;
  amount: number;
  quantity: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  region: string;
}

export interface SalesByCategory {
  _id: string;
  totalAmount: number;
  count: number;
}

export interface MonthlySales {
  month: number;
  totalAmount: number;
  count: number;
}

export interface SalesByRegion {
  _id: string;
  totalAmount: number;
  count: number;
}

export interface TopProduct {
  _id: string;
  totalAmount: number;
  totalQuantity: number;
}

export interface SalesStatus {
  _id: string;
  count: number;
  totalAmount: number;
}

export interface ProductsStats {
  totalProducts: number;
  totalStock: number;
  avgRating: string;
  productsByCategory: Array<{
    _id: string;
    count: number;
    avgPrice: number;
    totalStock: number;
  }>;
}

export interface DashboardSummary {
  totalRevenue: number;
  totalSales: number;
  totalItemsSold: number;
  averageOrderValue: number;
}

export interface FilterOptions {
  startDate?: string;
  endDate?: string;
  category?: string;
  status?: string;
  region?: string;
}
