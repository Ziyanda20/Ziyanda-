import { SQLifier, SQLDate } from "sqlifier"

export default new (class Prescription extends SQLifier {
  constructor() {
    super();

    this.schema('prescription', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      patient_id: { type: 'int' },
      doctor_id: { type: 'int' },
      diagnosis_id: { type: 'int' },
      is_deleted: { type: 'boolean', default: false },
      date_created: { type: 'datetime', default: SQLDate.now }
    })
  }

  removeOne(id) {
    this.update({ id }, { is_deleted: true })
  }
})