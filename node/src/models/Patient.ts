import { SQLifier, SQLDate } from "sqlifier"

export default new (class Patient extends SQLifier {
  constructor() {
    super();

    this.schema('patient', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      full_name: { type: 'varchar', length: 30 },
      id_number: { type: 'varchar', length: 13 },
      password: { type: 'varchar', length: 250 },
      is_deleted: { type: 'boolean', default: false },
      date_created: { type: 'datetime', default: SQLDate.now }
    })
  }

  removeOne(id) {
    this.update({ id }, { is_deleted: true })
  }
})
