const Sequelize = require("sequelize");

// DO NOT USE THESE VALUES IN PRODUCTION, OR THE ROOT USER FOR THAT MATTER
const DATABASE_NAME = "zoo";
const DATABASE_USERNAME = "root";
const DATABASE_PASSWORD = "tea";
const DATABASE_HOST = "mysql.default.svc.cluster.local";

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: "mysql"
});


// Tables!
const Animal = sequelize.define("Animal", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  species: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  temperament: {
    type: Sequelize.ENUM("friendly", "aggressive", "shy", "curious"),
    defaultValue: "friendly",
  },
});


const Enclosure = sequelize.define("Enclosure", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  environment: {
    type: Sequelize.ENUM("tropical", "desert", "arctic", "temperate"),
    allowNull: false
  },
  humidity: {
    type: Sequelize.ENUM("low", "medium", "high"),
    allowNull: false
  },
  terrain: {
    type: Sequelize.ENUM("forest", "savanna", "mountain", "ocean"),
    allowNull: false
  },
  capacity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isOpen: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});


const Caretaker = sequelize.define("Caretaker", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM("keeper", "vet", "manager", "guide"),
    defaultValue: "keeper",
  },
});
  

const FeedingSchedule = sequelize.define("FeedingSchedule", {
  startTime: {
    type: Sequelize.TIME,
    allowNull: false
  },
  endTime: {
    type: Sequelize.TIME,
    allowNull: false
  },
  foodType: {
    type: Sequelize.ENUM("carnivore", "herbivore", "omnivore"),
    allowNull: false
  },
});



async function addSampleData() {
  // Add Enclosures
  const tropicalEnclosure = await Enclosure.create({
    name: 'Tropical Rainforest',
    environment: 'tropical',
    humidity: 'high',
    terrain: 'forest',
    capacity: 10
  });

  const arcticEnclosure = await Enclosure.create({
    name: 'Arctic Tundra',
    environment: 'arctic',
    humidity: 'low',
    terrain: 'mountain',
    capacity: 5
  });

  // Add Caretakers
  const john = await Caretaker.create({
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '123-456-7890',
    email: 'john.doe@example.com',
    role: 'keeper'
  });

  const jane = await Caretaker.create({
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '987-654-3210',
    email: 'jane.smith@example.com',
    role: 'vet'
  });

  // Add Animals
  const tiger = await Animal.create({
    name: 'Tiger',
    species: 'Panthera tigris',
    age: 5,
    imageUrl: 'https://example.com/tiger.jpg',
    temperament: 'aggressive',
    EnclosureId: tropicalEnclosure.id,
    CaretakerId: john.id
  });

  const polarBear = await Animal.create({
    name: 'Polar Bear',
    species: 'Ursus maritimus',
    age: 8,
    imageUrl: 'https://example.com/polar-bear.jpg',
    temperament: 'curious',
    EnclosureId: arcticEnclosure.id,
    CaretakerId: jane.id
  });

  // Add Feeding Schedules
  const tigerFeeding = await FeedingSchedule.create({
    startTime: '08:00',
    endTime: '09:00',
    foodType: 'carnivore',
    AnimalId: tiger.id
  });

  const polarBearFeeding = await FeedingSchedule.create({
    startTime: '14:00',
    endTime: '15:00',
    foodType: 'carnivore',
    AnimalId: polarBear.id
  });
}


sequelize.sync({ force: true }) // force: true will drop the table if it already exists
  .then(() => {
    console.log('Tables created successfully!');
    return addSampleData();
  })
  .catch((error) => {
    console.error('Unable to create tables:', error);
  });

module.exports = sequelize;