module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).json({ errorMessage: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    console.error("ERROR", req.method, req.path, err);
    //gets the error from JWT and returns it in JSON form
    const errorCode = err.status ? err.status : 500
    const message = err.inner?.message ? err.inner.message : "Internal server error. Check the server console"

    if (!res.headersSent) {
      res
        .status(errorCode)
        .json({
          message,
        });
    }
  });
};
