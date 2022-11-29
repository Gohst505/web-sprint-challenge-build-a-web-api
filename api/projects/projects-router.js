// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Model = require("./projects-model");
const {
  validateProjectID,
  validateProjectsBody,
} = require("./projects-middleware");

//GET returns array
router.get("/", (req, res) => {
  Model.get()
    .then((arr) => {
      res.status(200).json(arr);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was an error in the root Get for Projects" });
    });
});

//GET ID
router.get("/:id", validateProjectID, (req, res) => {
  const id = req.id;
  Model.get(id)
    .then((arr) => {
      if (arr) {
        res.status(200).json(arr);
      } else {
        res.status(404).json({ message: "This ID does not exist" });
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was an error getting one or more projects" });
    });
});

//Post
router.post("/", validateProjectsBody, (req, res) => {
  const body = req.body;
  Model.insert(body)
    .then((createPost) => {
      res.status(201).json(createPost);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was an error posting the new project" });
    });
});

//Delete
router.delete("/:id", validateProjectID, (req, res) => {
  const id = req.id;

  Model.remove(id)
    .then((deletion) => {
      if (!deletion) {
        res.status(404).json({ message: "The id was not found" });
      } else {
        res
          .status(204)
          .json({ message: "The project was successfully deleted" });
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was an error deleting this post" });
    });
});

//Put
router.put("/:id", validateProjectID, validateProjectsBody, (req, res) => {
  const id = req.id;
  const updates = req.body;
  Model.update(id, updates)
    .then((update) => {
      res.status(200).json(update);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was an error updating your post" });
    });
});

router.get("/:id/actions", (req, res) => {
  const id = req.params.id;

  Model.getProjectActions(id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was an error getting this projects actions" });
    });
});

module.exports = router;
