var express = require('express');
const router = express.Router();
const sequalize = require("../models/sequelize");

const Caretaker = sequalize.models.Caretaker;


/**
 * @swagger
 * /caretakers:
 *   post:
 *     summary: Create a new caretaker
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caretaker'
 *     responses:
 *       200:
 *         description: The created caretaker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caretaker'
 */
router.post("/", async (req, res) => {
    const newCaretaker = await Caretaker.create(req.body);
    res.json(newCaretaker);
});

/**
 * @swagger
 * /caretakers:
 *   get:
 *     summary: Retrieve a list of caretakers
 *     responses:
 *       200:
 *         description: A list of caretakers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caretaker'
 */
router.get("/", async (req, res) => {
    const caretakers = await Caretaker.findAll();
    res.json(caretakers);
});

/**
 * @openapi
 * /caretakers/{id}: 
 *   get:
 *     summary: Get a caretaker by ID
 *     description: Returns a single caretaker
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the caretaker to return
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: A single caretaker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caretaker'
 */
router.get("/:id", async (req, res) => {
    const caretaker = await Caretaker.findByPk(req.params.id);
    if (caretaker) {
        res.json(caretaker);
    } else {
        res.status(404).send("Caretaker not found");
    }
});

/**
 * @swagger
 * /caretakers/{id}:
 *   put:
 *     summary: Update a caretaker
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
 *             $ref: '#/components/schemas/Caretaker'
 *     responses:
 *       200:
 *         description: The updated caretaker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caretaker'
 */
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

/**
 * @swagger
 * /caretakers/{id}:
 *   delete:
 *     summary: Delete a caretaker
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted caretaker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caretaker'
 */
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