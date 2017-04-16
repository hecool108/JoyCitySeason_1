var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * UserBubble extends egret.Sprite
 */
var UserBubble = (function (_super) {
    __extends(UserBubble, _super);
    function UserBubble(parameters, config) {
        if (config === void 0) { config = null; }
        var _this = _super.call(this, parameters) || this;
        if (config) {
            _this.target = config["target"];
            _this.root = config["root"];
            var theShape = new p2.Circle({
                radius: SceneTheOnlyOne.RADIUS_SMALL,
                material: new p2.Material((_this.root.bodies.length + 1))
            });
            var cm = new p2.ContactMaterial(theShape.material, _this.target.shapes[0].material);
            cm.restitution = 0;
            cm.friction = 10;
            cm.frictionRelaxation = 10;
            cm.frictionStuffness = 10;
            cm.surfaceVelocity = 0.3;
            cm.stiffness = Number.MAX_VALUE;
            _this.root.p2World.addContactMaterial(cm);
            var theDisplay = new CircleShape({
                color: 0xffffff,
                radius: SceneTheOnlyOne.RADIUS_SMALL
            });
            theDisplay.x = _this.position[0];
            theDisplay.y = _this.root.stage.stageHeight - _this.position[1];
            _this.displays = [theDisplay];
            _this.root.addChild(theDisplay);
            _this.addShape(theShape);
        }
        return _this;
    }
    return UserBubble;
}(p2.Body));
__reflect(UserBubble.prototype, "UserBubble");
//# sourceMappingURL=UserBubble.js.map