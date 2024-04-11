"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlifier_1 = require("sqlifier");
exports.default = new (class Prescription extends sqlifier_1.SQLifier {
    constructor() {
        super();
        this.schema('prescription', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            patient_id: { type: 'int', ref: 'patient' },
            doctor_id: { type: 'int', ref: 'doctor' },
            diagnosis_id: { type: 'int', ref: 'diagnosis' },
            is_deleted: { type: 'boolean', default: false },
            date_created: { type: 'datetime', default: sqlifier_1.SQLDate.now }
        });
    }
    removeOne(id) {
        this.update({ id }, { is_deleted: true });
    }
});
//# sourceMappingURL=Prescription.js.map