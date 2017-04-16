/**
 * UserBubble extends egret.Sprite
 */
class UserBubble extends p2.Body {

    private target: p2.Body;
    private root: SceneTheOnlyOne;



    constructor(parameters, config = null) {
        super(parameters);
        if (config) {
            this.target = config["target"];
            this.root = config["root"];
            let theShape: p2.Circle = new p2.Circle({
                radius: SceneTheOnlyOne.RADIUS_SMALL,
                material: new p2.Material((this.root.bodies.length + 1))
            });


            let cm: p2.ContactMaterial = new p2.ContactMaterial(
                theShape.material,
                this.target.shapes[0].material);
            cm.restitution = 0;
            cm.friction = 10;
            cm.frictionRelaxation = 10;
            cm.frictionStuffness = 10;
            cm.surfaceVelocity = 0.3;
            cm.stiffness = Number.MAX_VALUE;
            this.root.p2World.addContactMaterial(cm);
            let theDisplay: CircleShape = new CircleShape(
                {
                    color: 0xffffff,
                    radius: SceneTheOnlyOne.RADIUS_SMALL
                });
            theDisplay.x = this.position[0];
            theDisplay.y = this.root.stage.stageHeight - this.position[1];
            this.displays = [theDisplay];
            this.root.addChild(theDisplay);
            this.addShape(theShape);
        }

    }
}