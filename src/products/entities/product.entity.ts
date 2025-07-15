import { Exclude } from 'class-transformer';
import { Website } from 'src/websites/entities/website.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  url: string;

  @Column('text')
  productName: string;

  @Column('float', { nullable: true })
  price: number | null;

  @Column('text')
  websiteName: string;

  @Exclude()
  @Column('text')
  querySelector: string;

  @ManyToOne(() => Website, (website) => website.products)
  @JoinColumn({ name: 'websiteName', referencedColumnName: 'websiteName' })
  website: Website;
}
