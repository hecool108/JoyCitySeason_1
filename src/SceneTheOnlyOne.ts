/**
 * SceneTheOnlyOne extends egret.Sprite
 */
class SceneTheOnlyOne extends egret.Sprite {
    private static RADIUS_LARGE: number = 120;
    private static RADIUS_SMALL: number = 20;


    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }
    private onAddToStage(): void {
        this.createP2();
        this.createDebugView();
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        let weakSelf = this;
        setInterval(()=>{
            weakSelf.addUserIcon();
        },1000);
    }

    private createDebugView(): void {
        this.debugDraw = new p2DebugDraw(this.p2World);
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw.setSprite(sprite);
    }

    private p2World: p2.World;
    private bodies: p2.Body[];
    private joyCityLogoBall: UserBubble;
    private timeStep: number;
    private debugDraw: p2DebugDraw;
    private createP2(): void {
        this.bodies = [];
        this.p2World = new p2.World({
            gravity: [0, 0]
        });
        this.timeStep = 1 / 60;

        this.joyCityLogoBall = new UserBubble({
            type: p2.Body.KINEMATIC,
            mass: 1,
            position: [this.stage.stageWidth / 2, this.stage.stageHeight / 2]
        });

        let theShape: p2.Circle = new p2.Circle({
            radius: SceneTheOnlyOne.RADIUS_LARGE
        });

        let theDisplay: CircleShape = new CircleShape(
            {
                color: 0xffffff,
                radius: SceneTheOnlyOne.RADIUS_LARGE
            });
        theDisplay.x = this.joyCityLogoBall.position[0];
        theDisplay.y = this.stage.stageHeight - this.joyCityLogoBall.position[1];
        this.addChild(theDisplay);
        this.joyCityLogoBall.displays = [theDisplay];
        this.joyCityLogoBall.addShape(theShape);
        this.p2World.addBody(this.joyCityLogoBall);
    }
    private rp:egret.Point;
    private randomOutOfStage():egret.Point{
        if(this.rp == null){
            this.rp = new egret.Point();
        }
        let dr:number = Math.random() * 360;
        let r:number = this.stage.stageHeight/2;
        let d2rv = this.d2r(dr);
        this.rp.x = this.stage.stageWidth/2 +  r* Math.cos(d2rv);
        this.rp.y = this.stage.stageHeight/2 + r * Math.sin(d2rv);
        return this.rp;
    }
    private addUserIcon(): void {

        let pTo:egret.Point = this.randomOutOfStage();

        let icon = new UserBubble({
            type: p2.Body.DYNAMIC,
            mass: 1,
            position: [pTo.x,pTo.y]
        });

        let theShape: p2.Circle = new p2.Circle({
            radius: SceneTheOnlyOne.RADIUS_SMALL
        });

        let theDisplay: CircleShape = new CircleShape(
            {
                color: 0xffffff,
                radius: SceneTheOnlyOne.RADIUS_SMALL
            });
        theDisplay.x = icon.position[0];
        theDisplay.y = this.stage.stageHeight - icon.position[1];
        this.addChild(theDisplay);
        icon.displays = [theDisplay];
        icon.addShape(theShape);
        this.p2World.addBody(icon);
        this.bodies.push(icon);
    }
    private loop(e): void {
        this.p2World.step(this.timeStep);
        this.p2World.step(this.timeStep * 20);
        let weakSelf = this;
        let ballDisplay = this.joyCityLogoBall.displays[0];
        ballDisplay.x = this.joyCityLogoBall.position[0];
        ballDisplay.y = this.stage.stageHeight - this.joyCityLogoBall.position[1];
        ballDisplay.rotation = this.joyCityLogoBall.angle * 180 / Math.PI;

        this.bodies.forEach((b: p2.Body) => {
            let ballDisplay = b.displays[0];
            ballDisplay.x = b.position[0];
            ballDisplay.y = this.stage.stageHeight - b.position[1];
            ballDisplay.rotation = b.angle * 180 / Math.PI;
            weakSelf.accelerateToObject(b, weakSelf.joyCityLogoBall, 30);
            
        });
    }

    private accelerateToObject(obj1: p2.Body, obj2: p2.Body, speed: number) {
        if (typeof speed === 'undefined') { speed = 60; }
        var angle = Math.atan2(obj2.position[1] - obj1.position[1],
            obj2.position[0] - obj1.position[0]);
        obj1.angle = angle + this.d2r(90);
        obj1.force[0] = Math.cos(angle) * speed;
        obj1.force[1] = Math.sin(angle) * speed;
    }
    private d2r(d):number{
        return 0.0174532925 * d;
    }


}