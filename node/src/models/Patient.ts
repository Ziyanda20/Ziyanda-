import { SQLifier, SQLDate } from "sqlifier"

export default new (class _Model extends SQLifier {
  constructor() {
    super();

    this.schema('patient', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      full_name: { type: 'varchar', length: 30 },
      email: { type: 'varchar', length: 50 },
      id_number: { type: 'varchar', length: 13 },
      password: { type: 'varchar', length: 250 },
      is_deleted: { type: 'boolean', default: false },
      addr_line_1: { type: 'varchar', length: 30 },
      addr_line_2: { type: 'varchar', length: 30 },
      province: { type: 'varchar', length: 30 },
      date_created: { type: 'datetime', default: SQLDate.now }
    })
  }

  removeOne(id) {
    this.update({ id }, { is_deleted: true })
  }
})
