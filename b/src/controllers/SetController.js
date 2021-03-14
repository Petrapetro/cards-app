

export class SetController {
  constructor(setService, cardService) {
    this.setService = setService
    this.cardService = cardService
    this.get = this.get.bind(this)
    this.add = this.add.bind(this)
  }

  async get(req, res) {
    const { params } = req
    const userId = params.id
    try {
      const sets = await this.setService.getAllByUserId(userId)
      console.log({ sets })
      res.status(200).json({ sets })
    } catch (e){
      res.status(500).json({ message: e.message })
    }
  }

  async add (req, res) {
    const { setname, cards, params } = req
    const userId = params.id
    try {
      const set = await this.setService.add(userId, setname)
      const cardSet = await this.cardService.add(set.id, cards)
      res.status(200).json({ set, cardSet })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}