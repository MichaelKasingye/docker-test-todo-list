import { BeforeInsert, Column, Entity } from "typeorm";
import { SoftDeletableEntity } from "./abstracts/soft-deleteable";
import { generateEntityId } from "../utils/generate-entity-id";



@Entity()
export class Todo extends SoftDeletableEntity {

    @Column({ nullable: true })
    todo: String;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, 'todo');
    }
}
