import Pilot from '../../models/pilots';
import Mech from '../../models/mechs';
import Campaign from '../../models/campaigns';

export const createPilot = async (req, res) => {
  try {
    const pilot = await Pilot.create({
      ...req.body,
    });
    res.status(201).send(pilot);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not create pilot.' });
  }
};

export const getAllPilots = async (req, res) => {
  try {
    const pilots = await Pilot.findAll();
    res.status(200);
    res.send(pilots);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get pilots.' });
  }
};

export const getPilot = async (req, res) => {
  try {
    const { id } = req.params;
    const pilot = await Pilot.findOne({ where: { id } });
    res.status(200);
    res.send(pilot);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get pilot.' });
  }
};

export const getAssignedPilot = async (req, res) => {
  try {
    const { id } = req.params; // Campaign id
    const campaign = await Campaign.findOne({ where: { id } });
    const pilot = await campaign.getPilots({ where: { CampaignId: id } });
    // Returns array of pilots, but there will only be one
    res.status(200);
    res.send(pilot[0]);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get pilot.' });
  }
};

export const assignPilot = async (req, res) => {
  try {
    const { cid, mid } = req.params;
    const pilotReq = req.body;
    const pilot = await Pilot.findOne({ where: { id: pilotReq.id } });
    const mech = await Mech.findOne({ where: { id: mid } });
    const campaign = await Campaign.findOne({ where: { id: cid } });
    await campaign.addPilot(pilot);
    await mech.addPilot(pilot, { through: { unionDate: campaign.startDate } });
    res.status(201).send(pilot);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not assign mech.' });
  }
};
