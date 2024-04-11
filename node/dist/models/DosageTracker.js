"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlifier_1 = require("sqlifier");
exports.default = new (class DosageTracker extends sqlifier_1.SQLifier {
    constructor() {
        super();
        this.schema('dosage_tracker', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            prescription_id: { type: 'int', ref: 'prescription' },
            medicine_id: { type: 'int', ref: 'medicine' },
            is_taken: { type: 'boolean', default: false }
        });
    }
});
//# sourceMappingURL=DosageTracker.js.map