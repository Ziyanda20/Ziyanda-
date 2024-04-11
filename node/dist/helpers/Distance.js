"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistance = void 0;
const degToRad = (deg) => {
    return deg * (Math.PI / 180);
};
const getDistance = ({ lat: latOne, lng: lngOne }, { lat: latTwo, lng: lngTwo }) => {
    const R = 6371; // Radius of the earth in km
    const latituteDistance = degToRad(latTwo - latOne); // degToRad below
    const longituteDistance = degToRad(lngTwo - lngOne);
    const a = Math.sin(latituteDistance / 2) * Math.sin(latituteDistance / 2) +
        Math.cos(degToRad(latOne)) *
            Math.cos(degToRad(latTwo)) *
            Math.sin(longituteDistance / 2) *
            Math.sin(longituteDistance / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};
exports.getDistance = getDistance;
//# sourceMappingURL=Distance.js.map