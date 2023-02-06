import { IsEmail, Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Length(4, 10, {
    message: "FisrtName must be longer than or equal to 4 characters",
  })
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true, unique: true })
  @IsEmail({}, { message: "Email not correct fomarted" })
  email: string;

  @Column()
  password: string;

  user_name: string;

  @AfterLoad()
  setFullName() {
    this.user_name = `${this.first_name} ${this.last_name}`;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
