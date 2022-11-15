import { DataTypes, DateOnlyDataType, Model } from 'sequelize';
import db from '../db';


class User extends Model {
  declare id: number;
  declare name: string; 
  declare age: number;
  declare gender: string;
  declare email: string;
  declare password: string;
  
  static async localizaUsuario(email: string, password: string)
  {
    return await User.findOne({
      where: {
        email: email,
        password: password
      }
    });
  }
};

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(45),
    allowNull: false, 
  }
}, {
  sequelize: db,
  tableName: 'users',
  modelName: 'User'
});

export default User;
