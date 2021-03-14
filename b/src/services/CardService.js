export class CardService {
  constructor(cardRepo) {
    this.cardRepo = cardRepo
  }

  async getAllBySetId(setId) {
    console.log("CardsService")
    return this.cardRepo.getAllById(setId)
  }

  async add(setId, cards) {
    return this.cardRepo.add(setId, cards)
  }
}