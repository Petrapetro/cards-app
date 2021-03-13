export class CardRepo {
  constructor(db) {
    this.db = db;
  }

  async getAllById(setId) {
    console.log("CardRepo")
    return (await this.db('SELECT * FROM cards WHERE setId = ?', [setId])).results;
  }
}