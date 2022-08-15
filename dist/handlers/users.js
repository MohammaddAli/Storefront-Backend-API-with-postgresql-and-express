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
var users_1 = require("../models/users");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var userStore = new users_1.storefrontUser();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var headerAuthorization, token, users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    headerAuthorization = req.headers.authorization;
                    token = headerAuthorization.split(' ')[1];
                    jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
                }
                catch (error) {
                    res.status(401);
                    res.json("acces denied, INVALID TOKEN ".concat(error));
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userStore.index()];
            case 2:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400);
                res.json("INVALID TOKEN ".concat(err_1));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var headerAuthorization, token, users, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    headerAuthorization = req.headers.authorization;
                    token = headerAuthorization.split(' ')[1];
                    // console.log("headerAuthorization is " + headerAuthorization);
                    jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
                }
                catch (error) {
                    res.status(401);
                    res.json("acces denied, INVALID TOKEN ".concat(error));
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userStore.show(req.params.id)];
            case 2:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, token, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userStore.create(req.body)];
            case 1:
                users = _a.sent();
                token = jsonwebtoken_1["default"].sign({ user: users }, process.env.TOKEN_SECRET);
                // console.log('after jwt');
                res.json(token);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400);
                res.json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var headerAuthorization, token, decoded, updated, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    headerAuthorization = req.headers.authorization;
                    token = headerAuthorization.split(' ')[1];
                    decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
                    // if((decoded as jwt.JwtPayload).user_name !== req.body.user_name) {
                    //     throw new Error('User Name does not match!');
                    // }
                }
                catch (err) {
                    res.status(401);
                    res.json(err);
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userStore.update(req.params.id, req.body)];
            case 2:
                updated = _a.sent();
                res.json(updated);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(400);
                res.json(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var headerAuthorization, token, deleted, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    headerAuthorization = req.headers.authorization;
                    token = headerAuthorization.split(' ')[1];
                    jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
                }
                catch (error) {
                    res.status(401);
                    res.json("acces denied, INVALID TOKEN ".concat(error));
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userStore["delete"](req.body.id, req.body)];
            case 2:
                deleted = _a.sent();
                res.json(deleted);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(400);
                res.json(err_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var headerAuthorization, token, userAuthentication, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    headerAuthorization = req.headers.authorization;
                    console.log('before split in auth');
                    token = headerAuthorization.split(' ')[1];
                    jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
                    console.log("the token in jwt.veriftin user handlers is".concat(JSON.stringify(token)));
                }
                catch (error) {
                    res.status(401);
                    res.json("acces denied, INVALID TOKEN ".concat(error));
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userStore.authenticate(req.body.user_name, req.body.password)];
            case 2:
                userAuthentication = _a.sent();
                res.json(userAuthentication);
                console.log("the user Authentication in jwt.verift in user handlers is ".concat(JSON.stringify(userAuthentication)));
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                res.status(400);
                res.json(err_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var user_routes = function (app) {
    app.get('/user', index);
    app.get('/user/:id', show);
    app.post('/user', create);
    app.put('/updateUser/:id', update);
    app["delete"]('/deleteUser', destroy);
    app.post('/authenticate', authenticate);
};
exports["default"] = user_routes;
