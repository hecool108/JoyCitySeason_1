class ScenePerks extends egret.Sprite{
    private ring:egret.Sprite;
    private cornerLogo:egret.Bitmap;
    private planet_1:egret.Bitmap;
    private planet_2:egret.Bitmap;
    private planet_3:egret.Bitmap;
    constructor() {
        super();
        this.showingPerk = false;
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(e):void
    {
        
        this.cornerLogo = new egret.Bitmap(RES.getRes("event_logo_png"));
        this.cornerLogo.anchorOffsetX = this.cornerLogo.width/2;
        this.cornerLogo.anchorOffsetY = this.cornerLogo.height/2;
        this.cornerLogo.scaleX = this.cornerLogo.scaleY = 0.2;
        this.cornerLogo.alpha = 0;
        this.cornerLogo.x = 100;
        this.cornerLogo.y = 120;
        this.addChild(this.cornerLogo);


        let raduis:number = this.stage.stageHeight/3;
        this.ring = new egret.Sprite();
        this.ring.graphics.lineStyle(3,0xb5cbfd);
        this.ring.graphics.drawCircle(0,0,raduis);
        this.ring.x = this.stage.stageWidth + raduis + 3;
        this.ring.y = this.stage.stageHeight / 1.7;
        this.ring.rotation = -180;
        this.addChild(this.ring);

        let planet_1:egret.Bitmap = new egret.Bitmap(RES.getRes("planet_1_png"));
        planet_1.anchorOffsetX = planet_1.width/2;
        planet_1.anchorOffsetY = planet_1.height/2;
        let planet_2:egret.Bitmap = new egret.Bitmap(RES.getRes("planet_2_png"));
        planet_2.anchorOffsetX = planet_2.width/2;
        planet_2.anchorOffsetY = planet_2.height/2;
        let planet_3:egret.Bitmap = new egret.Bitmap(RES.getRes("planet_3_png"));
        planet_3.anchorOffsetX = planet_3.width/2;
        planet_3.anchorOffsetY = planet_3.height/2;
        planet_1.rotation = planet_2.rotation = planet_3.rotation = -180;
        this.ring.addChild(planet_1);
        this.ring.addChild(planet_2);
        this.ring.addChild(planet_3);

        planet_1.touchEnabled = planet_2.touchEnabled = planet_3.touchEnabled = true;
        planet_1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlanetTap,this);
        planet_2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlanetTap,this);
        planet_3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlanetTap,this);

        let r: number = raduis;
        let dr: number = 235;
        let d2rv = this.d2r(dr);
        planet_1.x =  r * Math.cos(d2rv);
        planet_1.y =  r * Math.sin(d2rv);
        dr = 180;
        d2rv = this.d2r(dr);
        planet_2.x =  r * Math.cos(d2rv);
        planet_2.y =  r * Math.sin(d2rv);
        dr = 120;
        d2rv = this.d2r(dr);
        planet_3.x =  r * Math.cos(d2rv);
        planet_3.y =  r * Math.sin(d2rv);

        this.planet_1 = planet_1;
        this.planet_2 = planet_1;
        this.planet_3 = planet_1;

        egret.Tween.get(this.ring).to({rotation:0,x:this.stage.stageWidth},
                    1000,egret.Ease.backInOut);
        egret.Tween.get(planet_1).to({rotation:0},1100,egret.Ease.quartInOut);
        egret.Tween.get(planet_2).to({rotation:0},1100,egret.Ease.quartInOut);
        egret.Tween.get(planet_3).to({rotation:0},1100,egret.Ease.quartInOut);

        egret.Tween.get(this.cornerLogo).to({scaleX:0.5,scaleY:0.5,alpha:1},300,egret.Ease.backOut);
    }
    private d2r(d): number {
        return 0.0174532925 * d;
    }
    private perkBox:egret.Sprite;
    private perkBitmap:egret.Bitmap;
    private perkRetunBitmap:egret.Bitmap;
    private onPlanetTap(e:egret.TouchEvent):void{
        let planet:egret.Bitmap = e.target;
        if(planet == this.planet_1){
            this.showPerkBox(1);
        }
        else if(planet == this.planet_1){
            this.showPerkBox(2);
        }else {
            this.showPerkBox(3);
        }
        
    }
    private showingPerk:boolean;
    private showPerkBox(to:number):void{
        if(this.showingPerk) return;
        this.showingPerk = true;
        if(this.perkBox == null){
            this.perkBox = new egret.Sprite();
            this.addChild(this.perkBox);
            this.perkBox.alpha = 0;
            this.perkBox.scaleX = this.perkBox.scaleY = 0.5;
            this.perkBox.x = this.perkBox.anchorOffsetX = this.stage.stageWidth / 2;
            this.perkBox.anchorOffsetY = this.stage.stageHeight / 2;
            this.perkBox.y =  this.perkBox.anchorOffsetY * 1.1;
            this.perkBitmap = new egret.Bitmap(RES.getRes("perk_"+to+"_jpg"));
            this.perkBox.addChildAt(this.perkBitmap,this.getChildIndex(this.ring));

            this.perkRetunBitmap = new egret.Bitmap(RES.getRes("return_button_png"));
            this.perkBox.addChild(this.perkRetunBitmap);
            this.perkRetunBitmap.touchEnabled = true;
            this.perkRetunBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hidePerkBox,this);



        }else{
            this.perkBitmap.texture = RES.getRes("perk_"+to+"_jpg");
        }
        this.perkBitmap.x = (this.stage.stageWidth - this.perkBitmap.width)/2;
        this.perkBitmap.y = (this.stage.stageHeight - this.perkBitmap.height)/2;
        this.perkRetunBitmap.x = (this.stage.stageWidth - this.perkRetunBitmap.width)/2;
        this.perkRetunBitmap.y = this.perkBitmap.y + this.perkBitmap.height + 20;
        egret.Tween.get(this.perkBox).to({alpha:1,scaleX:0.9,scaleY:0.9},500,egret.Ease.quartInOut);
        egret.Tween.get(this.ring).to({alpha:0,scaleX:1.5,scaleY:1.5,x:this.stage.stageWidth + this.stage.stageHeight/3 + 3 },500,egret.Ease.quartInOut);
    }
    private hidePerkBox(e):void{
        if(!this.showingPerk) return;
        this.showingPerk = false;
        egret.Tween.get(this.perkBox).to({alpha:0,scaleX:0.5,scaleY:0.5},500,egret.Ease.quartInOut);
        egret.Tween.get(this.ring).to({alpha:1,scaleX:1,scaleY:1,x:this.stage.stageWidth },500,egret.Ease.quartInOut);
    }
}