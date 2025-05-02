-- AlterTable
ALTER TABLE "Doctor" 
ADD COLUMN "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "nationalId" TEXT NOT NULL DEFAULT '',
ADD COLUMN "profilePhoto" TEXT,
ADD COLUMN "specialization" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Patient" 
ADD COLUMN "address" TEXT NOT NULL DEFAULT '',
ADD COLUMN "nationalId" TEXT NOT NULL DEFAULT '',
ADD COLUMN "profilePhoto" TEXT;

-- CreateTable
CREATE TABLE "PatientNote" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "doctorName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "PatientNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PatientNote" ADD CONSTRAINT "PatientNote_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
