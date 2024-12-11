/*
  Warnings:

  - A unique constraint covering the columns `[api_key]` on the table `Modelapi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Modelapi_api_key_key" ON "Modelapi"("api_key");
