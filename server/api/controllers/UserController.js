"use strict";
const Rx_1 = require('rxjs/Rx');
module.exports = {
    destroyAll: (req, res) => {
        let destroy$ = (x) => {
            return Rx_1.Observable.fromPromise(User.destroy({ id: x.id }));
        };
        let find$ = Rx_1.Observable.fromPromise(User.find({}));
        find$
            .mergeMap(users => Rx_1.Observable.from(users))
            .mergeMap((user) => {
            return destroy$(user).map(x => x[0]);
        })
            .subscribe((destroyedUser) => {
            User.publishDestroy(destroyedUser.id, req, {
                previous: destroyedUser
            });
        }, err => res.negotiate(err), () => res.json({ status: 'Real@ Nice!!!!?!' }));
    }
};
