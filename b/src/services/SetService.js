export class SetService {
  constructor(setRepo) {
    this.setRepo = setRepo
  }

  async getAllByUserId(userId) {
    return this.setRepo.getAllById(userId)
  }
}