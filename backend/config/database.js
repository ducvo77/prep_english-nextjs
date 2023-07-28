module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "prep_english"),
      user: env("DATABASE_USERNAME", "postgres"),
      password: env("DATABASE_PASSWORD", "Duc@123321"),
      schema: env("DATABASE_SCHEMA", "public"), // Not required
      ssl: false,
    },
    debug: false,
  },
});
