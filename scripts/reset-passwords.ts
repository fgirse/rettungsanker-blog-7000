import prisma from "@/lib/prisma";
import { hashPassword } from "better-auth/crypto";

const testUsers = [
  { email: "fgirse@bluewin.ch", password: "Test@12345" },
  { email: "claudia.carneiro@web.de", password: "Test@12345" },
  { email: "simon.pannizi@web.de", password: "Test@12345" },
];

async function resetPasswords() {
  try {
    for (const user of testUsers) {
      console.log(`Resetting password for ${user.email}...`);
      
      // Find the user
      const userData = await prisma.user.findUnique({
        where: { email: user.email },
        include: { accounts: true },
      });

      if (!userData) {
        console.log(`User not found: ${user.email}`);
        continue;
      }

      // Hash the new password using better-auth's hashPassword
      const hashedPassword = await hashPassword(user.password);

      // Update or create account
      const credential = userData.accounts.find(
        (acc) => acc.providerId === "credential"
      );

      if (credential) {
        await prisma.account.update({
          where: { id: credential.id },
          data: { password: hashedPassword },
        });
        console.log(`✓ Updated password for ${user.email}`);
      } else {
        await prisma.account.create({
          data: {
            accountId: userData.id,
            providerId: "credential",
            userId: userData.id,
            password: hashedPassword,
          },
        });
        console.log(`✓ Created credential account for ${user.email}`);
      }
    }

    console.log("\nPassword reset complete!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetPasswords();
