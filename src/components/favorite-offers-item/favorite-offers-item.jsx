import * as React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import {getOfferLink, getRatingInPercents} from '~/helpers/helpers';
import {offerType} from '~/common/prop-types/prop-types';

const FavoriteOffersItem = ({offer, onFavoriteToggle}) => {
  const pathToOffer = getOfferLink(offer.id);

  const handleFavoriteToggle = () => onFavoriteToggle(offer);

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={pathToOffer}>
          <img
            className="place-card__image"
            src={offer.imagePreview}
            width="150"
            height="110"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={clsx(
                `place-card__bookmark-button button`,
                offer.isFavorite && `place-card__bookmark-button--active`
            )}
            onClick={handleFavoriteToggle}
            disabled={offer.isSaving}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{
                width: `${getRatingInPercents(offer.rating)}%`,
              }}
            />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={pathToOffer}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

FavoriteOffersItem.propTypes = {
  offer: offerType.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default FavoriteOffersItem;
