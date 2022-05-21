import { memo, FC, useState, useEffect } from 'react';
import './index.less';
import { Avatar, Tag, Rate, Image } from 'antd-mobile';
import { MoreOutline } from 'antd-mobile-icons';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import request from 'utils/request';

const ShopEvaluateCard: FC<{
  id: number;
  avatar: string;
  name: string;
  anonymous: boolean;
  label?: string;
  time: string;
  evaluate: {
    score: number;
    taste: number;
    packaging: number;
    delivery: number;
  };
  content: string;
  image?: Array<string>;
  reply?: string;
  recommend?: string;
  like: boolean;
}> = ({ id, avatar, name, anonymous, label, time, evaluate, content, image, reply, recommend, like }) => {
  const [isLike, setIsLike] = useState(like);
  return (
    <div className="shop-evaluate-card">
      <div className="evaluate-card-nav">
        <div className="valuate-card-nav-left">
          <Avatar src={anonymous ? '' : avatar} />
          <div>
            {anonymous ? (
              <span>匿名用户</span>
            ) : (
              <span>
                {/^\w/.exec(name)}****
                {/\w$/.exec(name)}
                <Tag color="#2db7f5">{label}</Tag>
              </span>
            )}
            <span className="valuate-card-time">2020-20-20</span>
          </div>
        </div>
        {/* <MoreOutline color={'#ccc'} fontSize={'1rem'} /> */}
      </div>
      <div className="evaluate-card-score">
        <div>
          满意度 <Rate readOnly value={evaluate.score} />
        </div>
        <div>味道{evaluate.taste}星</div>
        <div>包装{evaluate.packaging}星</div>
        <div>骑士{evaluate.delivery}星</div>
      </div>
      <div className="evaluate-card-content">
        #<i style={{ color: '#66ccff' }}>{recommend}</i>#，{content}
        <span>
          {image?.map((item, idx) => (
            <Image key={'img' + idx} src={item} />
          ))}
        </span>
      </div>
      {reply && (
        <div className="evaluate-card-reply">
          <p>商家回复</p>
          {reply}
        </div>
      )}

      <div className="evaluate-card-like">
        {recommend && (
          <div>
            TA的推荐：
            <Tag color={'#E9F6FE'} style={{ '--text-color': '#07A3EE' }}>
              {recommend}
            </Tag>
          </div>
        )}

        {isLike && (
          <span
            onClick={() => {
              setIsLike(!isLike);
              request('mock/test.json', 'PUT', { evaluateId: id, evaluateLike: !isLike + '' }).then((data) =>
                console.log(data),
              );
            }}
          >
            <AiTwotoneLike className="be-like" color="orangered" />
            有用1
          </span>
        )}
        {!isLike && (
          <span
            onClick={() => {
              setIsLike(!isLike);
              request('mock/test.json', 'PUT', { evaluateId: id, evaluateLike: !isLike + '' }).then((data) =>
                console.log(data),
              );
            }}
          >
            <AiOutlineLike />
            有用
          </span>
        )}
      </div>
    </div>
  );
};

export default ShopEvaluateCard;
