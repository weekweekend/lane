import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from 'layouts/index';
import Welcome from 'pages/Welcome';
import List from 'pages/List';
import Item from 'pages/Item';
import Page404 from 'pages/404';
import HomePage from 'pages/HomePage';
import SignIn from 'pages/SignIn';
import Mine from 'pages/Mine';
import Order from 'pages/Order';
import ShareList from 'pages/ShareList';
import ChangePassword from 'pages/SignIn/ChangePassword';
import ShopDetailsLayout from 'layouts/ShopDetails';
import Shop from 'pages/Shop';
import Recommended from 'pages/Shop/Recommended';

const root = createRoot(document.getElementById('app')!);

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
        <Route path="shareList" element={<ShareList />} />

        <Route path="mine" element={<Mine />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route path="/" element={<ShopDetailsLayout />}>
        <Route path="shop" element={<Shop />}></Route>
        <Route path="shop/recommended" element={<Recommended />}></Route>
      </Route>
      <Route path="signIn" element={<SignIn />} />
      <Route path="signIn/changePassword" element={<ChangePassword />} />
    </Routes>
  </HashRouter>,
);
