import app from '/app';

import { sequelize } from '/models';

export async function setup(){
    await sequelize.sync({force: true});
}