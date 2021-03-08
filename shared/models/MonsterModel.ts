export class MonsterModel {
  id: string;
  name: string;
  icon: any;
  description: string;
  defeated: boolean;
  states: MonsterState[];

  static getMonsterById(monsterId: string, monsters: MonsterModel[]): MonsterModel | undefined {
    return monsters?.find((monster) => monster.id === monsterId);
  }
}

export class MonsterState {
  maxPV: number;
  minPV: number;
  image: string;
}
