import { SQLifier } from "sqlifier"

export default new (class Doctor extends SQLifier {
  constructor() {
    super();

    this.schema('doctor', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      fullname: { type: 'varchar', length: 30 },
      email: { type: 'varchar', length: 50 },
      password: { type: 'varchar', length: 250 },
      is_deleted: { type: 'boolean', default: false }
    })
  }
})
