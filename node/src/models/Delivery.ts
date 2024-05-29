import { SQLifier, SQLDate } from "sqlifier"

export default new (class _Model extends SQLifier {
  constructor() {
    super();

    this.schema('delivery', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      driver_id: { type: 'int'},
      pharmacy_id: { type: 'int' },
      diagnosis_id: { type: 'int', ref: 'diagnosis' },
      patient_id: { type: 'int', ref: 'patient' },
      status: { type: 'varchar', length: 100 }
    })
  }
})
