import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Eto {
  @PrimaryGeneratedColumn() id: number;

  @Column() address: string;

  @Column() percentage: number;

  @Column() createtime: Date;

  constructor(address, percentage, createtime) {
    this.address = address;
    this.percentage = percentage;
    this.createtime = createtime;
  }
}
