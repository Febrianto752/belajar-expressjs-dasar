export const logger = (req, res, next) => {
  console.log(`Receive request : ${req.method} ${req.originalUrl}`);
  next();
};

export const addPoweredHeader = (req, res, next) => {
  res.set("X-Powered-By", "Febrianto");
  next();
};

export const checkApiKey = (req, res, next) => {
  if (req.query.apiKey) {
    return next();
  } else {
    return res.status(403).json({ message: "you dont have permission" });
  }
};
