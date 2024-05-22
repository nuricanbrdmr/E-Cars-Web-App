import { getServerSession } from "next-auth";
import User from "@/models/User";

export const findUserId = async () => {
  const session = await getServerSession();

  if (session) {
    const email = session.user?.email;

    if (email) {
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          // Kullanıcı bulundu, ID döndürülüyor
          return user._id.toString();
        } else {
          console.log("Kullanıcı bulunamadı.");
        }
      } catch (err) {
        console.error("Hata:", err);
      }
    } else {
      console.log("E-posta bilgisi bulunamadı.");
    }
  } else {
    console.log("Oturum bilgisi bulunamadı.");
  }

  return null; // Eğer kullanıcı bulunamazsa null döndürülüyor
};
