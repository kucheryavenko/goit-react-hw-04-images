import axios from 'axios';

const KEY_API = '28454528-1e3cb033326c6dab929ab8bef';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: KEY_API,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
};

export const fetchData = async (searchQuery, page) => {
  const { data } = await axios.get(`?q=${searchQuery}&page=${page}`);
  return data;
};
