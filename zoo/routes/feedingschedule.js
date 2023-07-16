var express = require('express');
const router = express.Router();
const sequalize = require("../models/sequelize");

const FeedingSchedule = sequalize.models.FeedingSchedule;

/**
 * @swagger
 * /feeding-schedules:
 *   post:
 *     summary: Create a new feeding schedule
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedingSchedule'
 *     responses:
 *       200:
 *         description: The created feeding schedule
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedingSchedule'
 */
router.post("/", async (req, res) => {
    const newFeedingSchedule = await FeedingSchedule.create(req.body);
    res.json(newFeedingSchedule);
});

/**
 * @swagger
 * /feeding-schedules:
 *   get:
 *     summary: Retrieve a list of feeding schedules
 *     responses:
 *       200:
 *         description: A list of feeding schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FeedingSchedule'
 */
router.get("/", async (req, res) => {
    const feedingSchedules = await FeedingSchedule.findAll();
    res.json(feedingSchedules);
});

/**
 * @swagger
 * /feeding-schedules/{id}:
 *   get:
 *     summary: Retrieve a feeding schedule by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A feeding schedule
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedingSchedule'
 */
router.get("/:id", async (req, res) => {
    const feedingSchedule = await FeedingSchedule.findByPk(req.params.id);
    if (feedingSchedule) {
        res.json(feedingSchedule);
    } else {
        res.status(404).send("FeedingSchedule not found");
    }
});

/**
 * @swagger
 * /feeding-schedules/{id}:
 *   put:
 *     summary: Update a feeding-schedule by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedingSchedule'
 *     responses:
 *       200:
 *         description: The updated FeedingSchedule
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedingSchedule'
 */
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

/**
 * @swagger
 * /feeding-schedules/{id}:
 *   delete:
 *     summary: Delete a feeding-schedule by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted
 */
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