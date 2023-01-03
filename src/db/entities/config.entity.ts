import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Config {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    clave: string;

    @Column("text")
    valor: string;
}