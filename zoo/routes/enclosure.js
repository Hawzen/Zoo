var express = require('express');
const router = express.Router();
const sequalize = require("../models/sequelize");

const Enclosure = sequalize.models.Enclosure;

/**
 * @swagger
 * /enclosures:
 *   post:
 *     summary: Create a new enclosure
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enclosure'
 *     responses:
 *       200:
 *         description: The created enclosure
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enclosure'
 */
router.post("/", async (req, res) => {
    const newEnclosure = await Enclosure.create(req.body);
    res.json(newEnclosure);
});

/**
 * @swagger
 * /enclosures:
 *   get:
 *     summary: Retrieve a list of enclosures
 *     responses:
 *       200:
 *         description: A list of enclosures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Enclosure'
 */
router.get("/", async (req, res) => {
    const enclosures = await Enclosure.findAll();
    res.json(enclosures);
});

/**
 * @swagger
 * /enclosures/{id}:
 *   get:
 *     summary: Retrieve an enclosure by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: An enclosure
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enclosure'
 */
router.get("/:id", async (req, res) => {
    const enclosure = await Enclosure.findByPk(req.params.id);
    if (enclosure) {
        res.json(enclosure);
    } else {
        res.status(404).send("Enclosure not found");
    }
});

/**
 * @swagger
 * /enclosures/{id}:
 *   put:
 *     summary: Update an enclosure by its ID
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
 *             $ref: '#/components/schemas/Enclosure'
 *     responses:
 *       200:
 *         description: The updated enclosure
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enclosure'
 */
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

/**
 * @swagger
 * /enclosures/{id}:
 *   delete:
 *     summary: Delete an enclosure by its ID
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