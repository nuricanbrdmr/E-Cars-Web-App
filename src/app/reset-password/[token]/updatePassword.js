"use server"
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import {redirect} from "next/navigation";

export async function updatePassword({newPassword, token}){
    console.log(token);
    await connect();
    const hashedPassword = await bcrypt.hash(newPassword, 5);
    await User.findOneAndUpdate(
        {verifytoken: token},
        {password: hashedPassword}
    );
    redirect("/login")
}