import * as React from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import {offerCityType, offerType} from '~/common/prop-types/prop-types';
import {getMap, getMarker, getMarkers} from './helpers';
import {MAP_IMG_URL, ICON_CONFIG, ACTIVE_ICON_CONFIG} from './common';

const withMap = (Component) => {
  const WithMap = ({city, activeOffer, offers: allOffers}) => {
    const [points, setPoints] = React.useState([]);
    const [activePoint, setActivePoint] = React.useState(null);
    const mapRef = React.useRef(null);
    const mapNodeRef = React.useRef(null);

    React.useEffect(() => {
      mapRef.current = getMap(city, mapNodeRef.current);

      addToMap(leaflet.tileLayer(MAP_IMG_URL));
    }, []);

    React.useEffect(() => {
      setMapView(city.location.latitude, city.location.longitude);
    }, [city]);

    React.useEffect(() => {
      removeMarkers(points);

      renderMarkers(allOffers);
    }, [allOffers]);

    React.useEffect(() => {
      if (activePoint) {
        removeMarker(activePoint);
      }

      if (activeOffer) {
        renderActiveMarker(activeOffer);
      }
    }, [activeOffer]);

    const renderMarkers = (offers) => {
      const markers = getMarkers(offers, ICON_CONFIG);

      setPoints(markers);

      addToMap(leaflet.layerGroup(markers));
    };

    const renderActiveMarker = (offer) => {
      const newActivePoint = getMarker(offer, ACTIVE_ICON_CONFIG);

      setActivePoint(newActivePoint);

      addToMap(newActivePoint);

      setMapView(offer.location.latitude, offer.location.longitude);
    };

    const removeMarkers = (markers) => markers.forEach(removeMarker);

    const removeMarker = (marker) => mapRef.current.removeLayer(marker);

    const setMapView = (latitude, longitude) => mapRef.current.setView([latitude, longitude]);

    const addToMap = (layer) => layer.addTo(mapRef.current);

    const renderMap = () => <div id="map" ref={mapNodeRef} />;

    return <Component renderMap={renderMap} />;
  };

  WithMap.propTypes = {
    city: offerCityType.isRequired,
    activeOffer: offerType,
    offers: PropTypes.arrayOf(offerType.isRequired).isRequired,
  };

  return WithMap;
};

export default withMap;
