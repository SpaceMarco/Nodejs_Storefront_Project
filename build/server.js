"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var orders_1 = __importDefault(require("./handlers/orders"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var app = (0, express_1.default)();
// const address: string = '0.0.0.0';
var corsOptions = {
    origin: 'http://test.com',
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', function (_req, res) {
    try {
        res.send('this is the INDEX route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.get('/test-cors', (0, cors_1.default)(corsOptions), function (req, res) {
    try {
        res.json({ msg: 'this is CORS-enabled with middleware' });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
(0, orders_1.default)(app);
(0, users_1.default)(app);
(0, products_1.default)(app);
app.listen(3000, function () {
    console.log("starting app on http://localhost:".concat(3000));
});
