import { SQLifier, SQLDate } from "sqlifier"

export default new (class _Model extends SQLifier {
  constructor() {
    super();

    this.schema('admission', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      hospital_id: { type: 'int', ref: 'hospital' },
      patient_id: { type: 'int', ref: 'patient' },
      is_deleted: { type: 'boolean', default: false },
      date_created: { type: 'datetime', default: SQLDate.now }
    })
  }

  getLastByPatient (patient_id: string) {
    return this.findLatestOne({
      condition: {patient_id}
    })
  }
})
