/**
 * CircleShape extends egret.Shape
 */
class CircleShape extends egret.Shape {
    constructor(parameters) {
        super();
        this.graphics.beginFill(parameters["color"],1);
        this.graphics.drawCircle(0,0,parameters["radius"]);
        this.graphics.endFill();
    }
}