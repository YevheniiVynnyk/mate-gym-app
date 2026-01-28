import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm/browser";

export type SyncAction = "CREATE" | "UPDATE" | "DELETE";

@Entity("sync_queue")
@Index("uq_sync_entity", ["entityType", "entityClientId"], { unique: true })
export class SyncQueue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  entityType!: string;

  @Column({ type: "text" })
  entityClientId!: string;

  @Column({ type: "text" })
  action!: SyncAction;

  @Column({ type: "text", nullable: true })
  payloadJson!: string | null;

  @Column({ type: "integer" })
  updatedAt!: number; // unix ms
}
