import BASE_URL from "../helpers/baseUrl";

const getUserInfo = (token) => {
  return fetch(`${BASE_URL}getUserInfo.php?loginToken=${token}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default getUserInfo;
