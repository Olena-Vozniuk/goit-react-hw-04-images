import PropTypes from 'prop-types';

const KEY = '32873101-26554fb46a442edcfb4427fc4';
const BASE_URL = 'https://pixabay.com/api/';


export const getImages = (value, page) => {
  return fetch(`${BASE_URL}?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
};

getImages.propTypes = {
  value: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};