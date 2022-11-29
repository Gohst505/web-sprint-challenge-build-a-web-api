// add middlewares here related to projects
function validateProjectID(req, res, next) {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "ID not found" });
  } else {
    req.id = id;
    next();
  }
}

function validateProjectsBody(req, res, next) {
  const body = req.body;
  console.log(req, body);
  if (!body.name || !body.description || body.completed === undefined) {
    res.status(400).json({
      message:
        "The request body needs a name, description and completed status",
    });
  } else {
    next();
  }
}

module.exports = {
  validateProjectID,
  validateProjectsBody,
};
