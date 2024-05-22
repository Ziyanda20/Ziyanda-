import { SQLifier, SQLDate } from "sqlifier"

export default new (class _Model extends SQLifier {
  constructor() {
    super();

    this.schema('collection_line', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      collection_id: { type: 'int', ref: 'collection' },
      medicine_id: { type: 'int', ref: 'medicine' }
    })
  }
})
