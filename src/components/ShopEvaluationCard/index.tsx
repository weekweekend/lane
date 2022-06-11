import { FC, useState } from 'react';
import './index.less';
import { Avatar, Tag, Rate, Image } from 'antd-mobile';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import request from 'utils/request';

const ShopEvaluationCard: FC<{
  id: number;
  avatar: string;
  name: string;
  anonymous: boolean;
  label?: string;
  time: string;
  evaluation: {
    score: number;
    taste: number;
    packaging: number;
    delivery: number;
  };
  content: string;
  image?: Array<string>;
  reply?: string;
  hasReply: boolean;
  hasRecommend: boolean;
  recommend?: string;
  like: boolean;
}> = ({
  id,
  avatar,
  name,
  anonymous,
  label,
  time,
  evaluation,
  content,
  image,
  reply,
  recommend,
  like,
  hasReply,
  hasRecommend,
}) => {
  const [isLike, setIsLike] = useState(like);
  return (
    <div className="shop-evaluation-card">
      <div className="evaluation-card-nav">
        <div className="valuate-card-nav-left">
          <Avatar src={anonymous ? '' : avatar} />
          <div>
            {anonymous ? (
              <span>匿名用户</span>
            ) : (
              <span>
                {/^./.exec(name)}****
                {/.$/.exec(name)}
                {label && <Tag color="#2db7f5">{label}</Tag>}
              </span>
            )}
            <span className="valuate-card-time">{time}</span>
          </div>
        </div>
      </div>
      <div className="evaluation-card-score">
        <div>
          满意度 <Rate readOnly value={evaluation.score} />
        </div>
        <div>味道{evaluation.taste}星</div>
        <div>包装{evaluation.packaging}星</div>
        <div>骑士{evaluation.delivery}星</div>
      </div>
      <div className="evaluation-card-content">
        #<i style={{ color: '#66ccff' }}>{recommend}</i>#，{content}
        <span>
          {image?.map((item, idx) => (
            <Image key={'img' + idx} src={item} />
          ))}
        </span>
      </div>
      {hasReply && (
        <div className="evaluation-card-reply">
          <p>商家回复</p>
          {reply}
        </div>
      )}

      <div className="evaluation-card-like">
        {hasRecommend && (
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
              request('put', 'PUT', { evaluationId: id, evaluationLike: !isLike + '' }).then((data) =>
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
              request('put', 'PUT', { evaluationId: id, evaluationLike: !isLike + '' }).then((data) =>
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

export default ShopEvaluationCard;
