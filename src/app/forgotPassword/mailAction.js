"use server"

import User from "@/models/User";
import connect from "@/utils/db";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";

export async function mailAction({ email }) {
  await connect();
  const result = await User.findOne({ email });
  if (result) {
    const token = nanoid(32);
    var transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER, // Gmail adresiniz
        pass: process.env.MAIL_PASSWORD // Gmail uygulama şifresi
      }
    });

    const htmlBody = `Click here to <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>`;
    const info = await transport.sendMail({
      from: '<mutlunureda@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Click Link To Reset Password", // Subject line
      text: "Click Link To Reset Password", // plain text body
      html: htmlBody, // html body
    });
    console.log("Message sent: %s", info.messageId);

    // Save token in DB
    await User.findOneAndUpdate({ email: email }, { verifytoken: token });
    return { status: "success" }; // Başarı bilgisi döndür
  } else {
    console.log("User does not exist");
    return { status: "error", message: "User does not exist" };
  }
}