export class CardRepo {
  constructor(db) {
    this.db = db;
  }

  async getAllById(setId) {
    console.log("CardRepo")
    return (await this.db('SELECT * FROM cards WHERE setId = ?', [setId])).results;
  }

  async add(setId, cards) {
    console.log({setId, cards})
    cards.map((text) => {
      console.log({text, setId})
      console.log(text.text)
      if(text.text) {
        this.db('INSERT INTO cards(text, flippedText, setId) VALUES (?,?,?)', [text.text, text.flippedText, setId])
      }
    })
    return this.getAllById(setId)
  }
}