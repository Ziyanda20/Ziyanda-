"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlifier_1 = require("sqlifier");
exports.default = new (class Doctor extends sqlifier_1.SQLifier {
    constructor() {
        super();
        this.schema('doctor', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            full_name: { type: 'varchar', length: 30 },
            email: { type: 'varchar', length: 50 },
            password: { type: 'varchar', length: 250 },
            is_deleted: { type: 'boolean', default: false },
            date_created: { type: 'datetime', default: sqlifier_1.SQLDate.now }
        });
    }
});
//# sourceMappingURL=Doctor.js.map