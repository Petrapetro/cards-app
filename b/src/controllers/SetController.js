

export class SetController {
  constructor(setService) {
    this.setService = setService
    this.get = this.get.bind(this)
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
}