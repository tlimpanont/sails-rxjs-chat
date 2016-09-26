"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rx_1 = require('rxjs/Rx');
var BaseController_1 = require('./BaseController');
var UserController = (function (_super) {
    __extends(UserController, _super);
    function UserController() {
        _super.call(this);
    }
    UserController.prototype.destroyAll = function (req, res) {
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
            User.publishDestroy(destroyedUser.id, req, { previous: destroyedUser });
        }, function (err) { return res.negotiate(err); }, function () { return res.json({ status: 'Real@ Nice!!!!?!' }); });
    };
    return UserController;
}(BaseController_1.BaseController));
module.exports = new UserController();
//# sourceMappingURL=UserController.js.map