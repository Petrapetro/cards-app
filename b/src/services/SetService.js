export class SetService {
  constructor(setRepo) {
    this.setRepo = setRepo
  }

  async getAllByUserId(userId) {
    return this.setRepo.getAllById(userId)
  }

  async add(userId, setname) {
    return this.setRepo.add(userId, setname)
  }

  async update(setId, setname) {
    console.log("setService: ", setId, setname)
    return this.setRepo.update(setId, setname)
  }

  async delete(setId) {
    console.log("setService")
    return this.setRepo.delete(setId)
  }
}