import { DataTypes } from 'sequelize';
import { sequelize } from './index';

// This is the junction table between pilots and mechs
const PilotMechPair = sequelize.define('PilotMechPair', {
  unionDate: DataTypes.DATE,
  divorceDate: DataTypes.DATE,
});

PilotMechPair.sync();

export default PilotMechPair;
