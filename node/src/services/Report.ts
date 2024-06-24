
import fs from 'fs';
import ejs from 'ejs';
import path from 'path';

async function downloadCSV (body) {
  try {
    const html = await ejs.renderFile(
      path.join(__dirname, '../views/report.ejs'), {
      data: body.data,
      tableHeader: body.tableHeader,
      allowedColumns: body.allowedColumns
    });

    const filename = `CSV Report of ${body.reportName} at [${Date.now()}].csv`;

    const filePath = path.join(
      __dirname,
      `../../public/assets/downloads/tmp/`
    );

    fs.writeFileSync(filePath + filename, html.trimStart())

    this.filename = filename;
    this.successful = true;

    return this;
  } catch (e) { throw e; }
}

export {
  downloadCSV
}