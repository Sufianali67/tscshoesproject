
import Billing from "./views/Billing";
import Cart from "./views/Cart";
import Shoes from "./views/categories/Shoes";
import Orders from "./views/Orders";
import PendingUsers from "./views/pendingUsers";
import AllProducts from "./views/products/AllProducts";
import UpdatePassword from "./views/updatePassword";
import UpdateProfile from "./views/updateProfile";
var routes = [
  {
    layout: "/home",
    name: "Shoes",
    path: "/shoes",
    component: Shoes,
    icon: "tim-icons icon-chart-pie-36",
    role: ["user"],
  },
  {
    layout: "/home",
    name: "hidden",
    path: "/checkout-billing",
    component: Billing,
    icon: "tim-icons icon-chart-pie-36",
    role: ["user"],
  },
  {
    layout: "/home",
    name: "hidden",
    path: "/cart",
    component: Cart,
    icon: "tim-icons icon-chart-pie-36",
    role: ["user"],
  },
  {
    layout: "/home",
    name: "Manage Pending Users",
    path: "/pending-users",
    component: PendingUsers,
    icon: "tim-icons icon-chart-pie-36",
    role: ["admin"],
  },
  {
    layout: "/home",
    name: 'hidden',
    path: "/update-password",
    component: UpdatePassword,
    icon: "tim-icons icon-chart-pie-36",
    role: ["admin"],
  },
  {
    layout: "/home",
    name: 'hidden',
    path: "/settings",
    component: UpdateProfile,
    icon: "tim-icons icon-chart-pie-36",
    role: ["admin"],
  },
  {
    layout: "/home",
    name: "Products",
    path: "/products",
    component: AllProducts,
    icon: "tim-icons icon-chart-pie-36",
    role: ["admin"],
  },
  {
    layout: "/home",
    name: "Orders",
    path: "/orders",
    component: Orders,
    icon: "tim-icons icon-chart-pie-36",
    role: ["admin"],
  },
];
export default routes;
