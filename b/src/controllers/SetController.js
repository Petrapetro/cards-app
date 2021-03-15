

export class SetController {
  constructor(setService, cardService) {
    this.setService = setService
    this.cardService = cardService
    this.get = this.get.bind(this)
    this.add = this.add.bind(this)
    this.delete = this.delete.bind(this)
  }

  async get(req, res) {
    const { params } = req
    const userId = params.id
    try {
      const sets = await this.setService.getAllByUserId(userId)
      console.log({ sets })
      res.status(200).json({ sets })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  async add(req, res) {
    const { params, body } = req
    const { setname, cards } = body
    console.log({ setname, cards })
    const userId = params.id
    console.log({ userId })
    try {
      const set = await this.setService.add(userId, setname)
      const setId = set["insertId"]
      console.log({set})
      const cardSet = await this.cardService.add(setId, cards)
      res.status(200).json({ set, cardSet })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  async delete(req, res) {
    const { params } = req
    const setId = params.setid
    try {
      this.cardService.delete(setId)
      this.setService.delete(setId)
      res.status(200).json({ message: `You deleted set with id: ${setId}`})
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}