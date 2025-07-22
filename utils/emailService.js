const nodemailer=require('nodemailer');
require('dotenv').config();
const transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

const sendWelcomeEmail=async (to,name) => {
    const mailOptions={
        from:`"My App" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Welcome to My App",
        html: `
      <h2>Hello, ${name}!</h2>
      <p>Thank you for registering. We're happy to have you onboard!</p>
    `,
    };
    await transporter.sendMail(mailOptions);
};

module.exports={sendWelcomeEmail};