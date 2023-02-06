import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("product")
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  product_id: string;

  @Column()
  product_name: string;

  @Column({ type: "decimal", precision: 4, scale: 2 })
  product_price: number;

  @Column()
  product_image: string;
}
