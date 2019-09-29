import { DataTypes, Model } from 'sequelize';

import sequelize from './';
import { IPark } from '@national-parks/api-interfaces';

class Park extends Model implements IPark {
  public id: number;
  public name: string;
  public type: string;
  public location: string;
}

Park.init({
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: new DataTypes.CHAR(100),
    allowNull: true
  },
  type: {
    type: new DataTypes.CHAR(50),
    allowNull: true
  },
  location: {
    type: new DataTypes.CHAR(50),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'parks',
  timestamps: false
});

export default Park;
