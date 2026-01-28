import { Repository } from "typeorm/browser";
import { AppDataSource } from "../data-source";
import { Exercise } from "../entities/Exercise";

export class ExerciseDbService {
  private repo: Repository<Exercise>;

  constructor() {
    this.repo = AppDataSource.getRepository(Exercise);
  }

  getAll(): Promise<Exercise[]> {
    return this.repo.find({ relations: ["muscleGroup"] });
  }

  getById(id: number): Promise<Exercise | null> {
    return this.repo.findOne({
      where: { id },
      relations: ["muscleGroup"],
    });
  }

  getByMuscleGroup(muscleGroupId: number): Promise<Exercise[]> {
    return this.repo.find({
      where: { muscleGroupId },
      relations: ["muscleGroup"],
    });
  }

  async create(
    name: string,
    muscleGroupId: number,
    description?: string,
    apiId?: number,
  ): Promise<Exercise> {
    const entity = this.repo.create({
      name,
      muscleGroupId,
      description,
    });
    if (apiId) (entity as any).id = apiId;
    return this.repo.save(entity);
  }

  async createOrUpdate(
    apiId: number,
    name: string,
    muscleGroupId: number,
    description?: string,
  ): Promise<Exercise> {
    const existing = await this.repo.findOne({ where: { id: apiId } });
    if (existing) {
      Object.assign(existing, { name, muscleGroupId, description });
      return this.repo.save(existing);
    }
    return this.repo.save(
      this.repo.create({ id: apiId, name, muscleGroupId, description }),
    );
  }

  async update(id: number, updates: Partial<Exercise>): Promise<Exercise> {
    await this.repo.update(id, updates);
    const updated = await this.getById(id);
    if (!updated) throw new Error(`Exercise ${id} not found`);
    return updated;
  }
}

export const exerciseDbService = new ExerciseDbService();
