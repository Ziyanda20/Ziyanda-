"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.default = (app) => {
    app.use((0, cookie_parser_1.default)());
    if (process.env.NODE_ENV == "development") {
        app.use((req, res, next) => {
            res.set({
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Allow",
                SameSite: "None",
                Secure: "",
            });
            next();
        });
    }
    app.use(/^((?!(assets)).)*$/, middleware_1.loadUserInfo);
};
//# sourceMappingURL=middleware.js.map