import { Metric } from './metric.interface';

export interface Analytics {
  recordEvent(metric: Metric): void;
}
