import { DataTypes } from 'sequelize';
import sequelize from './index';

// This is the junction table between users and campaigns
const CampaignDetail = sequelize.define('CampaignDetail', {
  joinDate: DataTypes.DATE,
  pilotModRollsRemain: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      isIn: [[0, 1]],
    },
  },
  mechCredRollsRemain: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      isIn: [[0, 1]],
    },
  },
});

CampaignDetail.sync();

export default CampaignDetail;
