import BASE_URL from "../helpers/baseUrl";

const createPlaylist = (data) => {
  let bodyCredientail = {
    data: data,
  };
  return fetch(`${BASE_URL}createPlaylist.php`, {
    method: "POST",

    body: JSON.stringify(bodyCredientail),
  })
    .then((respone) => respone.json())
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));
};

export default createPlaylist;
