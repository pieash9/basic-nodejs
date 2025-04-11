const getInbox = (req, res, next) => {
  res.render("inbox");
};

export const inboxController = { getInbox };
