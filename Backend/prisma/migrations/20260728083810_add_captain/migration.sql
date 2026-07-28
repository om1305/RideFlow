-- CreateEnum
CREATE TYPE "CaptainStatus" AS ENUM ('OFFLINE', 'ONLINE', 'ON_RIDE');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('CAR', 'MOTORCYCLE', 'AUTO');

-- CreateTable
CREATE TABLE "Captain" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "socketId" TEXT,
    "status" "CaptainStatus" NOT NULL DEFAULT 'OFFLINE',
    "vehicleColour" TEXT NOT NULL,
    "vehiclePlate" TEXT NOT NULL,
    "vehicleCapacity" INTEGER NOT NULL,
    "vehicleType" "VehicleType" NOT NULL,
    "locationLat" DOUBLE PRECISION,
    "locationLon" DOUBLE PRECISION,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Captain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Captain_email_key" ON "Captain"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Captain_vehiclePlate_key" ON "Captain"("vehiclePlate");
