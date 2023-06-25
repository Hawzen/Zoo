var express = require('express');
const router = express.Router();
const sequalize = require("../models/sequelize");

const Enclosure = sequalize.models.Enclosure;

router.post("/", async (req, res) => {
    const newEnclosure = await Enclosure.create(req.body);
    res.json(newEnclosure);
});

router.get("/", async (req, res) => {
    const enclosures = await Enclosure.findAll();
    res.json(enclosures);
});

router.get("/:id", async (req, res) => {
    const enclosure = await Enclosure.findByPk(req.params.id);
    if (enclosure) {
        res.json(enclosure);
    } else {
        res.status(404).send("Enclosure not found");
    }
});

router.put("/:id", async (req, res) => {
    const updated = await Enclosure.update(req.body, {
        where: { id: req.params.id },
    });
    if (updated) {
        res.status(200).send("Enclosure updated");
    } else {
        res.status(404).send("Enclosure not found");
    }
});

router.delete("/:id", async (req, res) => {
    const deleted = await Enclosure.destroy({
        where: { id: req.params.id },
    });
    if (deleted) {
        res.status(200).send("Enclosure deleted");
    } else {
        res.status(404).send("Enclosure not found");
    }
});


module.exports = router;