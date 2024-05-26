import { SQLifier, SQLDate } from "sqlifier"

export default new (class _Model extends SQLifier {
  constructor() {
    super();

    this.schema('delivery_line', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      delivery_id: { type: 'int', ref: 'delivery' },
      medicine_id: { type: 'int', ref: 'medicine' }
    })
  }
})
