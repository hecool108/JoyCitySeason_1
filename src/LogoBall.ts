/**
 * LogoBall 
 */
class LogoBall extends egret.Sprite implements IJCTransform {
    public static READY: string = "letTheDragonConsumeYou";
    public static DONE: string = "weWillWeWillRockU";



    private bg: CircleShape;
    private theMask: CircleShape;
    private joycityLogo: egret.Bitmap;
    private eventLogo: egret.Bitmap;

    private currentLogo:egret.Bitmap;
    private targetLogo:egret.Bitmap;
    private shape:p2.Circle;

    constructor(shape:p2.Circle) {
        super();
        this.waveCount = 0;
        this.alpha = 0;
        this.shape = shape;
        this.bg = new CircleShape({
            color: SceneIntroAnimation.THEME_COLOR_PINK,
            radius: SceneIntroAnimation.RADIUS_LARGE
        });

        this.addChild(this.bg);

        this.joycityLogo = new egret.Bitmap(RES.getRes("joy_city_logo_png"));
        this.joycityLogo.anchorOffsetX = this.joycityLogo.width / 2;
        this.joycityLogo.anchorOffsetY = this.joycityLogo.height / 2;
        let sTo = (SceneIntroAnimation.RADIUS_LARGE * 2) / (this.joycityLogo.height + 80);
        this.joycityLogo.scaleX = this.joycityLogo.scaleY = sTo;
        this.joycityLogo.y = SceneIntroAnimation.RADIUS_LARGE * 2;



        this.eventLogo = new egret.Bitmap(RES.getRes("event_logo_png"));
        this.eventLogo.anchorOffsetX = this.eventLogo.width / 2;
        this.eventLogo.anchorOffsetY = this.eventLogo.height / 2;
        sTo = (SceneIntroAnimation.RADIUS_LARGE * 2) / (this.eventLogo.height + 80);

        this.eventLogo.scaleX = this.eventLogo.scaleY = sTo;
        this.eventLogo.y = SceneIntroAnimation.RADIUS_LARGE * 2;


        this.addChild(this.joycityLogo);
        this.addChild(this.eventLogo);



        this.theMask = new CircleShape({
            color: SceneIntroAnimation.THEME_COLOR_PINK,
            radius: SceneIntroAnimation.RADIUS_LARGE
        });
        this.addChild(this.theMask);
        this.mask = this.theMask;

        egret.Tween.get(this).to({ alpha: 1 }, 300, egret.Ease.quartInOut);
        egret.Tween.get(this.joycityLogo).wait(300)
            .to({ y: 0 }, 300, egret.Ease.backInOut).wait(2000).call(() => {
                weakSelf.dispatchEventWith(LogoBall.READY);
            }).
            to({ y: -SceneIntroAnimation.RADIUS_LARGE * 2 },
            300, egret.Ease.backInOut);

        let weakSelf = this;
        egret.Tween.get(this.eventLogo).wait(2600)
            .to({ y: 0 }, 300, egret.Ease.backInOut).call(()=>{
            weakSelf.scaleTo(0.75,10000);
        }).wait(10000).call(()=>{
            weakSelf.wave();
        }); 
    }
    private waveCount:number;
    private wave():void{
        // SoundPlayer.getPlayer().playSound("sf1_mp3");
        this.waveCount++;
        let weakSelf = this;
        weakSelf.flipTo("slogan_"+weakSelf.waveCount+"_png");
        egret.Tween.get(this).call(()=>{
            weakSelf.scaleToEase(1 + this.waveCount * 0.1,300,egret.Ease.backInOut);
            
        }).wait(1200).call(()=>{
            weakSelf.scaleToEase(0.75,600,egret.Ease.quadInOut);
        })

        if(this.waveCount < 3){
            setTimeout(function() {
                weakSelf.wave();
            }, 3300);
        }else{
            setTimeout(function() {
                egret.Tween.get(weakSelf).to({scaleX:3,scaleY:3,alpha:0},1200,egret.Ease.backInOut);
                egret.Tween.get(weakSelf.shape).to({radius:SceneIntroAnimation.RADIUS_LARGE * 3},
                1200,egret.Ease.backInOut);    
                weakSelf.dispatchEventWith(LogoBall.DONE);
            }, 3300);
        }
    }
    private flipTo(res:string):void{
        if(this.targetLogo == null){
            this.targetLogo = this.joycityLogo;
            this.currentLogo = this.eventLogo;
            this.targetLogo.width = this.currentLogo.width;
            this.targetLogo.height = this.currentLogo.height;
            this.targetLogo.scaleX = this.targetLogo.scaleY =  this.currentLogo.scaleX * 0.9;
        }else{
            if(this.targetLogo == this.joycityLogo){
                this.targetLogo = this.eventLogo;
                this.currentLogo = this.joycityLogo;
            }
            else{
                this.targetLogo = this.joycityLogo;
                this.currentLogo = this.eventLogo;
            }
        }
        this.targetLogo.y = SceneIntroAnimation.RADIUS_LARGE * 2;
        this.targetLogo.texture = RES.getRes(res);
        this.targetLogo.anchorOffsetX = this.targetLogo.width / 2;
        this.targetLogo.anchorOffsetY = this.targetLogo.height / 2;

        egret.Tween.get(this.targetLogo).to({y:0},300,egret.Ease.backInOut);
        egret.Tween.get(this.currentLogo).to({y:-SceneIntroAnimation.RADIUS_LARGE * 2},300,egret.Ease.backInOut);

    }
    public scaleTo(v:number,duration:number){
        
        egret.Tween.get(this).to({scaleX:v,scaleY:v},duration,egret.Ease.quadInOut);
        egret.Tween.get(this.shape).to({radius:SceneIntroAnimation.RADIUS_LARGE * v},duration,egret.Ease.quadInOut);
    }
    public scaleToEase(v:number,duration:number,ease:Function){
        egret.Tween.get(this).to({scaleX:v,scaleY:v},duration,ease);
        egret.Tween.get(this.shape).to({radius:SceneIntroAnimation.RADIUS_LARGE * v},duration,ease);
    }
}