// Migrate data from SQLite to Neon Postgres
const { PrismaClient } = require("@prisma/client");
const Database = require("better-sqlite3");
const path = require("path");

async function migrate() {
    // Connect to Neon (uses DATABASE_URL from .env)
    const prisma = new PrismaClient();

    // Connect to SQLite
    const sqliteDb = new Database(path.join(__dirname, "../prisma/dev.db"));

    try {
        // Migrate FeedItems
        const feedItems = sqliteDb.prepare("SELECT * FROM FeedItem").all();
        console.log(`Found ${feedItems.length} feed items to migrate`);

        for (const item of feedItems) {
            await prisma.feedItem.upsert({
                where: { slug: item.slug },
                update: {},
                create: {
                    id: item.id,
                    type: item.type,
                    category: item.category,
                    title: item.title,
                    slug: item.slug,
                    body: item.body,
                    media: item.media,
                    rating: item.rating,
                    authorName: item.authorName,
                    sourceUrl: item.sourceUrl,
                    pinned: Boolean(item.pinned),
                    publishedAt: new Date(item.publishedAt),
                    createdAt: new Date(item.createdAt),
                },
            });
            console.log(`  ✓ ${item.type}: ${item.title}`);
        }

        // Migrate Settings
        const settings = sqliteDb.prepare("SELECT * FROM Settings").all();
        console.log(`\nFound ${settings.length} settings to migrate`);

        for (const s of settings) {
            await prisma.settings.upsert({
                where: { id: s.id },
                update: {
                    tonightStatus: s.tonightStatus,
                    tonightNote: s.tonightNote,
                    googleRating: s.googleRating,
                    googleReviewCount: s.googleReviewCount,
                    googlePhotos: s.googlePhotos,
                    ownerReplyMessage: s.ownerReplyMessage,
                },
                create: {
                    id: s.id,
                    tonightStatus: s.tonightStatus,
                    tonightNote: s.tonightNote,
                    googleRating: s.googleRating,
                    googleReviewCount: s.googleReviewCount,
                    googlePhotos: s.googlePhotos,
                    ownerReplyMessage: s.ownerReplyMessage,
                },
            });
            console.log(`  ✓ Settings: ${s.id}`);
        }

        // Verify
        const feedCount = await prisma.feedItem.count();
        const settingsCount = await prisma.settings.count();
        console.log(`\n✅ Migration complete: ${feedCount} feed items, ${settingsCount} settings`);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        sqliteDb.close();
    }
}

migrate();
