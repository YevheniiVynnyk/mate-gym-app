import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm/browser";
import { Exercise } from "./Exercise";
import { TrainingDay } from "./TrainingDay";
import { TrainingDetail } from "./TrainingDetail";

@Entity("trainings")
export class Training {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.trainings, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "exerciseId" })
  exercise!: Exercise;

  @Column({ type: "integer" })
  exerciseId!: number;

  @Column({ type: "text", nullable: true })
  note?: string;

  @ManyToOne(() => TrainingDay, (trainingDay) => trainingDay.trainings, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "trainingDayId" })
  trainingDay!: TrainingDay;

  @Column({ type: "integer" })
  trainingDayId!: number;

  @OneToMany(() => TrainingDetail, (detail) => detail.training, {
    cascade: true,
  })
  trainingDetails!: TrainingDetail[];
}
