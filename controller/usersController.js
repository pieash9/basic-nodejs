const getUsers = (req, res, next) => {
  res.render("users");
};

export const usersController = { getUsers };
