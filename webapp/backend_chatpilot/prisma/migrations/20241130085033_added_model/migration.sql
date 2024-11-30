/*
  Warnings:

  - You are about to drop the column `api_key` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "api_key";

-- CreateTable
CREATE TABLE "Modelapi" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "website_name" TEXT NOT NULL,
    "website_url" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Modelapi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Modelapi" ADD CONSTRAINT "Modelapi_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
