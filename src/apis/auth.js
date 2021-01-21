import callApi from '../commons/utils/apiCaller';

//@post user to login https://api.yensaochampa.icu/users/login

export const login = (user) => {
  //headers 
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }
  return callApi('users/login', 'POST', user, config).then(res => {
    return res;
  }).catch(err => {
    return err.response
  })
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
}