import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  websiteName: string;

  @Column('text')
  switch2: string;

  @Column('text')
  switch2bundle: string;

  @Column('text')
  querySelector: string;
}
