import { FC, useEffect, useState } from 'react';
import { Image, Button, Popup, Stepper } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { BiMedal } from 'react-icons/bi';
import ShopGoodsSelectCard from './ShopGoodsSelectCard';
import GoodsDetails from './GoodsDetails';
import request from 'utils/request';

const ShopGoodsCard: FC<{
  id: number;
  image: string;
  title: string;
  tag?: string;
  raw: Array<string>;
  monthSale: number;
  likeRate: number;
  price: number;
  minNum?: number;
  maxNum?: number;
  details?: Array<{
    id: number;
    name: string;
    params: Array<string>;
  }>;
  goodsShoppingCartData: any;
  onSetShopShoppingCartData: () => void;
}> = ({
  id,
  image,
  title,
  tag,
  raw,
  monthSale,
  price,
  likeRate,
  minNum,
  maxNum,
  details,
  goodsShoppingCartData,
  onSetShopShoppingCartData,
}) => {
  const [isShowGoodsChoose, setIsShowGoodsChoose] = useState(false);
  const [curNum, setCurNum] = useState(0);
  const [shoppingCart, setShoppingCart] = useState<any>({});
  const [isShowDetails, setIsShowDetails] = useState(false);

  const target = `#/shop/goodsDetails?goodsId=${encodeURIComponent(id)}`;

  useEffect(() => {
    const idx = goodsShoppingCartData.list?.findIndex((item: any) => item.id == id);
    if (idx >= 0) setCurNum(goodsShoppingCartData.list[idx].number);
  }, []);

  const onGoodNumChange = (val: number) => {
    const params = { goodsId: id, goodsNum: val };
    setCurNum(val);
    request('mock/test.json', 'PUT', params).then((data) => {
      console.log('修改数量>>>服务器', data.data.msg);
      onSetShopShoppingCartData();
      // data.data.msg === 'ok' && onSetNewList();
    });
  };

  return (
    <>
      <div className="goods-card" onClick={() => setIsShowDetails(true)}>
        <div className="goods-card-left">
          <Image src={image} width="100%" fit="cover" style={{ borderRadius: '.2rem' }} />
        </div>
        <div className="goods-card-right">
          <div className="goods-card-right-title">{title}</div>
          {tag ? (
            <div className="goods-card-right-tag">
              <BiMedal color="#e67e29" />
              {tag}
            </div>
          ) : (
            ''
          )}

          <div style={{ color: '#999' }}>
            <div>
              原料：
              {raw.map((item, idx) => (
                <span key={Math.random()}>{idx ? ', ' + item : item}</span>
              ))}
            </div>
          </div>
          <div className="goods-card-right-sales">
            <div>月售 {monthSale}</div>
            <div>好评率 {likeRate}%</div>
          </div>
          <div className="goods-card-right-price">
            <span>￥{price}</span>
            {details && curNum === 0 ? (
              <Button
                color="primary"
                shape="rounded"
                size="mini"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShowGoodsChoose(true);
                }}
              >
                选规格
              </Button>
            ) : (
              <div onClick={(e) => e.stopPropagation()}>
                <Stepper
                  min={minNum || 0}
                  max={maxNum}
                  value={curNum}
                  onChange={onGoodNumChange}
                  className={curNum > 0 ? '' : 'stepper-activate'}
                />
                {/* <div className="circle" onClick={() => console.log('123')}>
                +
              </div> */}
              </div>
            )}
            <Popup
              className="goods-choose-popup"
              visible={isShowGoodsChoose}
              onMaskClick={() => {
                setIsShowGoodsChoose(false);
              }}
              bodyStyle={{
                borderTopLeftRadius: '.5rem',
                borderTopRightRadius: '.5rem',
                minHeight: '80vh',
              }}
            >
              <ShopGoodsSelectCard
                onClose={() => setIsShowGoodsChoose(false)}
                details={details}
                title={title}
                image={image}
                price={price}
                minNum={minNum}
                maxNum={maxNum}
                onSetShopShoppingCartData={onSetShopShoppingCartData}
                setCurNum={(val: number) => setCurNum(val)}
              />
            </Popup>
          </div>
        </div>
      </div>
      <Popup
        visible={isShowDetails}
        onMaskClick={() => {
          setIsShowDetails(false);
        }}
        position="right"
        bodyStyle={{ width: '60vw' }}
      >
        <GoodsDetails
          goodsId={id}
          onCloseDetails={() => setIsShowDetails(false)}
          goodsShoppingCartData={goodsShoppingCartData}
          onSetShopShoppingCartData={onSetShopShoppingCartData}
        />
      </Popup>
    </>
  );
};

export default ShopGoodsCard;
