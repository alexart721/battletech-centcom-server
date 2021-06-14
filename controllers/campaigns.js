const Campaign = require('../models/campaigns');
const CampaignDetail = require('../models/campaignDetails');

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

const getCampaigns = async (req, res) => {
  try {
    const { id } = req.user;
    const campaigns = Campaign.findAll({
      where: {
        '$CampaignDetail.UserId$': id
      },
      include: {
        model: CampaignDetail
      }
    });
    res.status(200);
    res.send(campaigns);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get campaign.' });
  }
}

const createCampaign = async (req, res) => {
  const user = req.user;
  try {
    const { startDate } = req.body;
    const campaign = await Campaign.create({
      ...req.body
    });
    const result = campaign.addUser(user, { through: { joinDate: startDate } });
    console.log(result);
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
  getCampaigns,
  createCampaign,
  updateCampaign
}