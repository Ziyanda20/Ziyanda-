"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlifier_1 = require("sqlifier");
exports.default = new (class DoctorPatient extends sqlifier_1.SQLifier {
    constructor() {
        super();
        this.schema('doctor_patient', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            doctor_id: { type: 'int', ref: 'doctor' },
            patient_id: { type: 'int', ref: 'patient' },
            is_deleted: { type: 'boolean', default: false }
        });
    }
});
//# sourceMappingURL=DoctorPatient.js.map