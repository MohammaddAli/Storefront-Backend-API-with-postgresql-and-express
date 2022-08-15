"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var client = new pg_1.Pool({});
var _a = process.env, POSTGTRES_HOST = _a.POSTGTRES_HOST, POSTGTRES_DB = _a.POSTGTRES_DB, POSTGTRES_TEST_DB = _a.POSTGTRES_TEST_DB, POSTGTRES_USER = _a.POSTGTRES_USER, POSTGTRES_PASSWORD = _a.POSTGTRES_PASSWORD, ENV = _a.ENV;
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: POSTGTRES_HOST,
        database: POSTGTRES_DB,
        user: POSTGTRES_USER,
        password: POSTGTRES_PASSWORD
    });
}
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: POSTGTRES_HOST,
        database: POSTGTRES_TEST_DB,
        user: POSTGTRES_USER,
        password: POSTGTRES_PASSWORD
    });
}
console.log("I am in the ".concat(ENV, " Environment"));
exports["default"] = client;
