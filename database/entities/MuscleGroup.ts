import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
} from "typeorm/browser";
import { Exercise } from "./Exercise";

@Entity("muscle_groups")
export class MuscleGroup {
  @PrimaryColumn({ type: "integer" })
  id!: number;

  @Column({ type: "text", unique: true })
  name!: string;

  @OneToMany(() => Exercise, (exercise) => exercise.muscleGroup)
  exercises!: Exercise[];
}
