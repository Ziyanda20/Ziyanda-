import { SQLifier } from "sqlifier"

export default new (class _Model extends SQLifier {
  constructor() {
    super();

    this.schema('doctor_patient', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      doctor_id: { type: 'int', ref: 'doctor' },
      patient_id: { type: 'int', ref: 'patient' },
      is_deleted: { type: 'boolean', default: false }
    })
  }
})
