"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlifier_1 = require("sqlifier");
exports.default = new (class Patient extends sqlifier_1.SQLifier {
    constructor() {
        super();
        this.schema('patient', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            full_name: { type: 'varchar', length: 30 },
            id_number: { type: 'varchar', length: 13 },
            password: { type: 'varchar', length: 250 },
            is_deleted: { type: 'boolean', default: false },
            date_created: { type: 'datetime', default: sqlifier_1.SQLDate.now }
        });
    }
    removeOne(id) {
        this.update({ id }, { is_deleted: true });
    }
});
//# sourceMappingURL=Patient.js.map