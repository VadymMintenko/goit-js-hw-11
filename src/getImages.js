import axios from 'axios';

export default async function getImages(page = 1, param) {
  const KEY = '33034390-7e7038dc39440b662093bd231';
  const BASE_URL = 'https://pixabay.com/api/';
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${param}&page=${page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`
  );
  return response.data;
}
