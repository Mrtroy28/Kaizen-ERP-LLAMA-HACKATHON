export interface Quote {
  id: string;
  clientName: string;
  service: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected';
  aiRecommendation: string;
  createdAt: string;
}

export interface SalesMetrics {
  totalSales: number;
  conversionRate: number;
  averageQuoteValue: number;
  monthlyTrend: Array<{
    month: string;
    sales: number;
  }>;
}