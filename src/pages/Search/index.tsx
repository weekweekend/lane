import { Button, Input, Tag, Selector, Image } from 'antd-mobile';
import { useState, useEffect, useRef } from 'react';
import './index.less';
import request from 'utils/request';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import SearchNav from 'components/SearchNav';
import { useLocalStorageState } from 'ahooks';

const Search = () => {
  const [historyList, setHistoryList] = useLocalStorageState('history', { defaultValue: ['搜索'] });
  const [similarList, setSimilarList] = useState([]);
  const [isShowTags, setIsShowTags] = useState(true);

  useEffect(() => {
    request('searchKey', 'GET').then((data) => {
      setSimilarList(data.data.rows);
    });
  }, []);

  return (
    <div className="search-body">
      <SearchNav onShowB={(bl: boolean) => setIsShowTags(bl)} />
      <div className="search-content" style={isShowTags ? { display: 'block' } : { display: 'none' }}>
        {historyList?.length > 0 ? (
          <div className="search-title">
            <div>
              <h3>历史搜索</h3>
              <RiDeleteBin6Line
                color="#888"
                fontSize={'.8rem'}
                onClick={() => {
                  setHistoryList([]);
                  request('delete', 'DELETE');
                }}
              />
            </div>
            <div className="search-title-content">
              {historyList?.map((item: string) => (
                <Link
                  key={item}
                  to={`searchResult?keyVal=${encodeURIComponent(item)}`}
                  onClick={() => {
                    setHistoryList(Array.from(new Set([item, ...historyList])));
                    console.log('添加历史记录', item);
                  }}
                >
                  <Tag round>{item}</Tag>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          ''
        )}

        <div className="search-title">
          <div>
            <h3>搜索发现</h3>
          </div>
          <div className="search-title-content">
            {similarList?.map((item, idx) => (
              <Link
                key={idx}
                to={`searchResult?keyVal=${encodeURIComponent(item)}`}
                onClick={() => {
                  setHistoryList(Array.from(new Set([item, ...historyList])));
                  console.log('添加历史记录', item);
                }}
              >
                <Tag round>{item}</Tag>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
