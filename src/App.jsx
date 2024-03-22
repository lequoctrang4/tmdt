import React from "react";
import {
  Navigate,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import Carts from "./pages/Cart/Carts";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import LoginTemplate from "./templates/LoginTemplate";
import { createBrowserHistory } from "history";
import { getAllProductAPI } from "./redux/reducers/ProductReducer/productReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Order from "./pages/Order/Order";
import ProductList from "./pages/ProductList/ProductList";
import Term from "./pages/Term/Term";
import Rent from "./pages/Rent/Rent";
export const history = createBrowserHistory();

const App = () => {
  const dispatch = useDispatch();

  const getAllProduct = () => {
    const actionProduct = getAllProductAPI();
    dispatch(actionProduct);
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="term" element={<Term />} />
          <Route path="rent" element={<Rent />} />
          <Route path="list" element={<ProductList />} />
          <Route path="detail">
            <Route path=":id" element={<Detail />} />
          </Route>
          <Route path="carts" element={<Carts />} />
          <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} />
          <Route path="order" element={<Order />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="users" element={<LoginTemplate />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
};

export default App;
