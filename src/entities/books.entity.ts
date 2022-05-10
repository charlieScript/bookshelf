import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Exclusion,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { CATEGORY } from './enums/category.enum';

@Entity('books')
@Unique(['title'])
export class Book {
  @PrimaryGeneratedColumn('uuid')
  readonly id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ enum: CATEGORY })
  category: CATEGORY;

  @Column()
  book_cover_url: string;

  @Column()
  description: string;

  @Column()
  publication_date: string;

  @Column()
  archived: boolean;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @VersionColumn()
  readonly version: number;

  @BeforeInsert()
  @BeforeUpdate()
  nameToUpperCase() {
    this.title = this.title.toLowerCase();
    this.description = this.description.toLowerCase();
    this.author = this.author.toLowerCase();
  }
}
