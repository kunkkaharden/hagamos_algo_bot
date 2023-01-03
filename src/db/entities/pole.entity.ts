import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Persona } from "./persona.entity";

@Entity()
export class Pole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("float")
    id_grupo: number;

    @ManyToOne(() => Persona, (persona) => persona.poles)
    persona: Persona;
    @Column("integer")
    valor: number;
}