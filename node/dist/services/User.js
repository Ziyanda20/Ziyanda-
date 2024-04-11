"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePassword = exports.saveSession = void 0;
const Jwt_1 = __importDefault(require("../helpers/Jwt"));
function saveSession(user) {
    const tokens = Jwt_1.default.get_cookie_tokens(user);
    // pharma ression
    this.set_cookie("_pharma_sesh", JSON.stringify(tokens));
}
exports.saveSession = saveSession;
function removePassword(user) {
    delete user.password;
    return user;
}
exports.removePassword = removePassword;
async function getUserSession(_, user) {
    this.user = user;
    return this;
}
exports.default = { getUserSession };
//# sourceMappingURL=User.js.map