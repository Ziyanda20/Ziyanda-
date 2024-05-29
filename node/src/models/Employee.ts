import { SQLifier, SQLDate } from "sqlifier"

export default new (class _Model extends SQLifier {
  constructor() {
    super();

    this.schema('employee', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      hospital_id: { type: 'int', ref: 'hospital' },
      full_name: { type: 'varchar', length: 30 },
      role: { type: 'varchar', length: 20, default: 'admin' },
      email: { type: 'varchar', length: 50 },
      password: { type: 'varchar', length: 250 },
      is_deleted: { type: 'boolean', default: false },
      date_created: { type: 'datetime', default: SQLDate.now }
    })
  }
})
