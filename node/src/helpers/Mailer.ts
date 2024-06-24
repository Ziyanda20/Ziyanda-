const nodemailer = require('nodemailer');

class NodeMailer {
  private transporter: any;

  constructor (private nodemailer: any) { }

  createTransport () {
    this.transporter = this.nodemailer.createTransport({
      host: 'mail.privateemail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'support@siyeth.xyz', // generated ethereal user
        pass: 'Phalagee7', // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async send (email: any) {
    const info = await this.transporter.sendMail({
      from: email.from,
      to: email.to,
      subject: email.subject,
      html: email.message
    });
  }
};

class Mailer {
  constructor (private mailer: NodeMailer) { }

  async send (email) {
    this.mailer.createTransport();
    
    await this.mailer.send(email);
  }
}

export default new Mailer(new NodeMailer(nodemailer));