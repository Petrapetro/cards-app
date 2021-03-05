export class UserController {
  constructor(userService) {
    this.userService = userService
    this.signUp = this.signUp.bind(this)
  }

  async login({ body }, res) {
    const { username, password } = body;
    try {
      validateInputsByLogin({ username, password });
      const loginResult = await this.authService.authenticate(username, password);
      if (loginResult.message) {
        throw Error(loginResult.message);
      }
      res.status(200).json({ token: loginResult, username });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async signUp(req, res) {
    const { username, password } = req.body;
    console.log({ username, password })
    try {
      const addUserMessage = await this.userService.signUp(username, password);
      res.status(200).json({ message: addUserMessage });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

}