import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Pole } from "./pole.entity";

@Entity()
export class Persona {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    nombre_persona: string;

    @Column("float")
    id_persona: number;

    @OneToMany(() => Pole, (pole) => pole.persona)
    poles: Pole[];
}