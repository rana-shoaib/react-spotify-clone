import BASE_URL from "../helpers/baseUrl";

const signup = (data) => {
  let bodyCredientail = {
    signupData: data,
  };
  return fetch(`${BASE_URL}signup.php`, {
    method: "POST",
    body: JSON.stringify(bodyCredientail),
  })
    .then((respone) => respone.json())
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));
};

export default signup;
