import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

const mimeByExt: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function richTextFromText(text: string) {
  return {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", text, version: 1 }],
          direction: "ltr",
          format: "",
          indent: 0,
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

async function upsertAbout(payload: ReturnType<typeof getPayload> extends Promise<infer T> ? T : never) {
  const existing = await payload.find({
    collection: "about",
    limit: 1,
  });

  const data = {
    title_about: "Rettungsanker Freiburg",
    content_about: richTextFromText(
      "Willkommen im Rettungsanker Freiburg – deiner Kiezkneipe mit norddeutschem Flair. Genieße kühle Getränke, gute Musik und echte Gastfreundschaft in gemütlicher Atmosphäre."
    ),
  };

  if (existing.docs.length > 0) {
    await payload.update({
      collection: "about",
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
    });
    return;
  }

  await payload.create({
    collection: "about",
    data,
    overrideAccess: true,
  });
}

async function upsertBentoGrid(payload: ReturnType<typeof getPayload> extends Promise<infer T> ? T : never) {
  const existing = await payload.find({
    collection: "bentogrid",
    limit: 1,
  });

  const data = {
    title_biere: "bier vom fass",
    content_biere: richTextFromText(
      "Flensburger Pils – das kühle Blonde von der Waterkant. Astra-Pils – das Kultbier direkt vom Kiez."
    ),
    title_weine: "regionale weine",
    content_weine: richTextFromText(
      "Qualitativ hochwertige Weine aus der Region Kaiserstuhl und dem Markgräflerland. Hauslieferant: Weingut Heinemann, Scherzingen."
    ),
    title_cocktails: "cocktails & longdrinks",
    content_cocktails: richTextFromText(
      "Zahlreiche internationale Longdrinks und Cocktails – alles, was das Herz begehrt. Zahlreiche Kurze für jeden Geschmack."
    ),
    title_fussball: "fussball live-tv",
    content_fussball: richTextFromText(
      "Jeden Bundesliga-Spieltag live. Bei Topspielen des SC Freiburg empfehlen wir Reservierungen über unser Booking-Tool."
    ),
    title_events: "party & events",
    content_events: richTextFromText(
      "Der Rettungsanker ist die ideale Location für private oder Business-Events. Auf Wunsch Catering durch unseren Kooperationspartner."
    ),
    title_albers: "hans albers",
    content_albers: richTextFromText(
      "Hans Albers (1891–1960) war einer der bekanntesten deutschen Schauspieler und Sänger. Klassiker: Münchhausen und Die große Freiheit Nr. 7."
    ),
    title_logoNeu: "neues logo",
    content_logoNeu: richTextFromText(
      "Unser neues Logo verbindet Tradition und Moderne. Es zeigt die Silhouette Freiburgs und den Rettungsanker als Treffpunkt für Jung und Alt."
    ),
  };

  if (existing.docs.length > 0) {
    await payload.update({
      collection: "bentogrid",
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
    });
    return;
  }

  await payload.create({
    collection: "bentogrid",
    data,
    overrideAccess: true,
  });
}

async function upsertPages(payload: ReturnType<typeof getPayload> extends Promise<infer T> ? T : never) {
  const existing = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: "home",
      },
    },
    limit: 1,
  });

  const data = {
    slug: "home",
    hero: {
      Header_1: "Rettungsanker Freiburg",
      Header_2: "die kiezkneipe",
    },
  };

  if (existing.docs.length > 0) {
    await payload.update({
      collection: "pages",
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
    });
    return;
  }

  await payload.create({
    collection: "pages",
    data,
    overrideAccess: true,
  });
}

async function ensureMedia(payload: ReturnType<typeof getPayload> extends Promise<infer T> ? T : never) {
  const filename = "flensburger-dunkel.webp";
  const existing = await payload.find({
    collection: "media",
    where: {
      filename: {
        equals: filename,
      },
    },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    return existing.docs[0];
  }

  const filePath = path.resolve(process.cwd(), "public/Assets/Img", filename);
  const buffer = fs.readFileSync(filePath);
  const stats = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mimetype = mimeByExt[ext] || "application/octet-stream";

  return payload.create({
    collection: "media",
    data: {
      alt: "Flensburger Dunkel",
    },
    file: {
      data: buffer,
      name: filename,
      mimetype,
      size: stats.size,
    },
    overrideAccess: true,
  });
}

async function upsertGlobals(payload: ReturnType<typeof getPayload> extends Promise<infer T> ? T : never, mediaId: string) {
  await payload.updateGlobal({
    slug: "generalSettings",
    data: {
      title: "Rettungsanker Freiburg",
      tagline: "Die Kiezkneipe in Freiburg",
    },
    context: {
      disableRevalidate: true,
    },
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: "navigation",
    data: {
      menus: [
        {
          menuName: "Hauptmenü",
          menuItems: [
            { URL: "/", label: "Home" },
            { URL: "/#section-about", label: "Über uns" },
            { URL: "/#section-angebot", label: "Angebot" },
            { URL: "/#section-kontakt", label: "Kontakt" },
          ],
        },
      ],
    },
    context: {
      disableRevalidate: true,
    },
    overrideAccess: true,
  });

  await payload.updateGlobal({
    slug: "productOfTheMonth",
    data: {
      isActive: true,
      title: "Flensburger Dunkel",
      subtitle: "Featured this month",
      description: "Malzig, vollmundig und norddeutsch – unser Highlight des Monats.",
      image: mediaId,
      price: "€4,50",
      badge: "NEU",
    },
    context: {
      disableRevalidate: true,
    },
    overrideAccess: true,
  });
}

async function seed() {
  const payload = await getPayload({ config });

  try {
    await upsertAbout(payload);
    await upsertBentoGrid(payload);
    await upsertPages(payload);

    const media = await ensureMedia(payload);
    await upsertGlobals(payload, typeof media.id === "string" ? media.id : String(media.id));

    console.log("✅ Seed completed for rettungsanker-blog-8000");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exitCode = 1;
  } finally {
    process.exit(0);
  }
}

seed();
