import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { Match } from "./Shared/Model/match";
import { League } from "./Shared/Model/league";
import { Player } from "./Shared/Model/player";
import { LeaguePlayer } from "./Shared/Model/leaguePlayer";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef } from "angularfire2";
@Injectable()
export class LeaguesService {

  private ref: firebase.database.Reference;
  private leagueRef: firebase.database.Reference;
  constructor(private db: AngularFireDatabase, @Inject(FirebaseRef) fb) {

    this.ref = fb.database().ref();

    this.leagueRef = fb.database().ref('leagues')

  }

  findAllLeagues(): FirebaseListObservable<League[]> {

    return <FirebaseListObservable<League[]>>this.db.list(this.leagueRef);
  }
  findSingelLeague(leagueKey: string): FirebaseObjectObservable<League> {
    return this.db.object(this.leagueRef + "/" + leagueKey)
  }


  addLeague(league: League) {
    //get a push key, this is performed localy
    let newPushKey: string = this.leagueRef.push().key;
    var updates = {};
    updates["/leagues/" + newPushKey] = league;
    this.ref.update(updates);
  }
  addPlayerToLeague(leagueKey: string, playerKey: string) {
    const leaguePlayer: LeaguePlayer = new LeaguePlayer(0, 0, true);
    var updates = {};
    updates["/leagues/" + leagueKey + "/players/" + playerKey] = leaguePlayer;
    this.ref.update(updates);
  }

}
