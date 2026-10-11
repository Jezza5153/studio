-- CreateTable
CREATE TABLE "FeedItem" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "body" TEXT,
    "media" TEXT,
    "rating" INTEGER,
    "authorName" TEXT,
    "sourceUrl" TEXT,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "tonightStatus" TEXT NOT NULL DEFAULT 'OPEN',
    "tonightNote" TEXT NOT NULL DEFAULT '',
    "googleRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "googleReviewCount" INTEGER NOT NULL DEFAULT 0,
    "googlePhotos" TEXT NOT NULL DEFAULT '[]',
    "ownerReplyMessage" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedItem_slug_key" ON "FeedItem"("slug");

-- CreateIndex
CREATE INDEX "FeedItem_publishedAt_idx" ON "FeedItem"("publishedAt");

-- CreateIndex
CREATE INDEX "FeedItem_type_idx" ON "FeedItem"("type");

-- CreateIndex
CREATE INDEX "FeedItem_category_idx" ON "FeedItem"("category");

-- CreateIndex
CREATE INDEX "FeedItem_type_category_idx" ON "FeedItem"("type", "category");

