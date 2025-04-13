import { Route } from '@angular/router';
import { dashboredRoutes } from '@pages/dashbored/dashbored.routes';
import { invoiceRoutes } from '@pages/invoices/invoice.routes';
import { packagesRoutes } from '@pages/packages/packages.routes';
import { paymentRoutes } from '@pages/payments/payments.routes';
import { requestsRoutes } from '@pages/requests/requests.routes';
import { servicesRoutes } from '@pages/services/services.routes';
import { subscriptionRoutes } from '@pages/subscriptions/subscription.routes';
import { customersRoutes } from '@pages/users/customer.routes';
import { userRoutes } from '@pages/users/user.routes';

export default [
  ...dashboredRoutes,
  ...customersRoutes,
  ...invoiceRoutes,
  ...subscriptionRoutes,
  ...userRoutes,
  ...servicesRoutes,
  ...packagesRoutes,
  ...paymentRoutes,
  ...requestsRoutes,
] as Route[];
