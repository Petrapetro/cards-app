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

  async update(setId, cards) {
    cards.map(({id, text, flippedText}) => {
      console.log('cardService: ', { id, text, flippedText})
        this.cardRepo.update(id, text, flippedText)
    })
    return this.getAllBySetId(setId)
  }

  async delete(cardId) {
    this.cardRepo.deleteByCardId(cardId)
  }

  async deleteSetWithCards(setId) {
    this.cardRepo.deleteBySetId(setId)
  }
}