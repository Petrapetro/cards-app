export class CardController {
  constructor(cardService) {
    this.cardService = cardService
    this.get = this.get.bind(this)
    this.delete = this.delete.bind(this)
  }

  async get(req, res) {
    const { params } = req
    const setId = params.setid
    console.log("CardController - setId: ", setId)
    try {
      const cards = await this.cardService.getAllBySetId(setId)
      console.log({ cards })
      res.status(200).json({ cards })
    } catch (e){
      res.status(500).json({ message: e.message })
    }
  }

  async delete(req, res) {
    const { params } = req
    const cardId = params.cardid
    console.log({cardId})
    try {
      this.cardService.delete(cardId)
      res.status(200).json(`Card with id ${cardId} was deleted.`)
    } catch (e){
      res.status(500).json({ message: e.message })
    }
  }
}