import Contract from '../../models/contracts';
import Campaign from '../../models/campaigns';
import { Op } from '../../db';

export const getContract = async (req, res) => {
  try {
    const { id } = req.params; // Contract id
    const contract = await Contract.findOne({ where: { id } });
    res.status(200);
    res.send(contract);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get contract.' });
  }
};

export const getCampaignCurrentContract = async (req, res) => {
  try {
    const { id } = req.params; // Campaign id
    const campaign = await Campaign.findOne({ where: { id } });
    // Sould only be one contract with null endDate at a time
    const contract = await campaign.getContracts({
      where: {
        endDate: {
          [Op.eq]: null,
        },
      },
    });
    res.status(200);
    // Returns array of contracts, but there should only be one
    res.send(contract[0]);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get current contract.' });
  }
};

export const getCampaignPastContracts = async (req, res) => {
  try {
    const { id } = req.params; // Campaign id
    const campaign = await Campaign.findOne({ where: { id } });
    const contracts = await campaign.getContracts({
      where: {
        endDate: {
          [Op.ne]: null,
        },
      },
    });
    res.status(200);
    res.send(contracts);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get past contracts.' });
  }
};

export const createContract = async (req, res) => {
  try {
    const { id } = req.params; // Campaign id
    const campaign = await Campaign.findOne({ where: { id } });
    const { name, objectives, startDate } = req.body;
    const newContract = { name, objectives, startDate };
    const contract = await Contract.create({
      ...newContract,
    });
    await campaign.addContract(contract);
    res.status(201).send(contract);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not create contract.' });
  }
};

export const updateContract = async (req, res) => {
  try {
    const { id } = req.params; // Contract id
    const contract = await Contract.findOne({ where: { id } });
    const {
      name, objectives, startDate, endDate,
    } = req.body;
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
};
