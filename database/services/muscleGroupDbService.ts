import { Repository } from "typeorm/browser";
import { AppDataSource } from "../data-source";
import { MuscleGroup } from "../entities/MuscleGroup";

export class MuscleGroupDbService {
  private repo: Repository<MuscleGroup>;

  constructor() {
    this.repo = AppDataSource.getRepository(MuscleGroup);
  }

  getAll(): Promise<MuscleGroup[]> {
    return this.repo.find({ relations: ["exercises"] });
  }

  getById(id: number): Promise<MuscleGroup | null> {
    return this.repo.findOne({
      where: { id },
      relations: ["exercises"],
    });
  }

  async create(name: string, apiId?: number): Promise<MuscleGroup> {
    const entity = this.repo.create({ name });
    if (apiId) (entity as any).id = apiId;
    return this.repo.save(entity);
  }

  async createOrUpdate(apiId: number, name: string): Promise<MuscleGroup> {
    const existing = await this.repo.findOne({ where: { id: apiId } });
    if (existing) {
      existing.name = name;
      return this.repo.save(existing);
    }
    return this.repo.save(this.repo.create({ id: apiId, name }));
  }
}

export const muscleGroupDbService = new MuscleGroupDbService();
