export class CardRepo {
  constructor(db) {
    this.db = db;
  }

  async getAllById(setId) {
    console.log("CardRepo")
    return (await this.db('SELECT * FROM cards WHERE setId = ?', [setId])).results;
  }

  async add(text, flippedText, setId) {
    console.log({ text, flippedText, setId })
    return this.db('INSERT INTO cards(text, flippedText, setId) VALUES (?,?,?)', [text, flippedText, setId])
  }

  async deleteBySetId(setId) {
    this.db('DELETE FROM cards WHERE setId = ?', [setId])
  }

  async deleteByCardId(cardId) {
    return (await this.db('DELETE FROM cards WHERE id = ?', [cardId])).results
  }
}