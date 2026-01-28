import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm/browser";
import { Training } from "./Training";

@Entity("training_details")
export class TrainingDetail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "integer" })
  set!: number;

  @Column({ type: "real" })
  weight!: number;

  @Column({ type: "integer" })
  repetition!: number;

  @ManyToOne(() => Training, (training) => training.trainingDetails, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "trainingId" })
  training!: Training;

  @Column({ type: "integer" })
  trainingId!: number;
}
