import {Observable} from 'rxjs/Rx';
declare var User: any;

module.exports = {
  destroyAll: (req, res) => {
    let destroy$ = (x: any) => {
      return Observable.fromPromise(User.destroy({id: x.id}))
    };

    let find$ = Observable.fromPromise(User.find({}));


    find$
      .mergeMap(users => Observable.from(users))
      .mergeMap((user: any) => {
        return destroy$(user).map(x => x[0])
      })
      .subscribe((destroyedUser: any) => {
        User.publishDestroy(destroyedUser.id, req, {
          previous: destroyedUser
        });
      }, err => res.negotiate(err), () => res.json('ok!')); // sdsad
  }
};
