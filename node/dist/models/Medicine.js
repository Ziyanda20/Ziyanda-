"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlifier_1 = require("sqlifier");
exports.default = new (class Medicine extends sqlifier_1.SQLifier {
    constructor() {
        super();
        this.schema('medicine', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            name: { type: 'varchar', length: 100 },
            prescription_id: { type: 'int', ref: 'prescription' },
            dosage: { type: 'varchar', length: 100 },
            days: { type: 'int' },
        });
    }
});
//# sourceMappingURL=Medicine.js.map