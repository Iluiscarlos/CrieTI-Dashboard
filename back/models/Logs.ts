import { DataTypes, Model } from 'sequelize';
import db from '../db';

class Logs extends Model { };

Logs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  sequelize: db,
  tableName: 'logs',
  modelName: 'Logs'
});

export default Logs;