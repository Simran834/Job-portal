// Temporary stub for Prisma v7 adapter issue with in-memory persistence
// Allows testing without PostgreSQL - data persists during server session
// To use real database: npm install @prisma/adapter-pg pg

class InMemoryDatabase {
  constructor() {
    this.users = new Map();
    this.jobs = new Map();
    this.applications = new Map();
    this.jobseekers = new Map();
    this.employers = new Map();
    this.experiences = new Map();
    this.educations = new Map();
    this.skills = new Map();
    this.socialLinks = new Map();
    this.nextUserId = 1;
    this.nextJobId = 1;
    this.nextAppId = 1;
  }

  user = {
    findUnique: async ({ where }) => {
      console.log('🔍 DB: user.findUnique called with:', JSON.stringify(where));
      console.log('📊 DB: Total users in database:', this.users.size);
      if (this.users.size > 0) {
        console.log('📋 DB: User list:', Array.from(this.users.values()).map(u => ({ id: u.id, email: u.email })));
      }
      
      if (where.email) {
        const found = Array.from(this.users.values()).find(u => u.email === where.email);
        console.log(`🔍 DB: Looking for email "${where.email}" - ${found ? 'FOUND' : 'NOT FOUND'}`);
        return found || null;
      }
      if (where.id) {
        const found = this.users.get(where.id);
        console.log(`🔍 DB: Looking for id ${where.id} - ${found ? 'FOUND' : 'NOT FOUND'}`);
        return found || null;
      }
      return null;
    },
    findMany: async () => Array.from(this.users.values()),
    create: async ({ data }) => {
      const user = {
        id: this.nextUserId++,
        email: data.email,
        password: data.password,
        role: data.role || 'JOBSEEKER',
        created_at: new Date(),
        updated_at: new Date(),
      };
      console.log('💾 DB: Creating user:', { id: user.id, email: user.email, role: user.role });
      this.users.set(user.id, user);
      console.log('✅ DB: User stored. Total users now:', this.users.size);
      return user;
    },
    update: async ({ where, data }) => {
      const user = this.users.get(where.id);
      if (user) {
        Object.assign(user, data, { updated_at: new Date() });
        return user;
      }
      return null;
    },
    delete: async ({ where }) => {
      return this.users.delete(where.id) ? { id: where.id } : null;
    },
  };

  job_seeker = {
    findUnique: async ({ where }) => {
      return Array.from(this.jobseekers.values()).find(
        j => (where.id && j.id === where.id) || (where.user_id && j.user_id === where.user_id)
      ) || null;
    },
    findMany: async () => Array.from(this.jobseekers.values()),
    create: async ({ data }) => {
      const jobseeker = {
        id: this.nextJobId++,
        ...data,
        created_at: new Date(),
      };
      this.jobseekers.set(jobseeker.id, jobseeker);
      return jobseeker;
    },
    update: async ({ where, data }) => {
      const current = this.jobseekers.get(where.id);
      if (current) {
        Object.assign(current, data);
        return current;
      }
      return null;
    },
    delete: async ({ where }) => {
      return this.jobseekers.delete(where.id) ? { id: where.id } : null;
    },
  };

  employer = {
    findUnique: async ({ where }) => {
      return Array.from(this.employers.values()).find(
        e => (where.id && e.id === where.id) || (where.user_id && e.user_id === where.user_id)
      ) || null;
    },
    findMany: async () => Array.from(this.employers.values()),
    create: async ({ data }) => {
      const employer = {
        id: this.nextJobId++,
        ...data,
        created_at: new Date(),
      };
      this.employers.set(employer.id, employer);
      return employer;
    },
    update: async ({ where, data }) => {
      const current = this.employers.get(where.id);
      if (current) {
        Object.assign(current, data);
        return current;
      }
      return null;
    },
    delete: async ({ where }) => {
      return this.employers.delete(where.id) ? { id: where.id } : null;
    },
  };

