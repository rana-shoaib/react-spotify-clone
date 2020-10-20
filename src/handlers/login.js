import BASE_URL from "../helpers/baseUrl";

const login = (data) => {
  let bodyCredientail = {
    loginData: data,
  };
  return fetch(`${BASE_URL}login.php`, {
    method: "POST",
    body: JSON.stringify(bodyCredientail),
  })
    .then((respone) => respone.json())
    .then((data) => {
      return data;
    })
    .catch((e) => console.error(e));
};

export default login;
