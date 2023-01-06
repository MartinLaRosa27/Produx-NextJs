import axios from "axios";

module.exports.auth = async (token) => {
  let userRegistered = false;
  await axios
    .put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/decode-token`, {
      authorization: token,
    })
    .then(() => {
        userRegistered = true;
    })
    .catch(() => {});
  return userRegistered;
};
