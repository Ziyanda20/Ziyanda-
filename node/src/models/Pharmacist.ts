import { SQLifier, SQLDate } from "sqlifier"

export default new (class _Model extends SQLifier {
  constructor() {
    super();

    this.schema('pharmacist', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      pharmacy_id: { type: 'int', ref: 'pharmacy' },
      full_name: { type: 'varchar', length: 30 },
      email: { type: 'varchar', length: 50 },
      password: { type: 'varchar', length: 250 },
      is_deleted: { type: 'boolean', default: false },
      date_created: { type: 'datetime', default: SQLDate.now }
    })
  }
})
