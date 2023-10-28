import fetchPic from './search';
import galleryPic from '../templates/gallery.hbs';

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

async function onSearchForm(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  if (currentQuery === searchQuery) {
    alert('Error! Already searching');
    refns.searchInput.value = '';
    return;
  }
  if (searchQuery === '') {
    alert('Error! Please use reqired field words');
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
  refns.imgsGallery.insertAdjacentHTML('beforeend', galleryPic(hits));
}
