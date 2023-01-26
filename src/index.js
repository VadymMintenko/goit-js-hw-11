import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const KEY = '33034390-7e7038dc39440b662093bd231';
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

let lightBox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

function onInput(evt) {
  inputValue = evt.target.value;
  if (inputValue === '') {
    clearMarkup();
    button.hidden = true;
    page = 1;
  }
}

function onSubmit(evt) {
  evt.preventDefault();
  getImages(page, inputValue).then(resp => {
    if (resp.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    createCard(resp);
    lightBox.refresh();
  });
}

async function getImages(page = 1, param) {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${param}&page=${page}&per_page=40`
  );
  console.log(response);
  return response.data;
}

function createCard(arr) {
  const murkup = arr.hits
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
        return `<a href='${largeImageURL}'>
      <div class='photo-card'>
      <img src=${webformatURL} alt='${tags}' loading='lazy' />
      <div class='info'>
        <p class='info-item'>
          <b>Likes</b>${likes}
        </p>
        <p class='info-item'>
          <b>Views</b>${views}
        </p>
        <p class='info-item'>
          <b>Comments</b>${comments}
        </p>
        <p class='info-item'>
          <b>Downloads</b>${downloads}
        </p>
      </div>
    </div>
  </a>`;
      }
    )
    .join('');
  divEl.insertAdjacentHTML('beforeend', murkup);
  button.hidden = false;
}

function loadMore() {
  page += 1;
  getImages(page, inputValue)
    .then(data => createCard(data))
    .catch(() => {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      button.hidden = true;
    });
}

function clearMarkup() {
  divEl.innerHTML = '';
}
