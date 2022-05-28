import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Layout from 'layouts/index';
import Welcome from 'pages/Welcome';
import List from 'pages/List';
import Item from 'pages/Item';
import Page404 from 'pages/404';
import HomePage from 'pages/HomePage';
import SignIn from 'pages/SignIn';
import Mine from 'pages/Mine';
import Order from 'pages/Order';
import ChangePassword from 'pages/SignIn/ChangePassword';
import Shop from 'pages/Shop';
import Recommended from 'pages/Shop/Recommended';
import ShoppingCar from 'pages/ShoppingCar';
import ShopSearch from 'pages/Shop/ShopSearch';
import Address from 'pages/Address';
import Profile from 'pages/Profile';
import Search from 'pages/Search';
import AddressEdit from 'pages/Address/AddressEdit';
import SelectAddress from 'pages/Address/AddressEdit/SelectAddress/SelectAddress';
import SearchResult from 'pages/Search/SearchResult';
import Settlement from 'pages/Shop/Settlement';
import NicknameEdit from 'pages/Mine/NicknameEdit';

const root = createRoot(document.getElementById('app')!);
const GoodDetailsContext = React.createContext<any>({});

root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<Welcome />} /> */}
        <Route index element={<HomePage />} />
        <Route path="list" element={<List />} />
        <Route path="item/:id" element={<Item />} />
        <Route path="item/:id" element={<Item />} />
        <Route path="order" element={<Order />} />
        <Route path="mine" element={<Mine />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route path="mine/nicknameEdit" element={<NicknameEdit />} />

      <Route path="shop" element={<Shop />}></Route>
      <Route path="shop/recommended" element={<Recommended />}></Route>
      <Route path="shop/shopSearch" element={<ShopSearch />}></Route>
      <Route path="shop/settlement" element={<Settlement />}></Route>

      <Route path="signIn" element={<SignIn />} />
      <Route path="signIn/changePassword" element={<ChangePassword />} />
      <Route path="shoppingCar" element={<ShoppingCar />}></Route>
      <Route path="address" element={<Address />}></Route>
      <Route path="address/edit" element={<AddressEdit />}></Route>
      <Route path="address/edit/selectAddress" element={<SelectAddress />}></Route>
      <Route path="profile" element={<Profile />}></Route>
      <Route path="search" element={<Search />}></Route>
      <Route path="search/searchResult" element={<SearchResult />}></Route>
    </Routes>
  </HashRouter>,
);
