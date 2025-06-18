import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Website {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  websiteName: string;

  @OneToMany(() => Product, (product) => product.website)
  products: Product[];
}
