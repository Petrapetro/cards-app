export class UserRepo {
  constructor(db) {
    this.db = db;
    this.add = this.add.bind(this)
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
    console.log({ inputs })
    try {
      this.validateInputs(inputs);
      console.log({ inputs })
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
    const usersWithName = (await this.db('SELECT * FROM users WHERE username = ?', [username])).results;
    if (usersWithName.length === 0) {
      return null
    }
    return usersWithName
  }

  validateInputs(inputs) {
    const { username, hash } = inputs;
    if (!username || !hash) {
      let errorMessage = "Missing ";
      if (!username) {
        if (hash) {
          errorMessage += "username.";
          throw new HttpError(500, errorMessage);
        }
        if (!hash) {
          errorMessage += "hash.";
          throw new HttpError(500, errorMessage);
        }
      }
    }
  }
}