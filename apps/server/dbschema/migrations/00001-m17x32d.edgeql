CREATE MIGRATION m17x32d7vg4ih7am5dcgexd74g6cvbh2d2ibkdgqhdzzajj35vmb4q
    ONTO initial
{
  CREATE EXTENSION pgcrypto VERSION '1.3';
  CREATE EXTENSION auth VERSION '1.0';
  CREATE TYPE default::Credential {
      CREATE REQUIRED PROPERTY counter: std::int64;
      CREATE REQUIRED PROPERTY createdAt: std::datetime;
      CREATE REQUIRED PROPERTY publicKey: std::str;
  };
  CREATE TYPE default::User {
      CREATE MULTI LINK credentials: default::Credential;
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::regexp(r'^[^@]+@[^@]+\.[^@]+$');
      };
      CREATE INDEX ON (.email);
      CREATE PROPERTY name: std::str;
  };
  ALTER TYPE default::Credential {
      CREATE LINK user: default::User;
  };
};
