import nodemailer from "nodemailer";

const sendEmail = (email: string, emailContent: string, subject: string) =>  {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD_EMAIL
    }
  });

  const emailResponse = transporter.sendMail({
    from: `CCZ <${process.env.USER_EMAIL}>`,
    to: email,
    subject: subject,
    html: emailContent
  }).then(message => {
    return "Email enviado com sucesso!";
  
  }).catch(error => {
    return "Erro ao enviar email!";
  });

  return emailResponse;
}

export default sendEmail;