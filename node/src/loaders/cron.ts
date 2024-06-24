import schedule from "node-schedule"
import Patient from "../models/Patient"
import Medicine from "../models/Medicine"
import Prescription from "../models/Prescription"
import Mailer from "../helpers/Mailer"

import PrescriptionService from "../services/Prescription"
import { isPastDate } from "../helpers/Datetime"

let sent = new Map()

export default () => {
  return;
  
  schedule.scheduleJob('mail', '* * * * *', async () => {
    // loop medicien
    // loop th
    const meds = await Medicine.find({})

    for (let m = 0; m < meds.length; m++) {
      const med = meds[m];

      const res = await PrescriptionService.getTrackerItems.call({}, {
        medicine_id: med.id,
        prescription_id: med.prescription_id
      })

      console.log('Init reminder email');
      

      if (sent.has(`${med.prescription_id}_${med.id}`)) {
        continue
      }

      for (let t = 0; t < res.trackers.length; t++) {
        const line = res.trackers[t];

        const patient = await Prescription.findOne({ condition: { id:  med.prescription_id }, join: { ref: 'patient', id: 'patient_id' }  });

        if (isPastDate(new Date(line.take_by))) {
          Mailer.send({
            to: patient.email,
            from: 'Siye Team <support@siyeth.xyz>',
            subject: 'Remider to take medicine',
            message: `Remider to take medicine ${med.name}`
          })

          sent.set(`${med.prescription_id}_${med.id}`, true)
        }
      }
    }
  })
}