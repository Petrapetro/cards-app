export class CardController {
  constructor(cardService) {
    this.cardService = cardService
    this.get = this.get.bind(this)
  }

  async get(req, res) {
    const { params } = req
    const setId = params.id
    console.log("CardController - setId: ", setId)
    try {
      const cards = await this.cardService.getAllBySetId(setId)
      console.log({ cards })
      res.status(200).json({ cards })
    } catch (e){
      res.status(500).json({ message: e.message })
    }
  }
}