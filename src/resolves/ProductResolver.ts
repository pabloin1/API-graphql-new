import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  InputType,
  Int,
} from "type-graphql";
import { Product } from "../entity/Product";

@InputType()
class ProductInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  price!: number;

  @Field()
  category!: string;

  @Field()
  quantity!: number;
}

@InputType()
class UpdateProductInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => Int, { nullable: true })
  quantity?: number;
}

@Resolver()
export class ProductResolver {
  //Mutaciones
  @Mutation(() => Product)
  async createProduct(
    @Arg("variables", () => ProductInput) variables: ProductInput
  ) {
    return await Product.create(variables).save();
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id", () => Int) id: number) {
    await Product.delete(id);
    return true;
  }

  @Mutation(() => Boolean)
  async updateProduct(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => UpdateProductInput) fields: UpdateProductInput
  ) {
    await Product.update({ id }, fields);

    return true;
  }

  @Mutation(() => Product)
  async incrementProductQuantity(
    @Arg("id", () => Int) id: number,
    @Arg("amount", () => Int) amount: number
  ) {
    const product = await Product.findOne(id);
    if (!product) throw new Error("Product not found");
    product.quantity += amount;
    return product.save();
  }

  @Mutation(() => Product)
  async decrementProductQuantity(
    @Arg("id", () => Int) id: number,
    @Arg("amount", () => Int) amount: number
  ) {
    const product = await Product.findOne(id);
    if (!product) throw new Error("Product not found");
    if (product.quantity < amount)
      throw new Error("Not enough quantity available");
    product.quantity -= amount;
    return product.save();
  }

  //querys------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  @Query(() => [Product]) // Especifica que el tipo de retorno es un array de Product
  async Products() {
    return Product.find();
  }
  @Query(() => [Product])
  async getProductsByCategory(@Arg("category") category: string) {
    return Product.find({ where: { category } });
  }

  @Query(() => Product, { nullable: true })
  async getProductById(@Arg("id", () => Int) id: number) {
    return Product.findOne(id);
  }
}
