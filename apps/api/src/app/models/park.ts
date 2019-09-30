import { DataTypes, Model } from 'sequelize';

import sequelize from './';
import { IPark, IParkType } from '@national-parks/api-interfaces';
import ParkType from './park-type';

class Park extends Model implements IPark {
  public id: number;
  public name: string;
  public type: string;
  public location: string;
  public park_type: IParkType
}

Park.init({
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true
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

Park.hasOne(ParkType, { foreignKey: 'term', sourceKey: 'type' });

export default Park;
