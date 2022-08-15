"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.storefrontUser = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var salt = process.env.SALT_ROUNDS;
var pepper = process.env.BCRYPT_PASSWORD;
var storefrontUser = /** @class */ (function () {
    function storefrontUser() {
    }
    storefrontUser.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Cannot get users ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    storefrontUser.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users WHERE id = ($1)';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Cannot get user ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    storefrontUser.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, hash, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log('the create beginning');
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        console.log('before sql');
                        sql = 'INSERT INTO users (first_name,last_name,user_name,password) VALUES($1, $2, $3, $4) RETURNING *';
                        console.log('after sql and before hashsync');
                        hash = bcrypt_1["default"].hashSync(user.password + pepper, parseInt(salt));
                        console.log('after hashsync');
                        console.log('hash is ' + hash);
                        return [4 /*yield*/, conn.query(sql, [user.first_name, user.last_name, user.user_name, hash])];
                    case 2:
                        result = _a.sent();
                        console.log('after result');
                        console.log(result);
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Cannot create user ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    storefrontUser.prototype.update = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, hash, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'UPDATE users SET first_name = ($1), last_name = ($2), user_name = ($3), password = ($4) WHERE id = ($5) RETURNING *';
                        hash = bcrypt_1["default"].hashSync("".concat(user.password).concat(pepper), parseInt(salt));
                        return [4 /*yield*/, conn.query(sql, [user.first_name, user.last_name, user.user_name, hash, id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Cannot update user ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    storefrontUser.prototype["delete"] = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'DELETE FROM users WHERE id = ($1)';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Cannot delete user ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    storefrontUser.prototype.authenticate = function (user_name, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, retunedPass, isPasswordValid, sql_1, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT password FROM users WHERE user_name=($1)';
                        return [4 /*yield*/, conn.query(sql, [user_name])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        console.log("i am in the if statment");
                        retunedPass = result.rows[0];
                        console.log("hashpassword is " + JSON.stringify(retunedPass));
                        console.log("password is " + password);
                        console.log("password + pepper is " + password + pepper);
                        console.log("retunedPass.password is " + retunedPass.password);
                        isPasswordValid = bcrypt_1["default"].compareSync(password + pepper, retunedPass.password);
                        console.log(isPasswordValid);
                        if (!isPasswordValid) return [3 /*break*/, 4];
                        console.log("i am in the second if statment");
                        sql_1 = 'SELECT id, first_name, last_name, password FROM users WHERE user_name =($1)';
                        return [4 /*yield*/, conn.query(sql_1, [user_name])];
                    case 3:
                        user = _a.sent();
                        return [2 /*return*/, user.rows[0]];
                    case 4:
                        conn.release();
                        return [2 /*return*/, null];
                    case 5:
                        error_1 = _a.sent();
                        throw new Error("cannot authenticate the user ".concat(error_1));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return storefrontUser;
}());
exports.storefrontUser = storefrontUser;
