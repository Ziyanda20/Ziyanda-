import { SQLifier, SQLDate } from "sqlifier"

export default new (class DosageTracker extends SQLifier {
  constructor() {
    super();

    this.schema('dosage_tracker', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      prescription_id: { type: 'int' },
      medicine_id: { type: 'int' },
      is_taken: { type: 'boolean', default: false }
    })
  }
})
