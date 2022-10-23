"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.token = void 0;
var supertest_1 = __importDefault(require("supertest"));
var randomstring_1 = __importDefault(require("randomstring"));
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var server_1 = __importDefault(require("../../server"));
var user_1 = require("../user");
var request = (0, supertest_1.default)(server_1.default);
var userStore = new user_1.UserModel();
var createduser;
var user1 = {
    first_name: 'Ali',
    last_name: 'Omar',
    phone: randomstring_1.default.generate({ length: 12, charset: 'numeric' }),
    password: '123',
};
var user2 = {
    first_name: 'Tarek',
    last_name: 'Hisham',
    phone: randomstring_1.default.generate({ length: 12, charset: 'numeric' }),
    password: '123',
};
var jsonHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};
describe('testing user model routes: ', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userStore.create(user1)];
                case 1:
                    createduser = (_a.sent());
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing the main/index route', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, request.get('/')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    throw err_1;
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it('testing to create users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/users').send(user2)];
                case 1:
                    res = _a.sent();
                    exports.token = res.body;
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing to show users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/users')
                        .set(__assign(__assign({}, jsonHeaders), { Authorization: 'Bearer ' + exports.token }))];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('authenticate the user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, decodedHeader;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post('/authenticate')
                        .set(jsonHeaders)
                        .send({ phone: user1.phone, password: user1.password })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    decodedHeader = (0, jwt_decode_1.default)('Bearer ' + res.body);
                    // spyOn(console, 'log').and.callThrough();
                    // console.log(res.body);
                    // console.log('this is it: \n', decodedHeader.first_name);
                    expect(decodedHeader.first_name).toEqual(user1.first_name);
                    expect(decodedHeader.last_name).toEqual(user1.last_name);
                    expect(decodedHeader.phone).toEqual(user1.phone);
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing to delete user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete('/users')
                        .set(__assign(__assign({}, jsonHeaders), { Authorization: 'Bearer ' + exports.token }))
                        .send({ id: createduser.id })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
exports.default = exports.token;
