import { Route } from '@angular/router';
import { addressRoutes } from '@pages/address/address.routes';
import { AnswerRoutes } from '@pages/answer/answer.routes';
import { bankRoutes } from '@pages/banks/bank.routes';
import { blogRoutes } from '@pages/blogs/blog.routes';
import { BooksRoutes } from '@pages/books/books.routes';
import { CartsRoutes } from '@pages/cart/cart.routes';
import { CategoriesRoutes } from '@pages/categories/categories.routes';
import { contactRoutes } from '@pages/contact/contact.routes';
import { couponRoutes } from '@pages/coupons/coupon.routes';
import { customOrdersRoutes } from '@pages/custom-orders/custom-orders.routes';
import { dashboredRoutes } from '@pages/dashbored/dashbored.routes';
import { FaqRoutes } from '@pages/faq/faq.routes';
import { generalSettingsRoutes } from '@pages/general-settings/general-settings.routes';
import { locationRoutes } from '@pages/locations/location.routes';
import { OrdersRoutes } from '@pages/orders/orders.routes';
import { PaymentMethodsRoutes } from '@pages/payment-methods/payment-methods.routes';
import { ProductsRoutes } from '@pages/products/product.routes';
import { QuizRoutes } from '@pages/quiz/quiz.routes';
import { reviewRoutes } from '@pages/reviews/review.routes';
import { shapeCategoriesRoutes } from '@pages/shape-categories/shape-categories.routes';
import { shapesRoutes } from '@pages/shapes/shapes.routes';
import { shipmentRoutes } from '@pages/shipments/shipment.routes';

import { CustomersRoutes } from '@pages/users/customer.routes';
import { userRoutes } from '@pages/users/user.routes';
import { WishlistRoutes } from '@pages/wishlists/wishlist.routes';

export default [
  ...dashboredRoutes,
  ...CustomersRoutes,
  ...contactRoutes,
  ...WishlistRoutes,
  ...ProductsRoutes,
  ...couponRoutes,
  ...shapesRoutes,
  ...shapeCategoriesRoutes,
  ...customOrdersRoutes,
  ...blogRoutes,
  ...FaqRoutes,
  ...PaymentMethodsRoutes,
  ...BooksRoutes,
  ...QuizRoutes,
  ...AnswerRoutes,
  ...generalSettingsRoutes,
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
