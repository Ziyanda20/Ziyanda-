import { SQLifier, SQLDate } from "sqlifier"

export default new (class _Model extends SQLifier {
  constructor() {
    super();

    this.schema('collection', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      diagnosis_id: { type: 'int', ref: 'diagnosis' },
      patient_id: { type: 'int', ref: 'patient' },
      doctor_id: { type: 'int', ref: 'doctor' },
      status: { type: 'varchar', length: 100 }
    })
  }
})
