import { SQLifier, SQLDate } from "sqlifier"

export default new (class DosageTracker extends SQLifier {
  constructor() {
    super();

    this.schema('dosage_tracker', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      prescription_id: { type: 'int', ref: 'prescription' },
      medicine_id: { type: 'int', ref: 'medicine' },
      is_taken: { type: 'boolean', default: false }
    })
  }
})
