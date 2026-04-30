export const validateTask = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({ msg: "Title is required" });
  }
  next();
};