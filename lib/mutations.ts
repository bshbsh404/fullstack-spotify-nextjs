import fetcher from "./fetcher";

export const auth = (
  mode: "login | signup",
  body: {
    name: string;
    email: string;
    password: string;
  }
) => {
  return fetcher(`/${mode}`, body);
};
