var express = require('express');
const router = express.Router();
const sequalize = require("../models/sequelize");

const Animal = sequalize.models.Animal;

/**
 * @swagger
 * /animals:
 *   post:
 *     summary: Create a new animal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       200:
 *         description: The created animal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 */
router.post("/", async (req, res) => {
    const newAnimal = await Animal.create(req.body);
    res.json(newAnimal);
});

/**
 * @swagger
 * /animals:
 *   get:
 *     summary: Retrieve a list of animals
 *     responses:
 *       200:
 *         description: A list of animals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 */
router.get("/", async (req, res) => {
    const animals = await Animal.findAll();
    res.json(animals);
});

/**
 * @swagger
 * /animals/{id}:
 *   get:
 *     summary: Retrieve an animal by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: An animal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 */
router.get("/:id", async (req, res) => {
    const animal = await Animal.findByPk(req.params.id);
    if (animal) {
        res.json(animal);
    } else {
        res.status(404).send("Animal not found");
    }
});

/**
 * @swagger
 * /animals/{id}:
 *   put:
 *     summary: Update an animal by its ID
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
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       200:
 *         description: The updated animal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 */
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

/**
 * @swagger
 * /animals/{id}:
 *   delete:
 *     summary: Delete an animal by its ID
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