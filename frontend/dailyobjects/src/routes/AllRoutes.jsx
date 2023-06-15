import { Route, Routes } from "react-router-dom";
import AdminPrivateRoute from "../admin/component/AdminPrivateRoute";
import AddProduct from "../admin/pages/AddProduct";
import AdminLogin from "../admin/pages/AdminLogin";
import AdminSignup from "../admin/pages/AdminSignup";
import Dashboard from "../admin/pages/Dashboard";
import EditProduct from "../admin/pages/EditProduct";
import Product from "../admin/pages/Product";
import NotFoundImage from "../components/404/404";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/login";
import AllProducts from "../pages/Product/AllProducts";
import Search from "../pages/Search/Search";
import Signup from "../pages/Signup/Signup";
import Wishlist from "../pages/Wishlists/Wishlist";
import ProductDetails from "../pages/Productdetails";


export const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/products/:id" element={<AllProducts />} />
			<Route path="/login" element={<Login />} />
			<Route path="/Signup" element={<Signup />} />
			<Route path="/productdetails/:id" element={<ProductDetails />} />
			<Route
				path="/admin"
				element={
					<AdminPrivateRoute>
						<Dashboard />
					</AdminPrivateRoute>
				}
			/>
			<Route path="/admin/signup" element={<AdminSignup />} />
			<Route
				path="/admin/product"
				element={
					<AdminPrivateRoute>
						<Product />
					</AdminPrivateRoute>
				}
			/>
			<Route path="/admin/login" element={<AdminLogin />} />

			<Route
				path="/admin/product/add"
				element={
					<AdminPrivateRoute>
						<AddProduct />
					</AdminPrivateRoute>
				}
			/>

			<Route
				path="/admin/product/edit/:id"
				element={
					<AdminPrivateRoute>
						<EditProduct />
					</AdminPrivateRoute>
				}
			/>

			<Route path="/search" element={<Search />} />

			<Route path="/wishlist" element={<Wishlist />} />
			<Route path="/cart" element={<Cart />}></Route>
			<Route path="/checkout" element={<Checkout />}></Route>
			<Route path="*" element={<NotFoundImage />} />
		</Routes>
	);
};
