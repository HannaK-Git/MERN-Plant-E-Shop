const ApiError = require("../error/ApiError");

module.exports = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err);

  // In development, you might want to include the error stack in the response
  const response = {
    message: err.message || "Unexpected error!",
  };

  if (process.env.NODE_ENV === "development" && err.stack) {
    response.stack = err.stack;
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json(response);
  }

  return res.status(500).json(response);
};
