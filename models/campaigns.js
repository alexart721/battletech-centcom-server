import { DataTypes } from 'sequelize';
import sequelize from './index';

const Campaign = sequelize.define('Campaign', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
});

Campaign.sync();

export default Campaign;
