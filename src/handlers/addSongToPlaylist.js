import BASE_URL from "../helpers/baseUrl";

const addSongToPlaylist = (data) => {
  let bodyCredientail = {
    data: data,
  };
  return fetch(`${BASE_URL}addSongToPlaylist.php`, {
    method: "POST",
    body: JSON.stringify(bodyCredientail),
  })
    .then((respone) => respone.json())
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));
};

export default addSongToPlaylist;
