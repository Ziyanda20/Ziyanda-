import { SQLifier, SQLDate } from "sqlifier"

export default new (class Diagnoses extends SQLifier {
  constructor() {
    super();

    this.schema('diagnoses', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      name: { type: 'varchar', length: 100 },
      patient_id: { type: 'int' },
      doctor_id: { type: 'int' },
      is_deleted: { type: 'boolean', default: false },
      date_created: { type: 'datetime', default: SQLDate.now }
    })
  }

  removeOne(id) {
    this.update({ id }, { is_deleted: true })
  }
})
