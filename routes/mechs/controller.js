import Mech from '../../models/mechs';
import Campaign from '../../models/campaigns';
import PilotMechPair from '../../models/pilotMechPairs';
import { Op } from '../../db';

export const createMech = async (req, res) => {
  try {
    const mech = await Mech.create({
      ...req.body,
    });
    res.status(201).send(mech);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not create mech.' });
  }
};

export const getAllMechs = async (req, res) => {
  try {
    const mechs = await Mech.findAll();
    res.status(200);
    res.send(mechs);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get mechs.' });
  }
};

export const getMech = async (req, res) => {
  try {
    const { id } = req.params;
    const mech = await Mech.findOne({ where: { id } });
    res.status(200);
    res.send(mech);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get mech.' });
  }
};

export const getAssignedMech = async (req, res) => {
  try {
    const { id } = req.params; // Pilot id
    // Should only be one pilotMechPair with a divorceDate of null
    const pilotmechpair = await PilotMechPair.findOne({
      where: {
        PilotId: id,
        divorceDate: {
          [Op.eq]: null,
        },
      },
    });
    const mech = await Mech.findOne({ where: { id: pilotmechpair.MechId } });
    res.status(200);
    res.send(mech);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get mech.' });
  }
};

export const assignMech = async (req, res) => {
  try {
    const { id } = req.params;
    const mechReq = req.body;
    const mech = await Mech.findOne({ where: { id: mechReq.id } });
    const campaign = await Campaign.findOne({ where: { id } });
    await campaign.addMech(mech);
    // await campaign.addMech(mech, { through: { unionDate: campaign.startDate } });
    res.status(201).send(mech);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not assign mech.' });
  }
};
