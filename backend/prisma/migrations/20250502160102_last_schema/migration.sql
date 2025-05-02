/*
  Warnings:

  - You are about to drop the column `diagnosis` on the `MedicalHistory` table. All the data in the column will be lost.
  - You are about to drop the column `dose` on the `MedicalHistory` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `MedicalHistory` table. All the data in the column will be lost.
  - You are about to drop the column `treatment` on the `MedicalHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "experience" DROP DEFAULT,
ALTER COLUMN "nationalId" DROP DEFAULT,
ALTER COLUMN "specialization" DROP DEFAULT;

-- AlterTable
ALTER TABLE "MedicalHistory" DROP COLUMN "diagnosis",
DROP COLUMN "dose",
DROP COLUMN "notes",
DROP COLUMN "treatment",
ADD COLUMN     "allergies" TEXT[],
ADD COLUMN     "chronicConditions" TEXT[],
ADD COLUMN     "medications" TEXT[],
ADD COLUMN     "surgeries" TEXT[];

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "address" DROP DEFAULT,
ALTER COLUMN "nationalId" DROP DEFAULT;
