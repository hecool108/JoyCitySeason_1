var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * SceneTheOnlyOne extends egret.Sprite
 */
var SceneTheOnlyOne = (function (_super) {
    __extends(SceneTheOnlyOne, _super);
    function SceneTheOnlyOne() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    SceneTheOnlyOne.prototype.onAddToStage = function () {
        this.createP2();
        this.createDebugView();
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        var weakSelf = this;
        setInterval(function () {
            weakSelf.addUserIcon();
        }, 1000);
    };
    SceneTheOnlyOne.prototype.createDebugView = function () {
        this.debugDraw = new p2DebugDraw(this.p2World);
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw.setSprite(sprite);
    };
    SceneTheOnlyOne.prototype.createP2 = function () {
        this.bodies = [];
        this.p2World = new p2.World({
            gravity: [0, 0]
        });
        this.timeStep = 1 / 60;
        this.joyCityLogoBall = new UserBubble({
            type: p2.Body.KINEMATIC,
            mass: 1,
            position: [this.stage.stageWidth / 2, this.stage.stageHeight / 2]
        });
        var theShape = new p2.Circle({
            radius: SceneTheOnlyOne.RADIUS_LARGE
        });
        var theDisplay = new CircleShape({
            color: 0xffffff,
            radius: SceneTheOnlyOne.RADIUS_LARGE
        });
        theDisplay.x = this.joyCityLogoBall.position[0];
        theDisplay.y = this.stage.stageHeight - this.joyCityLogoBall.position[1];
        this.addChild(theDisplay);
        this.joyCityLogoBall.displays = [theDisplay];
        this.joyCityLogoBall.addShape(theShape);
        this.p2World.addBody(this.joyCityLogoBall);
    };
    SceneTheOnlyOne.prototype.randomOutOfStage = function () {
        if (this.rp == null) {
            this.rp = new egret.Point();
        }
        var dr = Math.random() * 360;
        var r = this.stage.stageHeight / 2;
        var d2rv = this.d2r(dr);
        this.rp.x = this.stage.stageWidth / 2 + r * Math.cos(d2rv);
        this.rp.y = this.stage.stageHeight / 2 + r * Math.sin(d2rv);
        return this.rp;
    };
    SceneTheOnlyOne.prototype.addUserIcon = function () {
        var pTo = this.randomOutOfStage();
        var icon = new UserBubble({
            type: p2.Body.DYNAMIC,
            mass: 1,
            position: [pTo.x, pTo.y]
        });
        var theShape = new p2.Circle({
            radius: SceneTheOnlyOne.RADIUS_SMALL
        });
        var theDisplay = new CircleShape({
            color: 0xffffff,
            radius: SceneTheOnlyOne.RADIUS_SMALL
        });
        theDisplay.x = icon.position[0];
        theDisplay.y = this.stage.stageHeight - icon.position[1];
        this.addChild(theDisplay);
        icon.displays = [theDisplay];
        icon.addShape(theShape);
        this.p2World.addBody(icon);
        this.bodies.push(icon);
    };
    SceneTheOnlyOne.prototype.loop = function (e) {
        var _this = this;
        this.p2World.step(this.timeStep);
        this.p2World.step(this.timeStep * 20);
        var weakSelf = this;
        var ballDisplay = this.joyCityLogoBall.displays[0];
        ballDisplay.x = this.joyCityLogoBall.position[0];
        ballDisplay.y = this.stage.stageHeight - this.joyCityLogoBall.position[1];
        ballDisplay.rotation = this.joyCityLogoBall.angle * 180 / Math.PI;
        this.bodies.forEach(function (b) {
            var ballDisplay = b.displays[0];
            ballDisplay.x = b.position[0];
            ballDisplay.y = _this.stage.stageHeight - b.position[1];
            ballDisplay.rotation = b.angle * 180 / Math.PI;
            weakSelf.accelerateToObject(b, weakSelf.joyCityLogoBall, 30);
        });
    };
    SceneTheOnlyOne.prototype.accelerateToObject = function (obj1, obj2, speed) {
        if (typeof speed === 'undefined') {
            speed = 60;
        }
        var angle = Math.atan2(obj2.position[1] - obj1.position[1], obj2.position[0] - obj1.position[0]);
        obj1.angle = angle + this.d2r(90);
        obj1.force[0] = Math.cos(angle) * speed;
        obj1.force[1] = Math.sin(angle) * speed;
    };
    SceneTheOnlyOne.prototype.d2r = function (d) {
        return 0.0174532925 * d;
    };
    return SceneTheOnlyOne;
}(egret.Sprite));
SceneTheOnlyOne.RADIUS_LARGE = 120;
SceneTheOnlyOne.RADIUS_SMALL = 20;
__reflect(SceneTheOnlyOne.prototype, "SceneTheOnlyOne");
//# sourceMappingURL=SceneTheOnlyOne.js.map