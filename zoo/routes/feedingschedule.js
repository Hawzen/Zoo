var express = require('express');
const router = express.Router();
const sequalize = require("../models/sequelize");

const FeedingSchedule = sequalize.models.FeedingSchedule;

router.post("/", async (req, res) => {
    const newFeedingSchedule = await FeedingSchedule.create(req.body);
    res.json(newFeedingSchedule);
});

router.get("/", async (req, res) => {
    const feedingSchedules = await FeedingSchedule.findAll();
    res.json(feedingSchedules);
});

router.get("/:id", async (req, res) => {
    const feedingSchedule = await FeedingSchedule.findByPk(req.params.id);
    if (feedingSchedule) {
        res.json(feedingSchedule);
    } else {
        res.status(404).send("FeedingSchedule not found");
    }
});

router.put("/:id", async (req, res) => {
    const updated = await FeedingSchedule.update(req.body, {
        where: { id: req.params.id },
    });
    if (updated) {
        res.status(200).send("FeedingSchedule updated");
    } else {
        res.status(404).send("FeedingSchedule not found");
    }
});

router.delete("/:id", async (req, res) => {
    const deleted = await FeedingSchedule.destroy({
        where: { id: req.params.id },
    });
    if (deleted) {
        res.status(200).send("FeedingSchedule deleted");
    } else {
        res.status(404).send("FeedingSchedule not found");
    }
});


module.exports = router;