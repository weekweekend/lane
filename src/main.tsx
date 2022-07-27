import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from 'layouts/index';
import Page404 from 'pages/404';
import HomePage from 'pages/HomePage';
import SignIn from 'pages/SignIn';
import Mine from 'pages/Mine';
import ChangePassword from 'pages/SignIn/ChangePassword';
import Shop from 'pages/Shop';
import ShoppingCar from 'pages/ShoppingCar';
import Address from 'pages/Address';
import Search from 'pages/Search';
import AddressEdit from 'pages/Address/AddressEdit';
import SearchResult from 'pages/Search/SearchResult';
import Settlement from 'pages/Shop/Settlement';
import NicknameEdit from 'pages/Mine/NicknameEdit';
import Intro from 'pages/Mine/Intro';
import Order from 'pages/Order';
import AddEvaluation from 'pages/Order/AddEvaluation';
import OrderDetails from 'pages/Order/OrderDetails';

const root = createRoot(document.getElementById('app')!);

root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="order" element={<Order />} />
        <Route path="mine" element={<Mine />} />
      </Route>
      <Route path="mine/nicknameEdit" element={<NicknameEdit />} />
      <Route path="mine/intro" element={<Intro />} />
      <Route path="order/addEvaluation" element={<AddEvaluation />} />
      <Route path="order/orderDetails" element={<OrderDetails />} />
      <Route path="shop" element={<Shop />}></Route>
      <Route path="shop/settlement" element={<Settlement />}></Route>

      <Route path="signIn" element={<SignIn />} />
      <Route path="signIn/changePassword" element={<ChangePassword />} />
      <Route path="shoppingCar" element={<ShoppingCar />}></Route>
      <Route path="address" element={<Address />}></Route>
      <Route path="address/edit" element={<AddressEdit />}></Route>
      <Route path="search" element={<Search />}></Route>
      <Route path="search/searchResult" element={<SearchResult />}></Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  </HashRouter>,
);
