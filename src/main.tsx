import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from 'layouts/index';
import Welcome from 'pages/Welcome';
import List from 'pages/List';
import Item from 'pages/Item';
import Page404 from 'pages/404';

const root = createRoot(document.getElementById('app')!);

root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="list" element={<List />} />
        <Route path="item/:id" element={<Item />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  </HashRouter>,
);
