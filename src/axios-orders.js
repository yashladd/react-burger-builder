import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-f92ea.firebaseio.com/',
});

export default instance;