  job = {
    findUnique: async ({ where }) => {
      return this.jobs.get(where.id) || null;
    },
    findMany: async () => Array.from(this.jobs.values()),
    create: async ({ data }) => {
      const job = {
        id: this.nextJobId++,
        ...data,
        created_at: new Date(),
      };
      this.jobs.set(job.id, job);
      return job;
    },
    update: async ({ where, data }) => {
      const current = this.jobs.get(where.id);
      if (current) {
        Object.assign(current, data);
        return current;
      }
      return null;
    },
    delete: async ({ where }) => {
      return this.jobs.delete(where.id) ? { id: where.id } : null;
    },
  };

  application = {
    findUnique: async ({ where }) => {
      return this.applications.get(where.id) || null;
    },
    findMany: async () => Array.from(this.applications.values()),
    create: async ({ data }) => {
      const app = {
        id: this.nextAppId++,
        ...data,
        created_at: new Date(),
      };
      this.applications.set(app.id, app);
      return app;
    },
    update: async ({ where, data }) => {
      const current = this.applications.get(where.id);
      if (current) {
        Object.assign(current, data);
        return current;
      }
      return null;
    },
    delete: async ({ where }) => {
      return this.applications.delete(where.id) ? { id: where.id } : null;
    },
  };

  experience = {
    findUnique: async ({ where }) => {
      return this.experiences.get(where.id) || null;
    },
    findMany: async () => Array.from(this.experiences.values()),
    create: async ({ data }) => {
      const exp = { id: Object.keys(this.experiences).length + 1, ...data };
      this.experiences.set(exp.id, exp);
      return exp;
    },
    update: async ({ where, data }) => {
      const current = this.experiences.get(where.id);
      if (current) {
        Object.assign(current, data);
        return current;
      }
      return null;
    },
    delete: async ({ where }) => {
      return this.experiences.delete(where.id) ? { id: where.id } : null;
    },
  };

  education = {
    findUnique: async ({ where }) => {
      return this.educations.get(where.id) || null;
    },
    findMany: async () => Array.from(this.educations.values()),
    create: async ({ data }) => {
      const edu = { id: Object.keys(this.educations).length + 1, ...data };
      this.educations.set(edu.id, edu);
      return edu;
    },
    update: async ({ where, data }) => {
      const current = this.educations.get(where.id);
      if (current) {
        Object.assign(current, data);
        return current;
      }
      return null;
    },
    delete: async ({ where }) => {
      return this.educations.delete(where.id) ? { id: where.id } : null;
    },
  };

  skill = {
    findUnique: async ({ where }) => {
      return this.skills.get(where.id) || null;
    },
    findMany: async () => Array.from(this.skills.values()),
    create: async ({ data }) => {
      const skill = { id: Object.keys(this.skills).length + 1, ...data };
      this.skills.set(skill.id, skill);
      return skill;
    },
    update: async ({ where, data }) => {
      const current = this.skills.get(where.id);
      if (current) {
        Object.assign(current, data);
        return current;
      }
      return null;
    },
    delete: async ({ where }) => {
      return this.skills.delete(where.id) ? { id: where.id } : null;
    },
  };

  social_link = {
    findUnique: async ({ where }) => {
      return this.socialLinks.get(where.id) || null;
    },
    findMany: async () => Array.from(this.socialLinks.values()),
    create: async ({ data }) => {
      const link = { id: Object.keys(this.socialLinks).length + 1, ...data };
      this.socialLinks.set(link.id, link);
      return link;
    },
    update: async ({ where, data }) => {
      const current = this.socialLinks.get(where.id);
      if (current) {
        Object.assign(current, data);
        return current;
      }
      return null;
    },
    delete: async ({ where }) => {
      return this.socialLinks.delete(where.id) ? { id: where.id } : null;
    },
  };

  $connect = async () => {
    console.log('📦 In-memory database connected (session-based persistence)');
  };

  $disconnect = async () => {
    console.log('📦 In-memory database disconnected');
  };
}

const db = new InMemoryDatabase();

console.warn(
  '\n⚠️  WARNING: Using in-memory database stub because Prisma v7 requires an adapter.'
);
console.warn('   Data persists ONLY during this server session.');
console.warn('   To use PostgreSQL: npm install @prisma/adapter-pg pg\n'
);

module.exports = db;
