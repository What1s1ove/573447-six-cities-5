import * as React from 'react';
import {reviewType} from '~/common/prop-types/prop-types';
import {getRatingInPercents} from '~/helpers/offer';
import {getFormattedDate} from './helpers';

const ReviewItem = ({review}) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={review.user.avatarUrl}
          width="54"
          height="54"
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">{review.user.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span
            style={{
              width: `${getRatingInPercents(review.rating)}%`,
            }}
          ></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">{review.comment}</p>
      <time className="reviews__time" dateTime={review.date.toISOString()}>
        {getFormattedDate(review.date)}
      </time>
    </div>
  </li>
);

ReviewItem.propTypes = {
  review: reviewType.isRequired,
};

export default ReviewItem;
