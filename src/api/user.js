import instance from "./request";

/* login */
export const Login = (req) => {
  return instance({
    url: "/login",
    method: "POST",
    data: req,
  });
};

/* getUserInfo */
export const UserInfo = (req) => {
  return instance({
    url: "/getInfo",
    method: "POST",
    data: req,
  });
};

export default { Login, UserInfo };
