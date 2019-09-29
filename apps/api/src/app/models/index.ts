import { Sequelize } from 'sequelize';

import { environment } from '../../environments/environment';

const sequelize = new Sequelize(
  environment.DATABASE,
  environment.DATABASE_USER,
  environment.DATABASE_PASSWORD,
  {
    host: environment.DATABASE_HOST,
    dialect: 'postgres'
  }
);

export default sequelize;
