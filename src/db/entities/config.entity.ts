import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Config {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text", {
        unique: true,
    })
    clave: string;

    @Column("text")
    valor: string;
}