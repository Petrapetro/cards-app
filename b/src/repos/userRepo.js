export class UserRepo {
  constructor(db) {
    this.db = db;
    this.add = this.add.bind(this)
    this.getIdByName = this.getIdByName.bind(this)
  }

  async existsByUsername(username) {
    try {
      const user = (await this.db('select COUNT(*) as exUser from users where username = ?', [username])).results[0].exUser;
      return user ? true : false;
    } catch (e) {
      return e
    }
  }

  async add(inputs) {
    try {
      this.validateInputs(inputs);
      await this.db('INSERT INTO cards.users(username, password) VALUES (?,?)', [inputs.username, inputs.hash]);
      return `${inputs.username} has been registered.`;
    } catch (e) {
      return e
    }
  }

  async getAll() {
    return (await this.db('SELECT * FROM users')).results;
  }

  async findByUsername(username) {
    const usersWithName = (await this.db('SELECT * FROM users WHERE username = ?', [username])).results[0];
    if (!usersWithName) {
      throw Error(`There is no user with name '${username}'.`)
    }
    return usersWithName
  }

  async getIdByName(username) {
    return (await this.db('SELECT users.id FROM users WHERE username = ?', [username])).results[0].id
  }

  validateInputs(inputs) {
    const { username, hash } = inputs;
    if (!username && !hash) {
      return "Missing username and hash."
    }
    if (!username || !hash) {
      if (hash) {
        return "Missing username.";
      } else {
        return "Missing hash.";
      }
    }
  }
}