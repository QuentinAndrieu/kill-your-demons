import * as React from 'react';
import firebase, { User } from 'firebase/app';
import 'firebase/auth';
import { AvatarFightModel, AvatarModel } from '../models/AvatarModel';
import { MonsterModel } from '../models/MonsterModel';
import { AvatarContext } from '../contexts/AvatarContext';

import { UserContext } from '../contexts/UserContext';
import { MonstersContext } from '../contexts/MonstersContext';
import { AvatarFirestore } from '../firestore/AvatarFirestore';
import { MonsterFirestore } from '../firestore/MonsterFirestore';

export class MainContainer extends React.Component<
  { children: any },
  { avatar: AvatarModel; monsters: MonsterModel[]; user: User | null }
> {
  constructor(props: { children: any }) {
    super(props);

    this.state = {
      avatar: new AvatarModel(),
      monsters: [],
      user: null,
    };

    this.updateDailyFight = this.updateDailyFight.bind(this);
    this.addFight = this.addFight.bind(this);
    this.killMonster = this.killMonster.bind(this);
    this.resurrectMonster = this.resurrectMonster.bind(this);
  }

  componentDidMount() {
    AvatarFirestore.loadAvatarFromCloud().then((avatar: AvatarModel) => this.setState({ avatar }));
    MonsterFirestore.loadMonstersFromCloud().then((monsters: MonsterModel[]) => this.setState({ monsters }));

    const onAuthStateChanged = firebase.auth().onAuthStateChanged((user: User | null) => {
      this.setState({ user });

      return onAuthStateChanged;
    });
  }

  private updateDailyFight(monsterId: string | undefined, active: boolean, date: string) {
    AvatarFirestore.updateDailyFight(this.state.avatar, monsterId, active, date).then((avatar) => this.setState({ avatar }));
  }

  private addFight(fight: AvatarFightModel) {
    AvatarFirestore.addFight(this.state.avatar, fight).then((avatar) => this.setState({ avatar }));
  }

  private killMonster(monsterId: string | undefined) {
    AvatarFirestore.killMonster(this.state.avatar, monsterId).then((avatar) => this.setState({ avatar }));
  }

  private resurrectMonster(monsterId: string | undefined) {
    AvatarFirestore.resurrectMonster(this.state.avatar, monsterId).then((avatar) => this.setState({ avatar }));
  }

  render() {
    return (
      <UserContext.Provider value={{ user: this.state.user }}>
        <AvatarContext.Provider
          value={{
            avatar: this.state.avatar,
            updateDailyFight: this.updateDailyFight,
            addFight: this.addFight,
            killMonster: this.killMonster,
            resurrectMonster: this.resurrectMonster,
          }}
        >
          <MonstersContext.Provider value={{ monsters: this.state.monsters }}>{this.props.children}</MonstersContext.Provider>
        </AvatarContext.Provider>
      </UserContext.Provider>
    );
  }
}
