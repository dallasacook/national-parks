import { DataTypes, Model } from 'sequelize';

import sequelize from './';
import { IParkType } from '@national-parks/api-interfaces';

class ParkType extends Model implements IParkType {
  public id: number;
  public term: string;
  public description: string;
}

ParkType.init({
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  term: {
    type: new DataTypes.CHAR(30),
    allowNull: true
  },
  description: {
    type: new DataTypes.CHAR(50),
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'park_type',
  modelName: 'park_type',
  timestamps: false
});

export default ParkType;
