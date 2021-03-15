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

  async delete(setId) {
    return this.setRepo.delete(setId)
  }
}