-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Coach', 'Usuario', 'Admin');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('Activo', 'Inactivo');

-- CreateEnum
CREATE TYPE "ProgramType" AS ENUM ('Proyecto', 'Servicio');

-- CreateEnum
CREATE TYPE "DonationType" AS ENUM ('Recurrente', 'Especies', 'Corporativo');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('Coaching', 'Taller', 'Retiro');

-- CreateEnum
CREATE TYPE "ServiceState" AS ENUM ('Activo', 'Inactivo', 'Finalizado');

-- CreateEnum
CREATE TYPE "categoryType" AS ENUM ('Publico', 'Corporativo');

-- CreateEnum
CREATE TYPE "PaymentState" AS ENUM ('Aceptado', 'Rechazado', 'Pendiente');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('Unico', 'Mensual', 'Trimestral', 'Anual');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surName" TEXT,
    "identification" TEXT,
    "phone" TEXT,
    "dateIn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateOut" TIMESTAMP(3),
    "description" TEXT,
    "linkedin" TEXT,
    "languaje" TEXT,
    "position" TEXT,
    "state" "State" NOT NULL DEFAULT 'Activo',
    "role" "Role" NOT NULL DEFAULT 'Usuario',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "categoryType" NOT NULL DEFAULT 'Publico',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateIn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateOut" TIMESTAMP(3),
    "objective" TEXT NOT NULL,
    "syllabus" TEXT NOT NULL,
    "urlYoutube" TEXT NOT NULL,
    "state" "State" NOT NULL DEFAULT 'Activo',
    "categoryId" INTEGER NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'default_image.jpg',

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "dateIn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateOut" TIMESTAMP(3),
    "hourIn" TIMESTAMP(3),
    "hourOut" TIMESTAMP(3),
    "amount" DOUBLE PRECISION NOT NULL,
    "objective" TEXT,
    "syllabus" TEXT,
    "type" "ServiceType" NOT NULL DEFAULT 'Coaching',
    "state" "ServiceState" NOT NULL DEFAULT 'Activo',

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "instrument" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "state" "PaymentState" NOT NULL DEFAULT 'Aceptado',

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "state" "State" NOT NULL DEFAULT 'Activo',

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "transactionId" BIGINT NOT NULL,
    "programId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "DonationType" NOT NULL DEFAULT 'Recurrente',
    "frequency" "Frequency" NOT NULL DEFAULT 'Unico',
    "message" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "state" "PaymentState" NOT NULL DEFAULT 'Aceptado',

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commentary" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "commentary" TEXT NOT NULL,
    "state" "State" NOT NULL DEFAULT 'Activo',

    CONSTRAINT "Commentary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "programId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("programId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "Payment"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_transactionId_key" ON "Donation"("transactionId");

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
