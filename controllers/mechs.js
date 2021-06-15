const Mech = require('../models/mechs');
const Campaign = require('../models/campaigns');

const createMech = async (req, res) => {
  try {
    const mech = await Mech.create({
      ...req.body
    });
    res.status(201).send(mech);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not create mech.' });
  }
}

const getAllMechs = async (req, res) => {
  try {
    const mechs = await Mech.findAll();
    res.status(200);
    res.send(mechs);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get mechs.' });
  }
}

const assignMech = async (req, res) => {
  try {
    console.log('Here');
    const { id } = req.params;
    const mech = req.body;
    const campaign = await Campaign.findOne({ where: { id: id } });
    console.log(campaign);
    await campaign.addMech(mech, { through: { unionDate: campaign.startDate } });
    res.status(201).send(mech);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not assign mech.' });
  }
}

module.exports = {
  createMech,
  getAllMechs,
  assignMech
}