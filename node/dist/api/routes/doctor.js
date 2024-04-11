"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Doctor_1 = __importDefault(require("../../services/Doctor"));
exports.default = (app) => {
    app.post("/doctor/register", base_1.default.wrap(Doctor_1.default.createDoctor));
    app.post("/doctor/login", base_1.default.wrap(Doctor_1.default.authDoctor));
};
//# sourceMappingURL=doctor.js.map