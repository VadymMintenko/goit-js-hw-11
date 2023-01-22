import axios from 'axios';
import Notiflix from 'notiflix';

KEY = '33034390-7e7038dc39440b662093bd231';
const BASE_URL = 'https://pixabay.com/api/';

const formEl = document.querySelector('.search-form');
const divEl = document.querySelector('.gallery');
formEl.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const inputValue = evt.target.value;
  wrap(inputValue).then(resp => createCard(resp));
}

async function wrap(param) {
  const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${param}`);
  return response.hits;
}

function createCard(arr) {
  const murkup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return ` <div class="photo-card">
      <img src="${webformatURL}" alt="" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>${likes}</b>
        </p>
        <p class="info-item">
          <b>${views}</b>
        </p>
        <p class="info-item">
          <b>${comments}</b>
        </p>
        <p class="info-item">
          <b>${downloads}</b>
        </p>
      </div>
    </div>`;
      }
    )
    .join('');
  divEl.innerHTML = murkup;
}
