import { SQLifier, SQLDate } from "sqlifier"

export default new (class Medicine extends SQLifier {
  constructor() {
    super();

    this.schema('medicine', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      name: { type: 'varchar', length: 100 },
      prescription_id: { type: 'int', ref: 'prescription' },
      dosage: { type: 'varchar', length: 100 },
      days: { type: 'int' },
    })
  }
})
