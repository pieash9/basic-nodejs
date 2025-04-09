const getLogin = (req, res, next) => {
  res.render("index", {
    title: "Login - Chat application",
  });
};

export const loginController = { getLogin };
