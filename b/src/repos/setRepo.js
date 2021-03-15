export class SetRepo {
  constructor(db) {
    this.db = db;
  }

  async getAllById(userId) {
    return (await this.db('SELECT * FROM sets WHERE userId = ?', [userId])).results
  }

  async add(userId, setname) {
    return (await this.db('INSERT INTO sets(setname, userId) VALUES (?,?)', [setname, userId])).results
  }

  async delete(setId) {
    return (await this.db('DELETE FROM sets WHERE id = ?', [setId])).results
  }
}