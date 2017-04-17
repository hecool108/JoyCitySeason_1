/**
 * CurtainImage extends egret.Bitmap
 */
class CurtainBitmap extends egret.Bitmap {
    parameters;
    constructor(parameters) {
        super(RES.getRes(parameters["resourceName"]));
        this.parameters = parameters;
        if(this.parameters["fadeIn"]){
            this.alpha = 0;
        }

        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(e):void{
        let rate:number = this.width/this.height;
        if(rate < 1){
            this.height = this.parent.height;
            this.width = rate * this.height;
        }else{
            this.width = this.parent.width;
            this.height = this.width / rate;
        }
        if(this.parameters["centerLayout"]){
            this.x = (this.parent.width - this.width)/2;
            this.y = (this.parent.height - this.height)/2;
        }
        if(this.parameters["fadeIn"]){
            let weakSelf = this;
            setTimeout(function() {
                egret.Tween.get(weakSelf).to({alpha:1},500);    
            }, 500);
        }
    }
}