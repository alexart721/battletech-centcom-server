import { DataTypes } from 'sequelize';
import { sequelize } from './index';

// This is the junction table between mechs and turns
const TurnDetail = sequelize.define('TurnDetail', {
  mechOverheat: DataTypes.INTEGER,
  mechOverheatShutdown: DataTypes.INTEGER,
  mechDamageArmor: DataTypes.INTEGER,
  mechDamageStructure: DataTypes.INTEGER,
  pilotEdge: DataTypes.INTEGER,
});

TurnDetail.sync();

export default TurnDetail;
