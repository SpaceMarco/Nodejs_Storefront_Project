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
var product_1 = require("../../product");
var user_1 = require("../../user");
var order_1 = require("../../order");
var randomstring_1 = __importDefault(require("randomstring"));
var database_1 = __importDefault(require("../../../database"));
var productStore = new product_1.ProductModel();
var userStore = new user_1.UserModel();
var orderStore = new order_1.OrderModel();
var createdUser;
var createdProduct;
var createdOrder;
var user_test = {
    first_name: 'Tarek',
    last_name: 'Hisham',
    phone: randomstring_1.default.generate({ length: 12, charset: 'numeric' }),
    password: '123',
};
var product = {
    name: 'Meat',
    price: 55,
};
var order1 = {
    status: 'active',
    usrID: '1',
    date: new Date('4/4/2022'),
};
var order_prod = {
    quantity: 2,
    order_id: '1',
    product_id: '1',
};
describe('User Model', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    sql = "\n    DELETE FROM users;\n    ALTER SEQUENCE users_id_seq RESTART WITH 1;\n    DELETE FROM products;\n    ALTER SEQUENCE products_id_seq RESTART WITH 1;\n    DELETE FROM orders;\n    ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n    ";
                    return [4 /*yield*/, conn.query(sql)];
                case 2:
                    result = _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    it('create user test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userStore.create(user_test)];
                case 1:
                    res = _a.sent();
                    expect(res.first_name).toEqual(user_test.first_name);
                    expect(res.last_name).toEqual(user_test.last_name);
                    createdUser = res;
                    order1.usrID = createdUser.id;
                    return [2 /*return*/];
            }
        });
    }); });
    it('authentication test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userStore.authenticate_hash(user_test.phone, user_test.password)];
                case 1:
                    res = (_a.sent());
                    expect(res.phone).toEqual(user_test.phone);
                    expect(res.first_name).toEqual(user_test.first_name);
                    expect(res.last_name).toEqual(user_test.last_name);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Product Model', function () {
    it('create product test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productStore.create(product)];
                case 1:
                    res = _a.sent();
                    expect(res.name).toEqual(product.name);
                    expect(res.price).toEqual(product.price);
                    createdProduct = res;
                    return [2 /*return*/];
            }
        });
    }); });
    it('show product by ID test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productStore.show(createdProduct.id)];
                case 1:
                    res = _a.sent();
                    expect(res.name).toEqual(createdProduct.name);
                    expect(res.price).toEqual(createdProduct.price);
                    return [2 /*return*/];
            }
        });
    }); });
    it('display all products test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productStore.index()];
                case 1:
                    res = _a.sent();
                    expect(res[0].name).toEqual(createdProduct.name);
                    expect(res[0].price).toEqual(createdProduct.price);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Order Model', function () {
    it('create new order test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderStore.create(order1)];
                case 1:
                    res = _a.sent();
                    expect(res.usrID).toBeDefined;
                    expect(res.status).toEqual(order1.status);
                    createdOrder = res;
                    return [2 /*return*/];
            }
        });
    }); });
    it('user orders by user_id test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderStore.show('1')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toEqual(createdOrder.status);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Add product to order test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderStore.addProduct(order_prod.quantity, order_prod.order_id, order_prod.product_id)];
                case 1:
                    res = _a.sent();
                    expect(res.orderId).toBeDefined;
                    expect(res.productId).toBeDefined;
                    expect(res.quantity).toEqual(order_prod.quantity);
                    return [2 /*return*/];
            }
        });
    }); });
    it('products added to orders test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderStore.show_orders_prod()];
                case 1:
                    res = _a.sent();
                    expect(res[0].orderId).toBeDefined;
                    expect(res[0].productId).toBeDefined;
                    expect(res[0].quantity).toEqual(order_prod.quantity);
                    return [2 /*return*/];
            }
        });
    }); });
});
