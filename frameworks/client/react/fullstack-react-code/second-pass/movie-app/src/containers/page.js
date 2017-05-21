import withSidebarLayout from './withSidebarLayout';

export const pageWithLayout = Wrapped => 
  withSidebarLayout(Wrapped);

export default pageWithLayout;