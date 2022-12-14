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
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var authorizer_1 = __importDefault(require("../middlewares/authorizer"));
dotenv_1.default.config();
var store = new user_1.UserModel();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                users = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: users }, process.env.TOKEN_SECRET);
                res.json(token);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(404);
                res.json({ error: "Couldn't find any records, ERROR: ".concat(err_1) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.show(req.body.id)];
            case 1:
                user = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: user }, process.env.TOKEN_SECRET);
                res.json(token);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(404);
                res.json({ error: "enter a correct phone and password, ERROR: ".concat(err_2) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newuser, token, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password: req.body.password,
                    phone: req.body.phone,
                };
                return [4 /*yield*/, store.create(user)];
            case 1:
                newuser = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: newuser }, process.env.TOKEN_SECRET);
                res.json(token);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400);
                res.json({ error: "enter correct user data, ERROR: ".concat(err_3) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted, token, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.delete(req.body.id)];
            case 1:
                deleted = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: deleted }, process.env.TOKEN_SECRET);
                res.json(token);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(406);
                res.json({ error: "couldn't delete user, ERROR: ".concat(err_4) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.authenticate_hash(req.body.phone, req.body.password)];
            case 1:
                user = (_a.sent());
                token = jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET);
                res.json(token);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(401);
                res.json({ error: 'enter a correct phone and password' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var users_routes = function (app) {
    app.get('/users', authorizer_1.default, index);
    app.post('/authenticate', authenticate);
    app.get('/users/:id', authorizer_1.default, show);
    app.post('/users', create);
    app.delete('/users', authorizer_1.default, destroy);
};
exports.default = users_routes;
