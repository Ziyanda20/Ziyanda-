import { SQLifier, SQLDate } from "sqlifier"

export default new (class _Model extends SQLifier {
  constructor() {
    super();

    this.schema('prescription', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      patient_id: { type: 'int', ref: 'patient' },
      doctor_id: { type: 'int', ref: 'doctor' },
      diagnosis_id: { type: 'int', ref: 'diagnosis' },
      is_deleted: { type: 'boolean', default: false },
      is_ready: { type: 'boolean', default: false },
      collection_type: { type: 'varchar', length: 20, default: 'delivery' },
      status: { type: 'varchar', length: 30 },
      date_created: { type: 'datetime', default: SQLDate.now }
    })
  }

  removeOne(id) {
    this.update({ id }, { is_deleted: true })
  }
})
