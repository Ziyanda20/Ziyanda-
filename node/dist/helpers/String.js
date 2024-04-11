"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMongoID = exports.cleanHTMLEntities = exports.makeId = void 0;
const database_1 = require("../config/database");
const makeId = (length) => {
    var string = '';
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
    var charLength = chars.length;
    for (var i = 0; i < length; i++) {
        string += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return string;
};
exports.makeId = makeId;
const cleanHTMLEntities = (text) => {
    if (!text || text == '' || typeof text != 'string')
        return text;
    // Replace < and > with their HTML entity equivalents
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // You can add more sanitization rules as needed
    // For example, removing JavaScript event attributes:
    text = text.replace(/on\w+="[^"]*"/g, '');
    return text;
};
exports.cleanHTMLEntities = cleanHTMLEntities;
const isMongoID = (id) => id && id.length == database_1.MONGO_ID_LEN;
exports.isMongoID = isMongoID;
//# sourceMappingURL=String.js.map