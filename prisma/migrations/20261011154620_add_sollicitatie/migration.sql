-- CreateTable
CREATE TABLE "Sollicitatie" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vacatureSlug" TEXT NOT NULL,
    "naam" TEXT NOT NULL,
    "telefoon" TEXT NOT NULL,
    "email" TEXT,
    "beschikbaarheid" TEXT NOT NULL,
    "bericht" TEXT,
    "status" TEXT NOT NULL DEFAULT 'nieuw',

    CONSTRAINT "Sollicitatie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Sollicitatie_createdAt_idx" ON "Sollicitatie"("createdAt");

