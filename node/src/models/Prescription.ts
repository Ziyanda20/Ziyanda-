import { SQLifier, SQLDate } from "sqlifier"

export default new (class _Model extends SQLifier {
  constructor() {
    super();

    this.schema('prescription', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      patient_id: { type: 'int'  },
      doctor_id: { type: 'int' },
      address_id: { type: 'int'  },
      diagnosis_id: { type: 'int' },
      is_deleted: { type: 'boolean', default: false },
      is_ready: { type: 'boolean', default: false },
      status: { type: 'varchar', length: 30 },
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
