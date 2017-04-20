class ScenePerks extends egret.Sprite {
    private ring: egret.Sprite;
    private cornerLogo: egret.Bitmap;
    public static PLANET_COUNT:number = 4;

    private planets: PlanetButton[];

    private touchCover: egret.Shape;
    constructor() {
        super();
        this.planets = [];
        this.showingPerk = false;
        this.moved = false;
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(e): void {

        this.cornerLogo = new egret.Bitmap(RES.getRes("event_logo_corner_png"));
        this.cornerLogo.anchorOffsetX = this.cornerLogo.width / 2;
        this.cornerLogo.anchorOffsetY = this.cornerLogo.height / 2;
        this.cornerLogo.scaleX = this.cornerLogo.scaleY = 0.2;
        this.cornerLogo.alpha = 0;
        this.cornerLogo.x = 120;
        this.cornerLogo.y = 150;
        this.addChild(this.cornerLogo);

        this.touchCover = new egret.Shape();
        this.touchCover.graphics.beginFill(0, 0);
        this.touchCover.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.touchCover.graphics.endFill();
        this.addChild(this.touchCover);

        let raduis: number = this.stage.stageHeight / 3;
        this.ring = new egret.Sprite();
        this.ring.graphics.lineStyle(3, 0xb5cbfd);
        this.ring.graphics.drawCircle(0, 0, raduis);
        this.ring.x = this.stage.stageWidth + raduis * 2 + 3;
        this.ring.y = this.stage.stageHeight / 1.7;
        this.addChild(this.ring);
        let startDegree: number = 0;
        let degreesStep: number = 360 / ScenePerks.PLANET_COUNT;
        for (var i = 0; i < ScenePerks.PLANET_COUNT; i++) {
            let planet: PlanetButton = new PlanetButton(
                {
                    raduis: raduis,
                    res: "planet_" + (i + 1) + "_png",
                    degree: startDegree,
                    index: i
                });
            startDegree -= degreesStep;
            planet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlanetTap, this);
            this.ring.addChild(planet);
            this.planets.push(planet);
        }

        egret.Tween.get(this.ring).to({ x: this.stage.stageWidth },
            1000, egret.Ease.backInOut);
        let weakSelf = this;
        egret.Tween.get(this.cornerLogo).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 300, egret.Ease.backOut).call(() => {
        });

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRingTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRingTouchEnd, this);


        weakSelf.startSpinning();
    }
    private touchStartY: number;
    private touchStartRotation: number;
    private moved:boolean;
    private onRingTouchBegin(e: egret.TouchEvent): void {
        this.touchStartY = e.stageY;
        this.touchStartRotation = this.ring.rotation;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onRingTouchMove, this);
        this.stopSpinning();
        
    }
    private onRingTouchMove(e: egret.TouchEvent): void {
        let diff = (e.stageY - this.touchStartY);
        if (diff > 0) {
            this.ring.rotation -= 2;
        } else {
            this.ring.rotation += 2;
        }
        let weakSelf = this;
        this.planets.forEach(element => {
            element.naturalMe(weakSelf.ring);
        });
        this.touchStartY = e.stageY;
        this.moved = true;
    }
    private onRingTouchEnd(e: egret.TouchEvent): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onRingTouchMove, this);
        let weakSelf = this;
        setTimeout(function() {
            weakSelf.moved = false;
        }, 100);
        setTimeout(function() {
            weakSelf.startSpinning();
        }, 1000);
    }


    private d2r(d): number {
        return 0.0174532925 * d;
    }
    private perkBox: egret.Sprite;
    private perkBitmap: egret.Bitmap;
    private perkRetunBitmap: egret.Bitmap;
    private onPlanetTap(e: egret.TouchEvent): void {
        if(this.moved){
            this.moved = false;
            return;
        }
        let planet: PlanetButton = e.currentTarget;
        this.showPerkBox(planet.index + 1);
    }
    private showingPerk: boolean;
    private showPerkBox(to: number): void {
        if (this.showingPerk) return;
        this.showingPerk = true;
        if (this.perkBox == null) {
            this.perkBox = new egret.Sprite();
            this.addChildAt(this.perkBox, 0);
            this.perkBox.alpha = 0;
            this.perkBox.scaleX = this.perkBox.scaleY = 0.5;
            this.perkBox.x = this.perkBox.anchorOffsetX = this.stage.stageWidth / 2;
            this.perkBox.anchorOffsetY = this.stage.stageHeight / 2;
            this.perkBox.y = this.perkBox.anchorOffsetY * 0.95;
            this.perkBitmap = new egret.Bitmap(RES.getRes("perk_" + to + "_jpg"));
            this.perkBox.addChildAt(this.perkBitmap, this.getChildIndex(this.ring));

            this.perkRetunBitmap = new egret.Bitmap(RES.getRes("return_button_png"));
            this.perkBox.addChild(this.perkRetunBitmap);
            this.perkRetunBitmap.touchEnabled = true;
            this.perkRetunBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hidePerkBox, this);
        } else {
            this.perkBitmap.texture = RES.getRes("perk_" + to + "_jpg");
        }
        this.perkBitmap.x = (this.stage.stageWidth - this.perkBitmap.width) / 2;
        this.perkBitmap.y = (this.stage.stageHeight - this.perkBitmap.height) / 2;
        this.perkRetunBitmap.x = (this.stage.stageWidth - this.perkRetunBitmap.width) / 2;
        this.perkRetunBitmap.y = this.perkBitmap.y + this.perkBitmap.height + 20;
        let weakSelf = this;
        egret.Tween.get(this.perkBox).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500, egret.Ease.quartInOut);
        egret.Tween.get(this.cornerLogo).to({ alpha: 0, scaleX: 0.2, scaleY: 0.2 }, 500, egret.Ease.quartInOut);
        egret.Tween.get(this.ring).to({
            alpha: 0, scaleX: 1.5, scaleY: 1.5,
            x: this.stage.stageWidth + this.stage.stageHeight / 3 + 3
        }, 500, egret.Ease.quartInOut).call(() => {
            weakSelf.ring.visible = false;
        });
    }
    private hidePerkBox(e): void {
        if (!this.showingPerk) return;
        this.showingPerk = false;
        this.ring.visible = true;
        egret.Tween.get(this.cornerLogo).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500, egret.Ease.quartInOut);
        egret.Tween.get(this.perkBox).to({ alpha: 0, scaleX: 0.5, scaleY: 0.5 }, 500, egret.Ease.quartInOut);
        egret.Tween.get(this.ring).to({ alpha: 1, scaleX: 1, scaleY: 1, x: this.stage.stageWidth }, 500, egret.Ease.quartInOut);
    }
    private startSpinning(): void {
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.spinning = true;
    }
    private stopSpinning(): void {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.spinning = false;
    }
    private spinning: boolean;


    private loop(e): void {
        if (this.spinning) {
            this.ring.rotation -= 0.2;
            let weakSelf = this;
            this.planets.forEach(element => {
                element.naturalMe(weakSelf.ring);
            });
        }
    }
}