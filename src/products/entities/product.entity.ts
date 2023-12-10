import { Shop } from 'src/shops/entities/shop.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity('product')
export class Product {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'float'})
    price: number;

    @Column({name: 'shop_id', type: 'bigint'})
    shopId: number;

    @ManyToOne(() => Shop)
    @JoinColumn({name: 'shop_id'})
    shop: Shop;
}
