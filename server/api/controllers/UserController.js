"use strict";
var Rx_1 = require('rxjs/Rx');
module.exports = {
    destroyAll: function (req, res) {
        var destroy$ = function (x) {
            return Rx_1.Observable.fromPromise(User.destroy({ id: x.id }));
        };
        var find$ = Rx_1.Observable.fromPromise(User.find({}));
        find$
            .mergeMap(function (users) { return Rx_1.Observable.from(users); })
            .mergeMap(function (user) {
            return destroy$(user).map(function (x) { return x[0]; });
        })
            .subscribe(function (destroyedUser) {
            User.publishDestroy(destroyedUser.id, req, {
                previous: destroyedUser
            });
        }, function (err) { return res.negotiate(err); }, function () { return res.ok(); });
    }
};
