import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import bcrypt from 'bcryptjs'; // Importar bcrypt para hashing de contraseñas


@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  username!: string;

  @Field()
  @Column()
  email!: string;

  @Column()
  password!: string;

  // Método para hashear la contraseña antes de guardarla en la base de datos
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10); // Usar bcrypt para hash
  }

  // Método para verificar la contraseña ingresada con la contraseña hasheada en la base de datos
  async verifyPassword(plainTextPassword: string) {
    return await bcrypt.compare(plainTextPassword, this.password); // Comparar contraseñas hasheadas
  }
}
