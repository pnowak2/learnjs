import { Metric } from './metric.interface';
import { Analytics } from './analytics.interface';

export class AnalyticsService {
  constructor(private implementation: Analytics) {

  }
  recordEvent(metric: Metric): void {
    this.implementation.recordEvent(metric);
  }
}
