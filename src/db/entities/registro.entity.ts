import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Registro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("integer")
    id_grupo: number;
}