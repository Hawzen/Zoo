var express = require('express');
const router = express.Router();
const sequalize = require("../models/sequelize");

const Caretaker = sequalize.models.Caretaker;

router.post("/", async (req, res) => {
    const newCaretaker = await Caretaker.create(req.body);
    res.json(newCaretaker);
});

router.get("/", async (req, res) => {
    const caretakers = await Caretaker.findAll();
    res.json(caretakers);
});

router.get("/:id", async (req, res) => {
    const caretaker = await Caretaker.findByPk(req.params.id);
    if (caretaker) {
        res.json(caretaker);
    } else {
        res.status(404).send("Caretaker not found");
    }
});

router.put("/:id", async (req, res) => {
    const updated = await Caretaker.update(req.body, {
        where: { id: req.params.id },
    });
    if (updated) {
        res.status(200).send("Caretaker updated");
    } else {
        res.status(404).send("Caretaker not found");
    }
});

router.delete("/:id", async (req, res) => {
    const deleted = await Caretaker.destroy({
        where: { id: req.params.id },
    });
    if (deleted) {
        res.status(200).send("Caretaker deleted");
    } else {
        res.status(404).send("Caretaker not found");
    }
});


module.exports = router;