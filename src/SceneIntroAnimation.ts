/**
 * SceneIntroAnimation extends egret.Sprite
 */
class SceneIntroAnimation extends egret.Sprite {
    public static RADIUS_LARGE: number = 200;
    public static RADIUS_SMALL: number = 64;
    public static BALL_SPEED: number = 600;
    public static THEME_COLOR_PINK: number = 0xff0091;

    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }
    private createIntroMask(): void {
        this.startMask = new CircleShape({
            color: 0xffffff,
            radius: this.stage.stageHeight
        });
        this.startMask.x = this.stage.stageWidth / 2;
        this.startMask.y = this.stage.stageHeight / 2;
        this.addChild(this.startMask);

        let weakSelf = this;
        let sTo: number = SceneIntroAnimation.RADIUS_LARGE / this.stage.stageHeight;
        setTimeout(function () {
            egret.Tween.get(weakSelf.startMask).to({ scaleX: sTo, scaleY: sTo }
                , 800, egret.Ease.quartInOut).call(() => {
                    weakSelf.createP2();
                    weakSelf.createDebugView();
                });
        }, 500);
    }
    private onAddToStage(): void {
        this.createIntroMask();
        this.createBG();
    }
    private curtain: CurtainBitmap;
    private startMask: CircleShape;
    private createBG(): void {
        this.curtain = new CurtainBitmap({
            resourceName: "intro_bg_jpg",
            fadeIn: false,
            centerLayout: false
        });
        this.addChildAt(this.curtain, 0);
        this.curtain.mask = this.startMask;
    }


    private createDebugView(): void {
        this.debugDraw = new p2DebugDraw(this.p2World);
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw.setSprite(sprite);
    }





    public p2World: p2.World;
    public bodies: p2.Body[];
    private logoBall: ImageBubbleBody;
    private logoBallDisplay: LogoBall;

    private timeStep: number;
    private debugDraw: p2DebugDraw;

    private createP2(): void {
        this.bodies = [];
        this.p2World = new p2.World({
            gravity: [0, 0]
        });
        this.timeStep = 1 / 60;

        this.logoBall = new ImageBubbleBody({
            type: p2.Body.KINEMATIC,
            mass: 1,
            position: [this.stage.stageWidth / 2,
            this.stage.stageHeight / 2]
        });

        let theShape: p2.Circle = new p2.Circle({
            radius: SceneIntroAnimation.RADIUS_LARGE,
            material: new p2.Material(1000)
        });

        this.logoBallDisplay = new LogoBall(theShape);
        this.logoBallDisplay.x = this.logoBall.position[0];
        this.logoBallDisplay.y = this.stage.stageHeight - this.logoBall.position[1];
        this.logoBallDisplay.once(LogoBall.READY, this.onLogoReady, this);
        this.logoBallDisplay.once(LogoBall.DONE, this.onLogoDone, this);
        this.addChild(this.logoBallDisplay);
        this.logoBall.displays = [this.logoBallDisplay];
        this.logoBall.addShape(theShape);
        this.p2World.addBody(this.logoBall);
    }
    private onLogoReady(e): void {
        this.removeChild(this.curtain);
        let weakSelf = this;
        this.startP2();
        let addUserTimer = setInterval(() => {
            if(weakSelf.addUserIcon() > 37){
                clearInterval(addUserTimer);
            }
        }, 200);
    }
    private onLogoDone(e):void{
        let weakSelf = this;
        setTimeout(function() {
            weakSelf.stopP2();
            weakSelf.parent.removeChild(weakSelf);
        }, 1200);
        setTimeout(function() {
            weakSelf.dispatchEventWith(LogoBall.DONE);
        }, 300);
    }


    private startP2(): void {
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    }

    private stopP2(): void {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    }



    private rp: egret.Point;
    private randomOutOfStage(): egret.Point {
        if (this.rp == null) {
            this.rp = new egret.Point();
        }
        let dr: number = Math.random() * 360;
        let r: number = this.stage.stageHeight;
        let d2rv = this.d2r(dr);
        this.rp.x = this.stage.stageWidth / 2 + r * Math.cos(d2rv);
        this.rp.y = this.stage.stageHeight / 2 + r * Math.sin(d2rv);
        return this.rp;
    }
    private addUserIcon(): number {

        let pTo: egret.Point = this.randomOutOfStage();

        let icon = new ImageBubbleBody({
            type: p2.Body.DYNAMIC,
            mass: 1,
            position: [pTo.x, pTo.y]
        }, {
                target: this.logoBall,
                root: this
            });
        this.p2World.addBody(icon);
        this.bodies.push(icon);
        return this.bodies.length;
    }
    private loop(e): void {
            this.p2World.step(this.timeStep);
            let weakSelf = this;
            let ballDisplay = this.logoBall.displays[0];
            ballDisplay.x = this.logoBall.position[0];
            ballDisplay.y = this.stage.stageHeight - this.logoBall.position[1];
            ballDisplay.rotation = this.logoBall.angle * 180 / Math.PI;

            this.bodies.forEach((b: p2.Body) => {
                let ballDisplay = b.displays[0];
                ballDisplay.x = b.position[0];
                ballDisplay.y = this.stage.stageHeight - b.position[1];
                ballDisplay.rotation = b.angle * 180 / Math.PI;
                weakSelf.accelerateToObject(b, weakSelf.logoBall, SceneIntroAnimation.BALL_SPEED);

            });
    }

    private accelerateToObject(obj1: p2.Body, obj2: p2.Body, speed: number) {
        if (typeof speed === 'undefined') { speed = SceneIntroAnimation.BALL_SPEED; }
        var angle = Math.atan2(obj2.position[1] - obj1.position[1],
            obj2.position[0] - obj1.position[0]);
        obj1.angle = angle + this.d2r(90);
        obj1.force[0] = Math.cos(angle) * speed;
        obj1.force[1] = Math.sin(angle) * speed;
    }
    private d2r(d): number {
        return 0.0174532925 * d;
    }

    get width(): number {
        return this.stage.stageWidth;
    }
    get height(): number {
        return this.stage.stageHeight;
    }

}