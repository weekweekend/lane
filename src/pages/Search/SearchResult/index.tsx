import { Button, Input, Tag, Selector, Image } from 'antd-mobile';
import { LeftOutline, SearchOutline } from 'antd-mobile-icons';
import { useState, useEffect, useRef } from 'react';
import './index.less';
import request from 'utils/request';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ShopCard from 'components/ShopCard';
import SearchNav from 'components/SearchNav';

const SearchResult = () => {
  const [searchResultList, setSearchResultList] = useState([]);
  const keyVal = new URLSearchParams(window.location.hash.split('?')[1]).get('keyVal');
  const [isShowResult, setIsShowResult] = useState(true);

  useEffect(() => {
    if (keyVal) console.log('搜索了');
    request('searchResult', 'GET', { keyVal: keyVal }).then((data) => setSearchResultList(data.data.rows));
  }, [keyVal]);
  return (
    <>
      <SearchNav onShowB={(bl: boolean) => setIsShowResult(bl)} />
      <div style={isShowResult ? { display: 'block' } : { display: 'none' }}>
        {searchResultList.map((item: any) => (
          <ShopCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};
export default SearchResult;
