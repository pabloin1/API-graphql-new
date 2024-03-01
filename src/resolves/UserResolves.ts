import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../entity/User";
//import jwt from 'jsonwebtoken';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id") id: number) {
    return User.findOne(id);
  }

  @Mutation(() => User)
  async createUser(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const user = await User.create({ username, email, password });
    await user.hashPassword();
    await user.save();
    user.generateToken(); // Generar token JWT
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number) {
    await User.delete(id);
    return true;
  }

  @Mutation(() => User, { nullable: true })
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const valid = await user.verifyPassword(password);
    if (!valid) {
      throw new Error("Contraseña incorrecta");
    }

    user.generateToken(); // Generar token JWT
    return user;
  }
}
