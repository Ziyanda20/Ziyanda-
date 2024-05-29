import { SQLifier, SQLDate } from "sqlifier"

export default new (class _Model extends SQLifier {
  constructor() {
    super();

    this.schema('hospital', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      name: { type: 'varchar', length: 30 },
      is_deleted: { type: 'boolean', default: false },
      date_created: { type: 'datetime', default: SQLDate.now }
    })
  }
})
