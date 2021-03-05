export class UserRepo {
  constructor(db) {
    this.db = db;
  }

async existsByUsername(username) {
    const user = (await this.db('select COUNT(*) as exUser from users where username = ?', [username])).results[0].exUser;
    return user ? true : false;
}

async add(inputs) {
    try {
        this.validateInputs(inputs);
        await this.db('INSERT INTO users(username, password, kingdomName) VALUES (?,?,?)', [inputs.username, inputs.hash, inputs.kingdomName]);
        return `${inputs.username} has been registered with kingdom name ${inputs.kingdomName}.`;
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
    const { username, hash, kingdomName } = inputs;
    if (!username || !hash || !kingdomName) {
      let errorMessage = "Missing ";
      if (!username) {
        if (hash && kingdomName) {
          errorMessage += "username.";
          throw new HttpError(500, errorMessage);
        } else {
          errorMessage += "username, ";
        }
      }
      if (!hash) {
        if (kingdomName) {
          errorMessage += "hash.";
          throw new HttpError(500, errorMessage);
        } else {
          errorMessage += "hash, ";
        }
      }
      if (!kingdomName) {
        errorMessage += "kingdom name.";
        throw new HttpError(500, errorMessage);
      }
    }
  }
}