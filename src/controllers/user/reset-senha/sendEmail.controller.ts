import nodemailer from "nodemailer";

const sendEmail = (code: number, email: string) =>  {
  const emailContent = `
      Olá, recebemos sua solicitação para redefinir sua senha. Digite o código abaixo para redefinir a senha: <br><br> <h1 style="text-align: center">${code}</h1>
      <br><br>
      Atenciosamente, <br>
      <img src="https://i.ibb.co/6crKmrft/Design-sem-nome.png">
    `;

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
    subject: "Solicitação para redefinição de senha",
    html: emailContent
  }).then(message => {
    return "Email enviado com sucesso!";
  
  }).catch(error => {
    return "Erro ao enviar email!";
  });

  return emailResponse;
}

export default sendEmail;