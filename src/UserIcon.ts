/**
 * name
 */
class UserIcon extends egret.Sprite implements IJCTransform {
    private bg: CircleShape;
    private theMask: CircleShape;
    private userIcon:egret.Bitmap;
    private shape:p2.Circle;
    public static RING_WIDTH:number = 8;
    

    constructor(parameters) {
        super();
        this.shape = parameters["shape"];
        this.bg = new CircleShape(
            {
                color: SceneIntroAnimation.THEME_COLOR_PINK,
                radius: SceneIntroAnimation.RADIUS_SMALL
            });
        this.addChild(this.bg);
        

        

        this.userIcon = new egret.Bitmap(RES.getRes("user_icon_"+parameters["id"]+"_png"));
        this.userIcon.touchEnabled = false;
        this.userIcon.cacheAsBitmap = true;
        this.userIcon.height = this.userIcon.width = 
        SceneIntroAnimation.RADIUS_SMALL * 2 - UserIcon.RING_WIDTH * 2;
        this.userIcon.anchorOffsetY = this.userIcon.anchorOffsetX = this.userIcon.height/2;
        this.addChild(this.userIcon);
        // this.theMask = new CircleShape({
        //     color: SceneIntroAnimation.THEME_COLOR_PINK,
        //     radius: SceneIntroAnimation.RADIUS_SMALL - UserIcon.RING_WIDTH
        // });
        // this.addChild(this.theMask);
        // this.userIcon.mask = this.theMask;
        let weakSelf = this;
        setTimeout(function() {
            weakSelf.scaleTo(0.5,800);
        }, 2000);

        

    }
    public scaleTo(v:number,duration:number):void{
        egret.Tween.get(this).to({scaleX:v,scaleY:v},duration,egret.Ease.quadInOut);
        egret.Tween.get(this.shape).to({radius:SceneIntroAnimation.RADIUS_SMALL * v},
                            duration,egret.Ease.quadInOut);
    }
    public scaleToEase(v:number,duration:number,ease:Function){
        
    }
}