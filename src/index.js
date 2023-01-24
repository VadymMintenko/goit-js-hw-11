import axios from 'axios';
import Notiflix from 'notiflix';

KEY = '33034390-7e7038dc39440b662093bd231';
const BASE_URL = 'https://pixabay.com/api/';

const formEl = document.querySelector('.search-form');
const divEl = document.querySelector('.gallery');
const button = document.querySelector('.load-more');
console.log(button);

formEl.addEventListener('submit', onSubmit);
formEl.addEventListener('input', onInput);
button.addEventListener('click', loadMore);

let inputValue = '';
let page = 1;

function onInput(evt) {
  inputValue = evt.target.value;
}

function onSubmit(evt) {
  evt.preventDefault();
  wrap(page, inputValue).then(resp => createCard(resp));
}

async function wrap(page = 1, param) {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${param}&page=${page}&per_page=100`
  );
  console.log(response);
  return response.data.hits;
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
          <b>likes:${likes}</b>
        </p>
        <p class="info-item">
          <b>views:${views}</b>
        </p>
        <p class="info-item">
          <b>comments:${comments}</b>
        </p>
        <p class="info-item">
          <b>${downloads}</b>
        </p>
      </div>
    </div>`;
      }
    )
    .join('');
  divEl.insertAdjacentHTML('beforeend', murkup);
  button.hidden = false;
}

function loadMore() {
  page += 1;
  wrap(page, inputValue).then(data => {
    createCard(data);
    console.log(data);
    if (data.hits.length === 0) {
      button.hidden = true;
    }
  });
}
