

export class SetController {
  constructor(setService) {
    this.setService = setService
    this.get = this.get.bind(this)
  }

  async get(req, res) {
    const userId = req.params.id
    try {
      const sets = await this.setService.getAllByUserId(userId)
      res.status(200).json({ kingdoms })
    } catch (e){
      res.status(500).json({ message: e.message })
    }
  }
}