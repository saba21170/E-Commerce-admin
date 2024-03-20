/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard/Dashboard";
import Product from "./components/Products/productList";
import Category from "./components/Categories/categoriesList";
import UserProfile from "./views/UserProfile"


const dashboardRoutes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    showInSidebar: true

  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
    showInSidebar:false
  },
  
  {
    path: "/category",
    name: "Categories",
    icon: "nc-icon nc-notes",
    component: Category,
    layout: "/admin",
    showInSidebar:true
  },
  {
    path: "/product",
    name: "Products",
    icon: "nc-icon nc-notes",
    component: Product,
    layout: "/admin",
    showInSidebar:true
  },
  
];

export default dashboardRoutes;
