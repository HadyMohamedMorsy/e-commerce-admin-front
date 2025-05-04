import { Route } from '@angular/router';
import { addressRoutes } from '@pages/address/address.routes';
import { bankRoutes } from '@pages/banks/bank.routes';
import { CartsRoutes } from '@pages/cart/cart.routes';
import { CategoriesRoutes } from '@pages/categories/categories.routes';
import { contactRoutes } from '@pages/contact/contact.routes';
import { dashboredRoutes } from '@pages/dashbored/dashbored.routes';
import { FaqRoutes } from '@pages/faq/faq.routes';
import { locationRoutes } from '@pages/locations/location.routes';
import { OrdersRoutes } from '@pages/orders/orders.routes';
import { reviewRoutes } from '@pages/reviews/review.routes';
import { shipmentRoutes } from '@pages/shipments/shipment.routes';
import { taxRoutes } from '@pages/taxes/tax.routes';

import { CustomersRoutes } from '@pages/users/customer.routes';
import { userRoutes } from '@pages/users/user.routes';
import { WishlistRoutes } from '@pages/wishlists/wishlist.routes';

export default [
  ...dashboredRoutes,
  ...CustomersRoutes,
  ...contactRoutes,
  ...WishlistRoutes,
  ...FaqRoutes,
  ...taxRoutes,
  ...userRoutes,
  ...addressRoutes,
  ...locationRoutes,
  ...bankRoutes,
  ...CartsRoutes,
  ...CategoriesRoutes,
  ...OrdersRoutes,
  ...shipmentRoutes,
  ...reviewRoutes,
] as Route[];
