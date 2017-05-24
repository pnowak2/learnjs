import withSidebarLayout from './withSidebarLayout';
import withRouter from './withRouter';

export const pageWithoutLayout = Wrapped => {
  return withRouter(Wrapped);
}

export const pageWithLayout = Wrapped => 
  withSidebarLayout(Wrapped);

export default pageWithLayout;