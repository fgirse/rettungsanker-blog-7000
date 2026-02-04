import prisma from "../lib/prisma";

async function fixNullCreatedAt() {
  const now = new Date();

  const [users, sessions, accounts] = await Promise.all([
    prisma.$runCommandRaw({
      update: "users",
      updates: [
        {
          q: { createdAt: null },
          u: { $set: { createdAt: now } },
          multi: true,
        },
      ],
    }),
    prisma.$runCommandRaw({
      update: "sessions",
      updates: [
        {
          q: { createdAt: null },
          u: { $set: { createdAt: now } },
          multi: true,
        },
      ],
    }),
    prisma.$runCommandRaw({
      update: "accounts",
      updates: [
        {
          q: { createdAt: null },
          u: { $set: { createdAt: now } },
          multi: true,
        },
      ],
    }),
  ]);

  const [usersUpdated, sessionsUpdated, accountsUpdated] = await Promise.all([
    prisma.$runCommandRaw({
      update: "users",
      updates: [
        {
          q: { updatedAt: null },
          u: { $set: { updatedAt: now } },
          multi: true,
        },
      ],
    }),
    prisma.$runCommandRaw({
      update: "sessions",
      updates: [
        {
          q: { updatedAt: null },
          u: { $set: { updatedAt: now } },
          multi: true,
        },
      ],
    }),
    prisma.$runCommandRaw({
      update: "accounts",
      updates: [
        {
          q: { updatedAt: null },
          u: { $set: { updatedAt: now } },
          multi: true,
        },
      ],
    }),
  ]);

  console.log("Fixed createdAt nulls:", {
    users,
    sessions,
    accounts,
  });

  console.log("Fixed updatedAt nulls:", {
    users: usersUpdated,
    sessions: sessionsUpdated,
    accounts: accountsUpdated,
  });
}

fixNullCreatedAt()
  .catch((error) => {
    console.error("Failed to fix null createdAt/updatedAt:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
