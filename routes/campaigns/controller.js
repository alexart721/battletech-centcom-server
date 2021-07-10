import Campaign from '../../models/campaigns';
import User from '../../models/users';
import { Op } from '../../db';

export const getCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findOne({ where: { id } });
    res.status(200);
    res.send(campaign);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get campaign.' });
  }
};

export const getAllCampaigns = async (req, res) => {
  try {
    const { user } = req;
    const dbUser = await User.findOne({ where: { id: user.id } });
    const campaigns = dbUser.getCampaigns();
    res.status(200);
    res.send(campaigns);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get campaign.' });
  }
};

export const getCurrentCampaigns = async (req, res) => {
  try {
    const { user } = req;
    const dbUser = await User.findOne({ where: { id: user.id } });
    const campaigns = await dbUser.getCampaigns({
      where: {
        endDate: {
          [Op.eq]: null,
        },
      },
    });
    res.status(200);
    res.send(campaigns);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get current campaigns.' });
  }
};

export const getPastCampaigns = async (req, res) => {
  try {
    const { user } = req;
    const dbUser = await User.findOne({ where: { id: user.id } });
    const campaigns = await dbUser.getCampaigns({
      where: {
        endDate: {
          [Op.ne]: null,
        },
      },
    });
    res.status(200);
    res.send(campaigns);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get past campaigns.' });
  }
};

export const createCampaign = async (req, res) => {
  const { user } = req;
  try {
    const { startDate } = req.body;
    const campaign = await Campaign.create({
      ...req.body,
    });
    const dbUser = await User.findOne({ where: { id: user.id } });
    await campaign.addUser(dbUser, { through: { joinDate: startDate } });
    res.status(201).send(campaign);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not create campaign.' });
  }
};

export const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findOne({ where: { id } });
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
};
