const { MongoClient } = require("mongodb");

const mongoUri = process.env.DATABASE_URL;

async function renameCollections() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db();

    console.log("Checking existing collections...");
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    console.log("Current collections:", collectionNames);

    // Rename user to users
    if (collectionNames.includes("user")) {
      await db.collection("user").rename("users");
      console.log("✓ Renamed 'user' to 'users'");
    }

    // Rename session to sessions
    if (collectionNames.includes("session")) {
      await db.collection("session").rename("sessions");
      console.log("✓ Renamed 'session' to 'sessions'");
    }

    // Rename account to accounts
    if (collectionNames.includes("account")) {
      await db.collection("account").rename("accounts");
      console.log("✓ Renamed 'account' to 'accounts'");
    }

    console.log("\nCollections renamed successfully!");
  } catch (error) {
    console.error("Error renaming collections:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

renameCollections();
