"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app_datasource = void 0;
const typeorm_1 = require("typeorm");
exports.app_datasource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 8889,
    username: "root",
    password: "root",
    database: "json-01",
    entities: [],
    synchronize: true,
    logging: true,
});
