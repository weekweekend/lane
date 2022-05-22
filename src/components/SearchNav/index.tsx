import TuWei from 'components/TuWei';
import { memo, FC, useState, useEffect } from 'react';
import { Input, List, Tag, Tabs, Avatar } from 'antd-mobile';
import { Outlet, Link } from 'react-router-dom';
import { LeftOutline, SearchOutline } from 'antd-mobile-icons';
import './index.less';
import request from 'utils/request';

const SearchNav: FC<{ onShowB: (bl: boolean) => void }> = ({ onShowB }) => {
  const [keyValue, setKeyValue] = useState('');
  const [searchAssociation, setSearchAssociation] = useState([]);
  const [isShowSA, setIsShowSA] = useState(false);
  const searchKeyVal = new URLSearchParams(window.location.hash.split('?')[1]).get('keyVal');

  const onSearchValChange = (val: string) => {
    request('mock/getSearchAssociation.json', 'GET', { keyVal: val }).then((data) => setSearchAssociation(data.data));
    setKeyValue(val);
    onShowB(!val);
  };

  useEffect(() => {
    if (searchKeyVal) {
      request('mock/getSearchAssociation.json', 'GET', { keyVal: searchKeyVal }).then((data) =>
        setSearchAssociation(data.data),
      );
      setKeyValue(searchKeyVal);
    }
  }, [searchKeyVal]);
  return (
    <div className="search-layout">
      <div className="search-nav">
        <a href={window.location.hash === '#/search' ? '/' : '#/search'}>
          <LeftOutline fontSize={'1.1rem'} />
        </a>

        <Input
          placeholder="请输入内容"
          value={keyValue}
          onChange={onSearchValChange}
          onBlur={() => {
            setTimeout(() => {
              setIsShowSA(false);
              onShowB(true);
            }, 100);
          }}
          onFocus={() => {
            setIsShowSA(true);
            onShowB(!keyValue);
          }}
        />
        {keyValue ? (
          <a
            href={`#/search/searchResult?keyVal=${encodeURIComponent(keyValue)}`}
            onClick={() => {
              console.log('添加历史记录', keyValue);
            }}
          >
            搜索
          </a>
        ) : (
          '搜索'
        )}
      </div>

      {keyValue && isShowSA ? (
        <List className="search-association">
          {searchAssociation.map((item: any) => (
            <a key={item.id} href={`#/search/searchResult?keyVal=${encodeURIComponent(keyValue)}`}>
              <List.Item
                onClick={() => {
                  setKeyValue(item.name);
                  console.log('更新历史记录', item.name);
                }}
              >
                <SearchOutline />
                {item.name}
                {item.tag?.map((item: string, idx: number) => (
                  <Tag key={idx} color="#66ccff">
                    {item}
                  </Tag>
                ))}
              </List.Item>
            </a>
          ))}
        </List>
      ) : (
        ''
      )}
    </div>
  );
};

export default SearchNav;
