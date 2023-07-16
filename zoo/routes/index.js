var express = require('express');
var router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     FeedingSchedule:
 *       type: object
 *       required:
 *         - startTime
 *         - endTime
 *         - foodType
 *       properties:
 *         startTime:
 *           type: string
 *           format: time
 *         endTime:
 *           type: string
 *           format: time
 *         foodType:
 *           type: string
 *           enum: [carnivore, herbivore, omnivore]
 *     Animal:
 *       type: object
 *       required:
 *         - name
 *         - species
 *         - age
 *       properties:
 *         name:
 *           type: string
 *         species:
 *           type: string
 *         age:
 *           type: integer
 *         imageUrl:
 *           type: string
 *         temperament:
 *           type: string
 *           enum: [friendly, aggressive, shy, curious]
 *           default: friendly
 *     Enclosure:
 *       type: object
 *       required:
 *         - name
 *         - environment
 *         - humidity
 *         - terrain
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *         environment:
 *           type: string
 *           enum: [tropical, desert, arctic, temperate]
 *         humidity:
 *           type: string
 *           enum: [low, medium, high]
 *         terrain:
 *           type: string
 *           enum: [forest, savanna, mountain, ocean]
 *         capacity:
 *           type: integer
 *         isOpen:
 *           type: boolean
 *           default: true
 *     Caretaker:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [keeper, vet, manager, guide]
 */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express pass' });
});

module.exports = router;
