import { DataSource } from "typeorm";
export const AppDataSource= new DataSource({
    type:"postgres",
    host:"localhost",
    username:"postgres",
    password:"123456",
    database:"Hospital-Management",
    synchronize:true,
    entities:["src/Entities/**/*.ts"],
    migrations:["src/Entities/migration/**/*.ts*"],
    subscribers:["src/Entities/subscriber/**/*.ts*"],
})