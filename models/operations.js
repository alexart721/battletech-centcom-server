import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const Operation = sequelize.define('Operation', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  objectives: DataTypes.ARRAY(DataTypes.STRING),
  startDate: DataTypes.STRING,
  endDate: DataTypes.STRING,
});

Operation.sync();

export default Operation;
