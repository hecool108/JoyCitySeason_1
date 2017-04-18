class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.createView,this);
    }

    private textField:egret.TextField;

    private createView(e):void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.textColor = SceneIntroAnimation.THEME_COLOR_PINK;
        this.textField.y = 300;
        this.textField.width = this.stage.stageWidth;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    }

    public setProgress(current:number, total:number):void {
        this.textField.text = `Loading...${current}/${total}`;
    }
}
