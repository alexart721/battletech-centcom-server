import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const Turn = sequelize.define('Turn', {
  turnNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Duration of a turn in seconds
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
  },
});

Turn.sync();

export default Turn;
