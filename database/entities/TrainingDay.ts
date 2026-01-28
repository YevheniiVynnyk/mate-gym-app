import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm/browser";
import { Training } from "./Training";

export type TrainingDayStatus = "CREATED" | "IN_PROGRESS" | "COMPLETED";

@Entity("training_days")
export class TrainingDay {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "datetime" })
  date!: Date;

  @Column({
    type: "text",
    default: "CREATED",
  })
  status!: TrainingDayStatus;

  @Column({ type: "integer", nullable: true })
  durationMinutes?: number;

  @Column({ type: "text", nullable: true })
  clientId?: string;

  @Column({ type: "text", nullable: true })
  trainerId?: string;

  @Column({ type: "boolean", default: false })
  isTemplate!: boolean;

  @Column({ type: "datetime", nullable: true })
  createdDate?: Date;

  @Column({ type: "datetime", nullable: true })
  modifiedDate?: Date;

  @Column({ type: "integer", nullable: true })
  createdBy?: number;

  @Column({ type: "integer", nullable: true })
  modifiedBy?: number;

  @Column({ type: "datetime", nullable: true })
  startTime?: Date;

  @Column({ type: "datetime", nullable: true })
  endTime?: Date;

  @OneToMany(() => Training, (training) => training.trainingDay, {
    cascade: true,
  })
  trainings!: Training[];
}
