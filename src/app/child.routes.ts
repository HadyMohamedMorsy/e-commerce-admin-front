import { Route } from '@angular/router';
import { addressRoutes } from '@pages/address/address.routes';
import { CartsRoutes } from '@pages/cart/cart.routes';
import { categoriesRoutes } from '@pages/categories/categories.routes';
import { dashboredRoutes } from '@pages/dashbored/dashbored.routes';
import { OrdersRoutes } from '@pages/orders/orders.routes';
import { reviewRoutes } from '@pages/reviews/review.routes';
import { shipmentRoutes } from '@pages/shipments/shipment.routes';

import { customersRoutes } from '@pages/users/customer.routes';

export default [
  ...dashboredRoutes,
  ...customersRoutes,
  ...addressRoutes,
  ...CartsRoutes,
  ...categoriesRoutes,
  ...OrdersRoutes,
  ...shipmentRoutes,
  ...reviewRoutes,
] as Route[];
