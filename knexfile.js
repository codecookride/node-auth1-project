module.exports = {

    development: {
      client: 'sqlite3',
      useNullAsDefault: true, // needed for sqlite
      connection: {
        filename: './Data/users.db3',
      },
      migrations: {
        directory: './Data/migrations'
      },
      seeds: {
        directory: './data/seeds'
      },
      // add the following
      pool: {
        afterCreate: (conn, done) => {
          // runs after a connection is made to the sqlite engine
          conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
        },
      },
    }, 
  };
  