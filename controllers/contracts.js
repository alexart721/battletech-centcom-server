const Contract = require('../models/contracts');
const Campaign = require('../models/campaigns');
const { Op } = require('../models');

const getContract = async (req, res) => {
  try {
    const { id } = req.params; // Contract id
    const contract = await Contract.findOne({ where: { id: id } });
    res.status(200);
    res.send(contract);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get contract.' });
  }
}

const getCampaignCurrentContract = async (req, res) => {
  try {
    const { id } = req.params; // Campaign id
    const campaign = await Campaign.findOne({ where: { id: id } });
    // Sould only be one contract with null endDate at a time
    const contract = await campaign.getContracts({
      where: {
        endDate: {
          [Op.eq]: null
        }
      }
    });
    res.status(200);
    // Returns array of contracts, but there should only be one
    res.send(contract[0]);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get current contract.' });
  }
}

const getCampaignPastContracts = async (req, res) => {
  try {
    const { id } = req.params; // Campaign id
    const campaign = await Campaign.findOne({ where: { id: id } });
    const contracts = await campaign.getContracts({
      where: {
        endDate: {
          [Op.ne]: null
        }
      }
    });
    res.status(200);
    res.send(contracts);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get past contracts.' });
  }
}

const createContract = async (req, res) => {
  try {
    const { id } = req.params; // Campaign id
    const campaign = await Campaign.findOne({ where: { id: id } });
    const { name, objectives, startDate } = req.body;
    const newContract = { name, objectives, startDate };
    const contract = await Contract.create({
      ...newContract
    });
    await campaign.addContract(contract);
    res.status(201).send(contract);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not create contract.' });
  }
}

const updateContract = async (req, res) => {
  try {
    const { id } = req.params; // Contract id
    const contract = await Contract.findOne({ where: { id: id } });
    const { name, objectives, startDate, endDate } = req.body;
    console.log('req.body: ', req.body);
    contract.name = name;
    contract.objectives = objectives;
    contract.startDate = startDate;
    if (endDate) contract.endDate = endDate;
    await contract.save();
    res.status(200).send(contract);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not update contract.' });
  }
}

module.exports = {
  getContract,
  getCampaignCurrentContract,
  getCampaignPastContracts,
  createContract,
  updateContract
}