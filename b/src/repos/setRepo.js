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

  async update(setId, setname) {
    console.log('setRepo: ', setId, setname)
    return (await this.db('UPDATE sets SET setname = ? WHERE id = ?', [setname, setId])).results
  }

  async delete(setId) {
    this.db('DELETE FROM sets WHERE id = ?', [setId])
  }
}