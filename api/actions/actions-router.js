// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Model = require("./actions-model");
const { validateID, validateBody } = require("./actions-middlware");

//Get action
router.get("/", (req, res) => {
  Model.get()
    .then((arr) => {
      res.status(200).json(arr);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "There was an error getting arr" });
    });
});
//Get Id
router.get("/:id", validateID, (req, res) => {
  const id = req.id;
  Model.get(id)
    .then((arr) => {
      if (arr) {
        res.status(200).json(arr);
      } else {
        res.status(404).json({ message: "No id was found to match" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "There was an error getting this data" });
    });
});

//Posting
router.post("/", validateBody, (req, res) => {
  const body = req.body;

  Model.insert(body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "There was an error posting new data" });
    });
});

//Delete ID
router.delete("/:id", validateID, (req, res) => {
  const id = req.id;
  Model.remove(id)
    .then((deletion) => {
      res.status(204).json(deletion);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was an error deleting this data" });
    });
});

//PUT ID

router.put("/:id", validateID, validateBody, (req, res) => {
  const id = req.id;
  const update = req.body;

  Model.update(id, update)
    .then((updates) => {
      res.status(200).json(updates);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "There was an error updating this put request" });
    });
});

module.exports = router;
