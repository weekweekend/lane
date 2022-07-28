import { InfiniteScroll, Skeleton } from 'antd-mobile';
import { useState, useEffect } from 'react';
import './index.less';
import request from 'utils/request';
import ShopCard from 'components/ShopCard';
import SearchNav from 'components/SearchNav';
import { useSearchParams } from 'react-router-dom';
import sleep from 'utils/sleep';

const SearchResult = () => {
  const [searchResultList, setSearchResultList] = useState<Array<any>>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isShowResult, setIsShowResult] = useState(true);
  const [params] = useSearchParams();
  let keyVal = params.get('keyVal');

  useEffect(() => {
    setSearchResultList([]);
  }, [keyVal]);

  async function loadMore() {
    await sleep(500);
    const append = await request('searchResult', 'GET', { keyVal: keyVal }).then((data) => data.data.rows);
    setSearchResultList([...searchResultList, ...append]);
    setHasMore(append.length > 0 && searchResultList.length < 55);
  }

  return (
    <>
      <SearchNav onShowB={(bl: boolean) => setIsShowResult(bl)} />
      <div style={isShowResult ? { display: 'block' } : { display: 'none' }}>
        {searchResultList.length <= 0 && (
          <div style={{ margin: '0 .7rem' }}>
            <Skeleton.Title animated />
            <Skeleton.Paragraph lineCount={3} animated />
            <Skeleton.Title animated />
            <Skeleton.Paragraph lineCount={3} animated />
            <Skeleton.Title animated />
            <Skeleton.Paragraph lineCount={3} animated />
            <Skeleton.Title animated />
            <Skeleton.Paragraph lineCount={3} animated />
          </div>
        )}
        {searchResultList.map((item: any) => (
          <ShopCard key={item.id} {...item} />
        ))}
      </div>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  );
};
export default SearchResult;
