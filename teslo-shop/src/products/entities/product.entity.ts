import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    title: string;

    @Column({ unique: true })
    slug: string;

    @Column('float', { default: 0 })
    price: number;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column('int', { default: 0 })
    stock: number;

    @Column('text', { array: true })
    sizes: string[];

    @Column({ type: 'text' })
    gender: string;

    @Column('text', { array: true, default: [] })
    tags: string[];     
}
