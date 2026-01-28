import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm/browser";
import { MuscleGroup } from "./MuscleGroup";
import { Training } from "./Training";

@Entity("exercises")
export class Exercise {
  @PrimaryColumn({ type: "integer" })
  id!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @ManyToOne(() => MuscleGroup, (muscleGroup) => muscleGroup.exercises, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "muscleGroupId" })
  muscleGroup!: MuscleGroup;

  @Column({ type: "integer" })
  muscleGroupId!: number;

  @OneToMany(() => Training, (training) => training.exercise)
  trainings!: Training[];
}
