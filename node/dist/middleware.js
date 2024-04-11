"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUserInfo = void 0;
const Jwt_1 = __importDefault(require("./helpers/Jwt"));
// Implement this properly
const loadUserInfo = (req, res, next) => {
    const auth = req.get("Authorization");
    if (!auth)
        return next();
    const tokenArr = auth.split(" ");
    if (tokenArr.length != 2)
        return next();
    const jwtPair = JSON.parse(decodeURIComponent(tokenArr[1]));
    Jwt_1.default.verify(jwtPair.jwtAccess, (userInfo, isExpired) => {
        if (!req["locals"])
            req["locals"] = {};
        req["locals"].userInfo = userInfo;
        if (isExpired) {
            Jwt_1.default.verify_refresh(jwtPair.jwtRefresh, (userInfo) => {
                delete userInfo.iat;
                const tokens = Jwt_1.default.get_cookie_tokens(userInfo);
                req["locals"].userInfo = userInfo;
            });
        }
    });
    next();
};
exports.loadUserInfo = loadUserInfo;
//# sourceMappingURL=middleware.js.map