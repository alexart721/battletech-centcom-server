const Mech = require('../models/mechs');
const Campaign = require('../models/campaigns');
const PilotMechPair = require('../models/pilotMechPairs');
const { Op } = require('../models');

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

const getMech = async (req, res) => {
  try {
    const { id } = req.params;
    const mech = await Mech.findOne({ where: { id: id } });
    res.status(200);
    res.send(mech);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get mech.' });
  }
}

const getAssignedMech = async (req, res) => {
  try {
    const { id } = req.params; // Pilot id
    // Should only be one pilotMechPair with a divorceDate of null
    const pilotmechpair = await PilotMechPair.findOne({
      where: {
        PilotId: id,
        divorceDate: {
          [Op.eq]: null
        }
      }
    });
    const mech = await Mech.findOne({ where: { id: pilotmechpair.MechId } });
    console.log(mech);
    res.status(200);
    res.send(mech);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error, message: 'Could not get mech.' });
  }
}

const assignMech = async (req, res) => {
  try {
    const { id } = req.params;
    const mechReq = req.body;
    const mech = await Mech.findOne({ where: { id: mechReq.id } });
    const campaign = await Campaign.findOne({ where: { id: id } });
    await campaign.addMech(mech);
    // await campaign.addMech(mech, { through: { unionDate: campaign.startDate } });
    res.status(201).send(mech);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not assign mech.' });
  }
}

module.exports = {
  createMech,
  getAllMechs,
  getMech,
  getAssignedMech,
  assignMech
}