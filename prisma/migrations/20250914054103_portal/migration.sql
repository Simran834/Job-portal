-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'JOBSEEKER', 'EMPLOYER');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."job_seeker" (
    "seeker_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "seeker_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "profile_image" TEXT,
    "current_position" TEXT,
    "current_salary" DOUBLE PRECISION,
    "expected_salary" DOUBLE PRECISION,
    "is_open_to_work" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "job_seeker_pkey" PRIMARY KEY ("seeker_id")
);

-- CreateTable
CREATE TABLE "public"."employer" (
    "employer_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company_name" TEXT NOT NULL,
    "website" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "company_logo" TEXT,
    "registration_certificate" TEXT,
    "description" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "employer_pkey" PRIMARY KEY ("employer_id")
);

-- CreateTable
CREATE TABLE "public"."Job" (
    "job_id" SERIAL NOT NULL,
    "employer_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salary_min" DOUBLE PRECISION,
    "salary_max" DOUBLE PRECISION,
    "job_type" TEXT NOT NULL,
    "experience_level" TEXT NOT NULL,
    "work_mode" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "posted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "application_deadline" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "public"."Application" (
    "application_id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "seeker_id" INTEGER NOT NULL,
    "cover_letter" TEXT,
    "resume" TEXT,
    "applied_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "Application_pkey" PRIMARY KEY ("application_id")
);

-- CreateTable
CREATE TABLE "public"."Experience" (
    "experience_id" SERIAL NOT NULL,
    "seeker_id" INTEGER NOT NULL,
    "job_title" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("experience_id")
);

-- CreateTable
CREATE TABLE "public"."Education" (
    "education_id" SERIAL NOT NULL,
    "seeker_id" INTEGER NOT NULL,
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "field_of_study" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("education_id")
);

-- CreateTable
CREATE TABLE "public"."Skill" (
    "skill_id" SERIAL NOT NULL,
    "seeker_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "proficiency" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("skill_id")
);

-- CreateTable
CREATE TABLE "public"."SocialLink" (
    "link_id" SERIAL NOT NULL,
    "user_type" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("link_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "job_seeker_user_id_key" ON "public"."job_seeker"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "employer_user_id_key" ON "public"."employer"("user_id");

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "public"."employer"("employer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."Job"("job_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "public"."job_seeker"("seeker_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Experience" ADD CONSTRAINT "Experience_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "public"."job_seeker"("seeker_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Education" ADD CONSTRAINT "Education_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "public"."job_seeker"("seeker_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Skill" ADD CONSTRAINT "Skill_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "public"."job_seeker"("seeker_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SocialLink" ADD CONSTRAINT "SocialLink_job_seeker_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."job_seeker"("seeker_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SocialLink" ADD CONSTRAINT "SocialLink_employer_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."employer"("employer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
