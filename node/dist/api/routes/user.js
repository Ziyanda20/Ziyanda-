"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const User_1 = __importDefault(require("../../services/User"));
exports.default = (app) => {
    app.post("/user/get/by/session", base_1.default.wrapWithUser(User_1.default.getUserSession));
    app.post("/logout", (req, res, next) => {
        res.clearCookie('_pharma_sesh');
        res.json({
            successful: true
        });
    });
};
//# sourceMappingURL=user.js.map