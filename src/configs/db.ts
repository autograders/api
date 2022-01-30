export const DBConfig = {
  url:
    process.env.DATABASE_URL ||
    'mongodb://autograders:admin@localhost:27017/autograders'
};
