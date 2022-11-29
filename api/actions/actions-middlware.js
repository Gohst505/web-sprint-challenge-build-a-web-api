// add middlewares here related to actions
function validateID(req, res, next) {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "No ID found" });
  } else {
    req.id = id;
    next();
  }
}

//Get rid of the else when done and see if you can just do areturn if and change messages in both functions
function validateBody(req, res, next) {
  const body = req.body;
  if (!body.notes || !body.description || !body.project_id) {
    res
      .status(400)
      .json({
        message: "This action requires a notes, descriptions, and project_id",
      });
  } else {
    next();
  }
}

module.exports = {
  validateID,
  validateBody,
};
