var express = require('express');
const router = express.Router();
const sequalize = require("../models/sequelize");

const Animal = sequalize.models.Animal;

router.post("/", async (req, res) => {
    const newAnimal = await Animal.create(req.body);
    res.json(newAnimal);
});

router.get("/", async (req, res) => {
    const animals = await Animal.findAll();
    res.json(animals);
});

router.get("/:id", async (req, res) => {
    const animal = await Animal.findByPk(req.params.id);
    if (animal) {
        res.json(animal);
    } else {
        res.status(404).send("Animal not found");
    }
});

router.put("/:id", async (req, res) => {
    const updated = await Animal.update(req.body, {
        where: { id: req.params.id },
    });
    if (updated) {
        res.status(200).send("Animal updated");
    } else {
        res.status(404).send("Animal not found");
    }
});

router.delete("/:id", async (req, res) => {
    const deleted = await Animal.destroy({
        where: { id: req.params.id },
    });
    if (deleted) {
        res.status(200).send("Animal deleted");
    } else {
        res.status(404).send("Animal not found");
    }
});

module.exports = router;