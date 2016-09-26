import {Observable} from 'rxjs/Rx';
import {BaseController} from './BaseController';
declare var User: any;

class UserController extends BaseController{
  constructor() {
    super();
  }

  destroyAll(req, res) {
    let destroy$ = (x: any) => {
      return Observable.fromPromise(User.destroy({id: x.id}))
    };

    let find$: Observable<any> = Observable.fromPromise(User.find({}));

    find$
      .mergeMap(users => Observable.from(users))
      .mergeMap((user: any) => {
        return destroy$(user).map(x => x[0])
      })
      .subscribe((destroyedUser: any) => {
        User.publishDestroy(destroyedUser.id, req, {previous: destroyedUser});
      }, err => res.negotiate(err), () => res.json({status: 'Real@ Nice!!!!?!'}));
  }
}

module.exports = new UserController();
