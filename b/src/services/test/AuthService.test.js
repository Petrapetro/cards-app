import { authService } from '../../dependencies/dependencyInjection'
import { AuthService } from '../AuthService'

test('decode password, success', async () => {
  const result = await authService.decodePassword("password", "$2a$10$QqfQUaoqciW/eGRTQqv78e4PlRvog8uPlsuNPUZDvw3scEJE0.xFu");
  expect(result).toBe(true);
})

test('decode password, unsuccess', async () => {
  const result = await authService.decodePassword("password", "incorrect hash");
  expect(result).toBe(false);
})


test('hash password, success', async () => {
  const hashedPassword = await authService.getHashedPassword("password");
  const result = await authService.decodePassword("password", hashedPassword);
  expect(result).toBe(true);
})

test('hash password, unsuccess', async () => {
  const hashedPassword = await authService.getHashedPassword("password");
  const result = await authService.decodePassword("incorrect password", hashedPassword);
  expect(result).toBe(false);
})

test('authenticate, unsuccess', async () => {
  const userRepo = {
    findByUsername: jest.fn().mockResolvedValue(null)
  }
  const authService = new AuthService(userRepo);
  try {
    await authService.authenticate("username", "password");
  } catch (e) {
    expect(e.message).toBe("There is no user with this name.")
  }
})

test('authenticate, success', async () => {
  const userRepo = {
    findByUsername: jest.fn().mockResolvedValue([{ password: "$2a$10$QqfQUaoqciW/eGRTQqv78e4PlRvog8uPlsuNPUZDvw3scEJE0.xFu" }])
  }
  const authService = new AuthService(userRepo);
  try {
  const token = await authService.authenticate("username", "password");
  expect(typeof token).toBe('string');
  } catch (e) {
    expect(e).not.toBeDefined;
  }
})