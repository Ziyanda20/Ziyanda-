import { SQLifier, SQLDate } from "sqlifier"

export default new (class _Model extends SQLifier {
  constructor() {
    super();

    this.schema('diagnosis', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      name: { type: 'varchar', length: 100 },
      patient_id: { type: 'int', ref: 'patient' },
      doctor_id: { type: 'int', ref: 'doctor' },
      is_deleted: { type: 'boolean', default: false },
      date_created: { type: 'datetime', default: SQLDate.now }
    })
  }

  removeOne(id) {
    this.update({ id }, { is_deleted: true })
  }

  getLastByPatient (patient_id: string) {
    return this.findLatestOne({
      condition: {patient_id}
    })
  }
})
