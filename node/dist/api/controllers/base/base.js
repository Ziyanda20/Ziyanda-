"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    resWrap;
    constructor(resWrap) {
        this.resWrap = resWrap;
        this.resWrap = resWrap;
    }
    wrap = (serviceMethod) => (req, res) => {
        this.resWrap(async (response) => {
            return await serviceMethod.call(response, req.body);
        }, res);
    };
    wrapWithUser = (serviceMethod) => (req, res) => {
        this.resWrap(async (response) => {
            return await serviceMethod.call(response, req.body, req["locals"]?.userInfo);
        }, res);
    };
}
exports.default = BaseController;
//# sourceMappingURL=base.js.map