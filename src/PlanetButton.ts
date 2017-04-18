/**
 * name
 */
class PlanetButton extends egret.Bitmap {
    public index:number;
    constructor(parameters) {
        super(RES.getRes(parameters["res"]));
        this.index = parameters["index"];
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this.scaleX = this.scaleY = 0.6;
        this.touchEnabled = true;


        let r: number = parameters["raduis"];
        let dr: number = parameters["degree"];
        let d2rv = this.d2r(dr);
        this.x =  r * Math.cos(d2rv);
        this.y =  r * Math.sin(d2rv);
        this.rotation = -180;
        this.backToLevel();


    }
    public backToLevel():void{
        egret.Tween.get(this).to({rotation:0},1100,egret.Ease.quartInOut);
    }
    private d2r(d): number {
        return 0.0174532925 * d;
    }
    public startHover(delay:number){
        egret.Tween.get(this,{loop:true}).wait(delay)
            .to({scaleX:0.7,scaleY:0.7},800,egret.Ease.quadInOut)
            .to({scaleX:0.6,scaleY:0.6},800,egret.Ease.quadInOut);
    }
    public stopHover(){
        egret.Tween.removeTweens(this);
        egret.Tween.get(this)
            .to({scaleX:0.6,scaleY:0.6},500,egret.Ease.quadInOut);
    }
}