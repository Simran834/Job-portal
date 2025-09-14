-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'JOBSEEKER';

-- AlterTable
ALTER TABLE "public"."job_seeker" ADD COLUMN     "resume" TEXT;
