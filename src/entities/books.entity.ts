import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { CATEGORY } from './enums/category.enum';

@Entity('books')
@Unique(['title'])
export class Books {
  @PrimaryGeneratedColumn('uuid')
  readonly id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ enum: CATEGORY })
  categories: CATEGORY;

  @Column()
  bookcover: string;

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
}
