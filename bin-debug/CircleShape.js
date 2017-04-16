var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * CircleShape extends egret.Shape
 */
var CircleShape = (function (_super) {
    __extends(CircleShape, _super);
    function CircleShape(parameters) {
        var _this = _super.call(this) || this;
        _this.graphics.beginFill(parameters["color"], 1);
        _this.graphics.drawCircle(0, 0, parameters["radius"]);
        _this.graphics.endFill();
        return _this;
    }
    return CircleShape;
}(egret.Shape));
__reflect(CircleShape.prototype, "CircleShape");
//# sourceMappingURL=CircleShape.js.map