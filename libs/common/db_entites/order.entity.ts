import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @Column()
  public customer_type: string;

  @Column({ type: 'timestamptz' })
  date_time_with_timezone: Date;

  @Column('boolean', { default: false })
  higher_priority: boolean = false;
}

export default Order;
