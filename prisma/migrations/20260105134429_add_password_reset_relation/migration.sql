/*
  Warnings:

  - The `status` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `industry` on the `Job` table. All the data in the column will be lost.
  - The `proficiency` column on the `Skill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `user_id` on the `SocialLink` table. All the data in the column will be lost.
  - Added the required column `category` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `job_type` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `experience_level` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `work_mode` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_type` on the `SocialLink` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `platform` on the `SocialLink` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'TEMPORARY');

-- CreateEnum
CREATE TYPE "public"."ExperienceLevel" AS ENUM ('ENTRY_LEVEL', 'MID_LEVEL', 'SENIOR_LEVEL', 'DIRECTOR', 'EXECUTIVE');

-- CreateEnum
CREATE TYPE "public"."WorkMode" AS ENUM ('REMOTE', 'ON_SITE', 'HYBRID');

-- CreateEnum
CREATE TYPE "public"."JobCategory" AS ENUM ('IT_SOFTWARE', 'HEALTH_MEDICAL', 'BANKING_FINANCE', 'GENERAL_MANAGEMENT', 'CONSULTING_AGENCY', 'TEACHING_EDUCATION', 'SALES_MARKETING', 'CUSTOMER_SUPPORT', 'ENGINEERING', 'OPERATIONS_LOGISTICS');

-- CreateEnum
CREATE TYPE "public"."SkillProficiency" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "public"."SocialUserType" AS ENUM ('JOB_SEEKER', 'EMPLOYER');

-- CreateEnum
CREATE TYPE "public"."SocialPlatform" AS ENUM ('LINKEDIN', 'GITHUB', 'TWITTER', 'FACEBOOK', 'PERSONAL_WEBSITE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('PENDING', 'REVIEWED', 'INTERVIEWED', 'SHORTLISTED', 'OFFERED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."ActivityAction" AS ENUM ('VIEWED', 'DOWNLOADED', 'SHORTLISTED');

-- DropForeignKey
ALTER TABLE "public"."SocialLink" DROP CONSTRAINT "SocialLink_employer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."SocialLink" DROP CONSTRAINT "SocialLink_job_seeker_id_fkey";

-- AlterTable
ALTER TABLE "public"."Application" DROP COLUMN "status",
ADD COLUMN     "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "industry",
ADD COLUMN     "category" "public"."JobCategory" NOT NULL,
DROP COLUMN "job_type",
ADD COLUMN     "job_type" "public"."JobType" NOT NULL,
DROP COLUMN "experience_level",
ADD COLUMN     "experience_level" "public"."ExperienceLevel" NOT NULL,
DROP COLUMN "work_mode",
ADD COLUMN     "work_mode" "public"."WorkMode" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Skill" DROP COLUMN "proficiency",
ADD COLUMN     "proficiency" "public"."SkillProficiency";

-- AlterTable
ALTER TABLE "public"."SocialLink" DROP COLUMN "user_id",
ADD COLUMN     "employer_id" INTEGER,
ADD COLUMN     "seeker_id" INTEGER,
DROP COLUMN "user_type",
ADD COLUMN     "user_type" "public"."SocialUserType" NOT NULL,
DROP COLUMN "platform",
ADD COLUMN     "platform" "public"."SocialPlatform" NOT NULL;

-- CreateTable
CREATE TABLE "public"."ApplicationActivity" (
    "activity_id" SERIAL NOT NULL,
    "application_id" INTEGER NOT NULL,
    "action" "public"."ActivityAction" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplicationActivity_pkey" PRIMARY KEY ("activity_id")
);

-- CreateTable
CREATE TABLE "public"."PasswordResetToken" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "public"."PasswordResetToken"("token");

-- AddForeignKey
ALTER TABLE "public"."job_seeker" ADD CONSTRAINT "job_seeker_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."employer" ADD CONSTRAINT "employer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SocialLink" ADD CONSTRAINT "SocialLink_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "public"."job_seeker"("seeker_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SocialLink" ADD CONSTRAINT "SocialLink_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "public"."employer"("employer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ApplicationActivity" ADD CONSTRAINT "ApplicationActivity_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "public"."Application"("application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
