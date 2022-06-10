import { FC, useEffect, useState } from 'react';
import { Image, Button, Popup, Stepper } from 'antd-mobile';
import './index.less';
import { BiMedal } from 'react-icons/bi';
import ShopGoodsSelectCard from './ShopGoodsSelectCard';
import { IoIosAddCircle, IoIosRemoveCircleOutline } from 'react-icons/io';
import GoodsDetails from './GoodsDetails';
import request from 'utils/request';

const ShopGoodsCard: FC<{
  id: number;
  image: string;
  title: string;
  price: number;
  tag?: string;
  raw: Array<string>;
  monthSale: number;
  likeRate: number;
  hasDetails: boolean;
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
  hasDetails,
  goodsShoppingCartData,
  onSetShopShoppingCartData,
}) => {
  const [isShowGoodsChoose, setIsShowGoodsChoose] = useState(false);
  const [curNum, setCurNum] = useState(0);
  const [isShowDetails, setIsShowDetails] = useState(false);

  useEffect(() => {
    const idx = goodsShoppingCartData.rows?.findIndex((item: any) => item.id % 3 === 0 && id % 3 === 0);
    if (idx >= 0) setCurNum(goodsShoppingCartData.rows[idx].number);
  }, [goodsShoppingCartData.minPrice]);

  const onGoodNumChange = (val: number) => {
    const params = { goodsId: id, goodsNum: val };
    setCurNum(val);
    request('put', 'PUT', params).then(() => {
      console.log('修改数量>>>服务器');
      onSetShopShoppingCartData();
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
          {tag && tag !== ' ' ? (
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
            <span>￥{price.toFixed(2)}</span>
            {hasDetails && curNum === 0 && (
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
            )}

            {hasDetails && curNum > 0 && (
              <div className="details-stepper activate-details-stepper">
                <IoIosRemoveCircleOutline
                  color="#209FFA"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurNum(curNum - 1);
                  }}
                />

                <span>{curNum}</span>
                <IoIosAddCircle
                  color="#209FFA"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurNum(curNum + 1);
                    isShowGoodsChoose && setIsShowGoodsChoose(true);
                  }}
                />
              </div>
            )}
            {!hasDetails && (
              <div onClick={(e) => e.stopPropagation()}>
                <Stepper
                  min={minNum || 0}
                  max={maxNum}
                  value={curNum}
                  onChange={onGoodNumChange}
                  className={curNum > 0 ? '' : 'stepper-activate'}
                />
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
                height: '80vh',
              }}
            >
              <div className="goods-choose-popup-content">
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
                  curNum={curNum}
                />
              </div>
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
        bodyStyle={{ width: '100vw' }}
      >
        <div style={{ height: '100vh', overflowY: 'scroll' }}>
          <GoodsDetails
            goodsId={id}
            minNum={minNum}
            maxNum={maxNum}
            curNum={curNum}
            setCurNum={(val) => setCurNum(val)}
            onCloseDetails={() => setIsShowDetails(false)}
            goodsShoppingCartData={goodsShoppingCartData}
            onSetShopShoppingCartData={onSetShopShoppingCartData}
            onGoodNumChange={onGoodNumChange}
            details={details}
            hasDetails={hasDetails}
            image={image}
            title={title}
            price={price}
          />
        </div>
      </Popup>
    </>
  );
};

export default ShopGoodsCard;
