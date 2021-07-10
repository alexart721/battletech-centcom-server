import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const Contract = sequelize.define('Contract', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  objectives: DataTypes.ARRAY(DataTypes.STRING),
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
});

Contract.sync();

export default Contract;
