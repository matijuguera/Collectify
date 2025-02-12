-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" BYTEA NOT NULL,
    "set_id" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCard" (
    "user_id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,

    CONSTRAINT "UserCard_pkey" PRIMARY KEY ("user_id","card_id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_set_id_fkey" FOREIGN KEY ("set_id") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCard" ADD CONSTRAINT "UserCard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCard" ADD CONSTRAINT "UserCard_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
