import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Registro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("float")
    id_grupo: number;
}