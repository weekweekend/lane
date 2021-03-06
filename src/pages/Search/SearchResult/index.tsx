import { InfiniteScroll } from 'antd-mobile';
import { useState, useEffect } from 'react';
import './index.less';
import request from 'utils/request';
import ShopCard from 'components/ShopCard';
import SearchNav from 'components/SearchNav';
import { useLocation, useSearchParams } from 'react-router-dom';
import sleep from 'utils/sleep';

const SearchResult = () => {
  const [searchResultList, setSearchResultList] = useState<Array<any>>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isShowResult, setIsShowResult] = useState(true);
  const [params] = useSearchParams();
  const keyVal = params.get('keyVal');

  async function loadMore() {
    await sleep(500);
    const append = await request('searchResult', 'GET', { keyVal: keyVal }).then((data) => data.data.rows);
    setSearchResultList([...searchResultList, ...append]);
    setHasMore(append.length > 0 && searchResultList.length < 25);
  }

  return (
    <>
      <SearchNav onShowB={(bl: boolean) => setIsShowResult(bl)} />
      <div style={isShowResult ? { display: 'block' } : { display: 'none' }}>
        {searchResultList.map((item: any) => (
          <ShopCard key={item.id} {...item} />
        ))}
      </div>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  );
};
export default SearchResult;
