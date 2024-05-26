import { SQLifier, SQLDate } from "sqlifier"

export default new (class _Model extends SQLifier {
  constructor() {
    super();

    this.schema('address', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      patient_id: { type: 'int', ref: 'patient' },
      line_1: { type: 'varchar', length: 30 },
      line_2: { type: 'varchar', length: 30 },
      province: { type: 'varchar', length: 30 }
    })
  }
})
