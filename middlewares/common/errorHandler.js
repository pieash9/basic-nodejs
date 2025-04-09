import createHttpError from "http-errors";

export const notFoundHandler = (req, res, next) => {
  next(createHttpError(404, "Your request content was not found"));
};

// default error handler
export const errorHandler = (err, req, res, next) => {
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(err.status || 500);

  if (res.locals.html) {
    res.render("error", {
      title: "Error page",
    });
  } else {
    res.json(res.locals.error);
  }
};
