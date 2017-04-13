import { FETCH_RECIPIES } from '../../constants/action-types';
import { setRecipies } from '../../actions/recipies';

const URL = 'https://s3.amazonaws.com/500tech-shared/db.json';

function fetchData(url, callback) {
  console.log('attempt to fetch from: ' + url);
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        console.log(`Error fetching recipes: ${response.status}`)
      } else {
        response.json().then(callback);
      }
    })
    .catch((err) => console.log(`Error fetching recipes: ${response.status}`));
}

const apiMiddleware = ({ dispatch }) => next => action => {
  if (action.type === FETCH_RECIPIES) {
    fetchData(URL, (data) => {
      dispatch(setRecipies(data))
    });
  }

  next(action);
}

export default apiMiddleware;