import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../entity/User";

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
    await user.hashPassword(); // Hashear la contraseña antes de guardarla
    return user.save();
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number) {
    await User.delete(id);
    return true;
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const valid = await user.verifyPassword(password); // Verificar la contraseña
    if (!valid) {
      throw new Error("Invalid password");
    }

    return user;
  }
}
