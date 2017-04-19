/**
 * name
 */
class PlanetButton extends egret.Sprite {
    public index:number;

    private static LABEL_TEXT:string[] = ["超值返现","团购特惠","整点抽奖","学生特权","逛吃有理"];
    private icon:egret.Bitmap;
    private label:egret.TextField;
    private parameters;
    constructor(parameters) {
        super();
        this.parameters = parameters;
        this.icon = new egret.Bitmap(RES.getRes(parameters["res"]));
        this.index = parameters["index"];
        this.icon.anchorOffsetX = this.icon.width/2;
        this.icon.anchorOffsetY = this.icon.height/2;
        this.addChild(this.icon);
        this.scaleX = this.scaleY = 1;
        
        // this.label = new egret.TextField();
        // this.label.textColor = 0xffffff;
        // this.label.width = this.icon.width;
        // this.label.text = PlanetButton.LABEL_TEXT[this.index];
        // this.label.textAlign = "center";
        // this.label.anchorOffsetX = this.icon.width/2;
        // this.label.anchorOffsetY = this.label.height/2;

        // this.addChild(this.label);
        
        
        this.touchEnabled = this.icon.touchEnabled = true;



        let r: number = parameters["raduis"];
        let dr: number = parameters["degree"];
        let d2rv = this.d2r(dr);
        this.x =  r * Math.cos(d2rv);
        this.y =  r * Math.sin(d2rv);
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(e):void{
        this.naturalMe(this.parent);
    }
    
    // public backToLevel():void{
    //     egret.Tween.get(this).to({rotation:0},1100,egret.Ease.quartInOut);
    // }
    private d2r(d): number {
        return 0.0174532925 * d;
    }
    // public startHover(delay:number){
    //     egret.Tween.get(this,{loop:true}).wait(delay)
    //         .to({scaleX:1.1,scaleY:1.1},800,egret.Ease.quadInOut)
    //         .to({scaleX:1,scaleY:1},800,egret.Ease.quadInOut);
    // }
    // public stopHover(){
    //     egret.Tween.removeTweens(this);
    //     egret.Tween.get(this)
    //         .to({scaleX:1,scaleY:1},500,egret.Ease.quadInOut);
    // }
    public naturalMe(theRing:egret.DisplayObject):void{
         this.rotation = -theRing.rotation;
         
         
        //  let xCurrent = theRing.x - this.localToGlobal(this.x,this.y).x;
        //  let scaleTo = 1;
        //  if(xCurrent > 0){
        //      scaleTo = xCurrent / (this.stage.stageWidth) + 1;
        //      if(scaleTo < 1){
        //          scaleTo = 1;
        //      }
        //  }
        let r: number = this.parameters["raduis"];
        let dr: number = this.rotation - this.parameters["degree"];
        let d2rv = this.d2r(dr);
        let theX =  -r * Math.cos(d2rv);
        let scaleTo = (theX/this.parameters["raduis"] + 1) * 0.8;
             
        this.scaleX = this.scaleY = scaleTo;
    }
}