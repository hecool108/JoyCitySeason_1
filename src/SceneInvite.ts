/**
 * name
 */
class SceneInvite extends egret.Sprite {
    public static DONE: string = "theRealSlimShady";
    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(e): void {
        this.invitationBox = new egret.Sprite();
        this.addChild(this.invitationBox);
        this.invitationBox.alpha = 0;
        this.invitationBox.scaleX = this.invitationBox.scaleY = 0.5;
        this.invitationBox.x = this.invitationBox.anchorOffsetX = this.stage.stageWidth / 2;
        this.invitationBox.anchorOffsetY = this.stage.stageHeight / 2;
        this.invitationBox.y = this.invitationBox.anchorOffsetY;
        this.invitationBitmap = new egret.Bitmap(RES.getRes("invitation_jpg"));
        this.invitationBitmap.touchEnabled = true;
        this.invitationBox.addChild(this.invitationBitmap);

        // this.invitationRetunBitmap = new egret.Bitmap(RES.getRes("continue_button_png"));
        // this.invitationBox.addChild(this.invitationRetunBitmap);
        // this.invitationRetunBitmap.touchEnabled = true;
        this.invitationBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinue, this);

        this.invitationBitmap.x = (this.stage.stageWidth - this.invitationBitmap.width)/2;
        this.invitationBitmap.y = (this.stage.stageHeight - this.invitationBitmap.height)/2;
        // this.invitationRetunBitmap.x = (this.stage.stageWidth - this.invitationRetunBitmap.width)/2;
        // this.invitationRetunBitmap.y = this.invitationBitmap.y + this.invitationBitmap.height + 20;


        egret.Tween.get(this.invitationBox).to({alpha:1,scaleX:0.9,scaleY:0.9},
                                    500,egret.Ease.quartInOut);
    }
    private onContinue(e):void{
        let weakSelf = this;
        egret.Tween.get(this.invitationBox)
        .to({alpha:0,scaleX:0.5,scaleY:0.5},500,egret.Ease.quartInOut).call(()=>{
            weakSelf.dispatchEventWith(SceneInvite.DONE);
            weakSelf.parent.removeChild(weakSelf);
        });
    }
    private invitationBox: egret.Sprite;
    private invitationBitmap: egret.Bitmap;
    private invitationRetunBitmap: egret.Bitmap;
}