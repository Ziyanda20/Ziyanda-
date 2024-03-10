import { MONGO_ID_LEN } from "../config/database"

export const makeId = (length: number) => {
    var string = '';
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
    var charLength = chars.length;

    for (var i = 0; i < length; i++) {
        string += chars.charAt(Math.floor(Math.random() * charLength));
    }

    return string;
}

export const cleanHTMLEntities = (text: string) => {
    if (!text || text == '' || typeof text != 'string') return text;

    // Replace < and > with their HTML entity equivalents
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // You can add more sanitization rules as needed
    // For example, removing JavaScript event attributes:
    text = text.replace(/on\w+="[^"]*"/g, '');

    return text;
}

export const isMongoID = (id: string) => id && id.length == MONGO_ID_LEN