export class CardService {
  constructor(cardRepo) {
    this.cardRepo = cardRepo
  }

  async getAllBySetId(setId) {
    console.log("CardsService")
    return this.cardRepo.getAllById(setId)
  }

  async add(setId, cards) {
    console.log("cardService")
    cards.map((text) => {
      console.log({ text, setId })
      console.log(text.text)
      if (text.text) {
        this.cardRepo.add(text.text, text.flippedText, setId)
      }
    })
    return this.getAllBySetId(setId)
  }

  async delete(setId) {
    return this.cardRepo.delete(setId)
  }
}