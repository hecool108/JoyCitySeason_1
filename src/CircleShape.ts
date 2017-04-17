/**
 * CircleShape extends egret.Shape
 */
class CircleShape extends egret.Sprite {
    parameters;
    constructor(parameters) {
        super();
        this.parameters = parameters;
        this.redraw();
    }
    private redraw():void{
        this.graphics.clear();
        this.graphics.beginFill(this.parameters["color"],1);
        this.graphics.drawCircle(0,0,this.parameters["radius"]);
        this.graphics.endFill();
    }
    set radius(v:number){
        this.parameters["radius"] = v;
        this.redraw();
    }
}