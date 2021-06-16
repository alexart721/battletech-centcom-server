const Campaign = require('../models/campaigns');
const { Op } = require('../models');

const getCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findOne({ where: { id: id } });
    res.status(200);
    res.send(campaign);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get campaign.' });
  }
}

const getAllCampaigns = async (req, res) => {
  try {
    const user = req.user;
    const campaigns = user.getCampaigns();
    res.status(200);
    res.send(campaigns);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get campaign.' });
  }
}

const getCurrentCampaigns = async (req, res) => {
  try {
    const user = req.user;
    // For posterity you should get the user from the database
    const campaigns = await user.getCampaigns({
      where: {
        endDate: {
          [Op.eq]: null
        }
      }
    });
    console.log(campaigns);
    res.status(200);
    res.send(campaigns);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get current campaigns.' });
  }
}

const getPastCampaigns = async (req, res) => {
  try {
    const user = req.user;
    const campaigns = await user.getCampaigns({
      where: {
        endDate: {
          [Op.ne]: null
        }
      }
    });
    res.status(200);
    res.send(campaigns);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get past campaigns.' });
  }
}

const createCampaign = async (req, res) => {
  const user = req.user;
  try {
    const { startDate } = req.body;
    const campaign = await Campaign.create({
      ...req.body
    });
    await campaign.addUser(user, { through: { joinDate: startDate } });
    res.status(201).send(campaign);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not create campaign.' });
  }
}

const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findOne({ where: { id: id } });
    const { name, startDate, endDate } = req.body;
    campaign.name = name;
    campaign.startDate = startDate;
    campaign.endDate = endDate;
    await campaign.save();
    res.status(200);
    res.send(campaign);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not update user.' });
  }
}

module.exports = {
  getCampaign,
  getAllCampaigns,
  getCurrentCampaigns,
  getPastCampaigns,
  createCampaign,
  updateCampaign
}