import axios from 'axios';

let page;
let previousQuery = '';

export default async function fetchPic(searchQuery) {
  const API_URL = 'https://pixabay.com/api/';
  const API_KEY = '40336081-5219cc859e2994812c4617836';

  if (searchQuery !== previousQuery) {
    page = 1;
  }

  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page,
  });

  console.log(`searchQuery: ${searchQuery}, page до запиту: ${page}`);

  return await axios
    .get(`${API_URL}`, {
      params,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(resp => {
      console.log(resp.data);
      return resp.data;
    })
    .then(data => {
      page += 1;
      console.log(`searchQuery: ${searchQuery}, page після запиту: ${page}`);
      previousQuery = searchQuery;
      return data.hits;
    });
}
