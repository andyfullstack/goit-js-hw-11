import fetchPic from './search';
import galleryImg from '../templates/gallery.hbs';

const refns = {
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-input'),
  imgsGallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refns.searchForm.addEventListener('submit', onSearchForm);
refns.loadMoreBtn.addEventListener('click', onLoadMore);

let searchQuery;
let currentQuery;

async function onSearchForm(evt) {
  evt.preventDefault();
  searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
  if (currentQuery === searchQuery) {
    alert('Error! Researching in Progress...');
    refns.searchInput.value = '';
    return;
  }
  if (searchQuery === '') {
    alert('Error! Search source is required!');
    refns.searchInput.value = '';
    return;
  }
  refns.searchInput.value = '';
  refns.imgsGallery.innerHTML = '';
  fetchPic(searchQuery).then(galleryImgsMarckup);
  currentQuery = searchQuery;
}

async function onLoadMore() {
  fetchPic(`${searchQuery}`).then(galleryImgsMarckup);
}

function galleryImgsMarckup(hits) {
  refns.imgsGallery.insertAdjacentHTML('beforeend', galleryImg(hits));
}
