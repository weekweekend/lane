import { FC, useState, useEffect } from 'react';
import { Input, List, Tag } from 'antd-mobile';
import { LeftOutline, SearchOutline } from 'antd-mobile-icons';
import './index.less';
import request from 'utils/request';
import { useParams, useLocation, Routes } from 'react-router-dom';

const SearchNav: FC<{
  onShowB: (bl: boolean) => void;
}> = ({ onShowB }) => {
  const [keyValue, setKeyValue] = useState('');
  const [searchAssociation, setSearchAssociation] = useState([]);
  const [isShowSA, setIsShowSA] = useState(false);
  const searchKeyVal = new URLSearchParams(useLocation().search).get('keyVal');

  const onSearchValChange = (val: string) => {
    setKeyValue(val);
    onShowB(!val);
    request('searchAssociation', 'GET', { keyVal: val }).then((data) => setSearchAssociation(data.data.rows));
  };

  useEffect(() => {
    if (searchKeyVal) {
      request('searchAssociation', 'GET', { keyVal: searchKeyVal }).then((data) =>
        setSearchAssociation(data.data.rows),
      );
      setKeyValue(searchKeyVal);
    }
  }, [searchKeyVal]);

  return (
    <div className="search-layout">
      <div className="search-nav">
        <a href={window.location.hash === '#/search' ? '#/' : '#/search'}>
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
              localStorage.setItem(
                'history',
                JSON.stringify(Array.from(new Set([keyValue, ...JSON.parse(localStorage.getItem('history') || '')]))),
              );
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
                  localStorage.setItem(
                    'history',
                    JSON.stringify(
                      Array.from(new Set([item.name, ...JSON.parse(localStorage.getItem('history') || '')])),
                    ),
                  );
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
