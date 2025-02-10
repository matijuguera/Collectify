-- CreateTable
CREATE TABLE "Set" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" BYTEA NOT NULL,
    "theme_id" TEXT NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
