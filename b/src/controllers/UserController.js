export class UserController {
  constructor(userService) {
    this.userService = userService
    this.signUp = this.signUp.bind(this)
    this.login = this.login.bind(this)
  }

  async login({ body }, res) {
    const { username, password } = body;
    try {
      const loginResult = await this.userService.login(username, password);
      res.status(200).json({ token: loginResult, username });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async signUp(req, res) {
    const { username, password } = req.body;
    try {
      const addUserMessage = await this.userService.signUp(username, password);
      res.status(200).json({ message: addUserMessage });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

}