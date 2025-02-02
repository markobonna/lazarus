// src/lib/defi/analytics.ts

import { ethers } from "ethers";
import { TradeMetrics, PerformanceMetrics, RiskMetrics } from "@/types/defi";

export class DeFiAnalytics {
  private trades: TradeMetrics[] = [];
  private historicalPerformance: Map<number, PerformanceMetrics> = new Map();

  async trackTrade(trade: TradeMetrics): Promise<void> {
    this.trades.push(trade);
    await this.updatePerformanceMetrics();
  }

  async getPerformanceMetrics(
    timeframe?: "day" | "week" | "month"
  ): Promise<PerformanceMetrics> {
    const metrics = await this.calculatePerformanceMetrics(timeframe);
    const riskMetrics = await this.calculateRiskMetrics(timeframe);

    return {
      ...metrics,
      riskMetrics,
    };
  }

  private getTradesForTimeframe(
    timeframe?: "day" | "week" | "month"
  ): TradeMetrics[] {
    if (!timeframe) return this.trades;

    const now = Date.now();
    const timeframes = {
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
    };

    return this.trades.filter(
      (trade) => trade.timestamp >= now - timeframes[timeframe]
    );
  }

  private async calculatePerformanceMetrics(
    timeframe?: "day" | "week" | "month"
  ): Promise<Omit<PerformanceMetrics, "riskMetrics">> {
    const relevantTrades = this.getTradesForTimeframe(timeframe);
    const successfulTrades = relevantTrades.filter((trade) => trade.success);

    const totalValue = relevantTrades.reduce(
      (sum, trade) => sum + trade.profitLoss,
      0
    );
    const gasSpent = relevantTrades.reduce(
      (sum, trade) => sum + trade.gasUsed,
      0
    );
    const avgExecutionTime =
      relevantTrades.reduce((sum, trade) => sum + trade.executionTime, 0) /
        relevantTrades.length || 0;

    return {
      totalValue,
      profitLoss: totalValue,
      successRate: (successfulTrades.length / relevantTrades.length) * 100 || 0,
      gasSpent,
      executionCount: relevantTrades.length,
      avgExecutionTime,
    };
  }

  private async calculateRiskMetrics(
    timeframe?: "day" | "week" | "month"
  ): Promise<RiskMetrics> {
    const relevantTrades = this.getTradesForTimeframe(timeframe);
    const returns = this.calculateReturns(relevantTrades);

    return {
      sharpeRatio: this.calculateSharpeRatio(returns),
      maxDrawdown: this.calculateMaxDrawdown(relevantTrades),
      volatility: this.calculateVolatility(returns),
      successRatio: this.calculateSuccessRatio(relevantTrades),
    };
  }

  private calculateReturns(trades: TradeMetrics[]): number[] {
    return trades.map(
      (trade) => (trade.exitPrice - trade.entryPrice) / trade.entryPrice
    );
  }

  private calculateVolatility(returns: number[]): number {
    if (returns.length === 0) return 0;
    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const squaredDiffs = returns.map((r) => Math.pow(r - mean, 2));
    return Math.sqrt(
      squaredDiffs.reduce((sum, diff) => sum + diff, 0) / returns.length
    );
  }

  private calculateSharpeRatio(returns: number[]): number {
    if (returns.length === 0) return 0;
    const volatility = this.calculateVolatility(returns);
    if (volatility === 0) return 0;

    const riskFreeRate = 0.02; // Assuming 2% risk-free rate
    const meanReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    return (meanReturn - riskFreeRate) / volatility;
  }

  private calculateMaxDrawdown(trades: TradeMetrics[]): number {
    let peak = -Infinity;
    let maxDrawdown = 0;
    let runningTotal = 0;

    trades.forEach((trade) => {
      runningTotal += trade.profitLoss;
      if (runningTotal > peak) {
        peak = runningTotal;
      }
      const drawdown = peak > 0 ? (peak - runningTotal) / peak : 0;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    });

    return maxDrawdown;
  }

  private calculateSuccessRatio(trades: TradeMetrics[]): number {
    if (trades.length === 0) return 0;
    const successful = trades.filter((trade) => trade.success).length;
    return successful / trades.length;
  }

  async generateReport(): Promise<string> {
    const metrics = await this.getPerformanceMetrics();
    const dailyMetrics = await this.getPerformanceMetrics("day");
    const weeklyMetrics = await this.getPerformanceMetrics("week");

    return `
Performance Report
=================
Total Value: $${metrics.totalValue.toFixed(2)}
Daily P/L: $${dailyMetrics.profitLoss.toFixed(2)}
Weekly P/L: $${weeklyMetrics.profitLoss.toFixed(2)}
Success Rate: ${metrics.successRate.toFixed(2)}%
Gas Spent: ${ethers.utils.formatEther(metrics.gasSpent)} ETH
`;
  }
}
