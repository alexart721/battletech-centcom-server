import User from './users';
import Campaign from './campaigns';
import CampaignDetail from './campaignDetails';
import Pilot from './pilots';
import Mech from './mechs';
import PilotMechPair from './pilotMechPairs';
import Contract from './contracts';
import Operation from './operations';
import Turn from './turns';
import TurnDetail from './turnDetails';

const associate = () => {
  // User - Campaign associations
  User.belongsToMany(Campaign, { through: CampaignDetail });
  Campaign.belongsToMany(User, { through: CampaignDetail });

  // User - Pilot associations
  User.hasMany(Pilot);
  Pilot.belongsTo(User);

  // Campaign - Pilot associations
  Campaign.hasMany(Pilot);
  Pilot.belongsTo(Campaign);

  // Campaign - Mech associations
  Campaign.hasMany(Mech);
  Mech.belongsTo(Campaign);

  // Campaign - Contract associations
  Campaign.hasMany(Contract);
  Contract.belongsTo(Campaign);

  // Pilot - Mech associations
  Pilot.belongsToMany(Mech, { through: PilotMechPair });
  Mech.belongsToMany(Pilot, { through: PilotMechPair });

  // Mech - Turn associations
  Mech.belongsToMany(Turn, { through: TurnDetail });
  Turn.belongsToMany(Mech, { through: TurnDetail });

  // Contract - Operation assiciations
  Contract.hasMany(Operation);
  Operation.belongsTo(Contract);

  // Operation - Turn associations
  Operation.hasMany(Turn);
  Turn.belongsTo(Operation);
};

export default associate;
