"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Doctor_1 = __importDefault(require("../models/Doctor"));
const Validation_1 = __importDefault(require("../helpers/Validation"));
const Hasher_1 = __importDefault(require("../helpers/Hasher"));
const User_1 = require("./User");
async function createDoctor(body) {
    try {
        const { fullname, email, password } = body;
        Validation_1.default.validate({
            'Full name': { value: fullname, min: 5, max: 30 },
            'email address': { value: email, min: 5, max: 50 },
            'password': { value: password, min: 8, max: 30 },
        });
        const newUser = await Doctor_1.default.insert({
            full_name: fullname,
            email: email,
            password: await Hasher_1.default.hash(password),
        });
        User_1.saveSession.call(this, (0, User_1.removePassword)(newUser.toObject()));
        this.successful = true;
    }
    catch (error) {
        throw error;
    }
    return this;
}
async function authDoctor(body) {
    try {
        const doctor = await Doctor_1.default.findOne({
            condition: { email: body.email }
        });
        if (!doctor || (doctor && !(await Hasher_1.default.isSame(doctor.password, body.password))))
            throw "Email address or password is incorrect";
        User_1.saveSession.call(this, (0, User_1.removePassword)(doctor.toObject()));
        this.successful = true;
    }
    catch (error) {
        throw error;
    }
    return this;
}
exports.default = { createDoctor, authDoctor };
//# sourceMappingURL=Doctor.js.map