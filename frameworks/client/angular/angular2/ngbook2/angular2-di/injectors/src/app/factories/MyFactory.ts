import { ViewPortService } from '../services/ViewPortService';

export const myFactory = (viewport: ViewPortService) => {
  return viewport.determineService();
}