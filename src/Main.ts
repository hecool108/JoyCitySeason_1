class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    private isMute:boolean;

    public constructor() {
        super();
        this.isMute = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface


        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loader");

    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        } else {
            let bg = new egret.Shape();
            bg.graphics.beginFill(0x15193d, 1);
            bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            bg.graphics.endFill();
            this.addChild(bg);

            this.bgPattern = new CurtainBitmap({
                resourceName: "main_bg_png",
                fadeIn: false,
                centerLayout: true
            });
             this.addChild(this.bgPattern);
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
            RES.loadGroup("preload");
            

            let muteButton:egret.Bitmap = new egret.Bitmap(RES.getRes("icon_unmute_png"));
            muteButton.anchorOffsetX = muteButton.width/2;
            muteButton.anchorOffsetY = muteButton.height/2;
            muteButton.x = this.stage.stageWidth - muteButton.width;
            muteButton.y = muteButton.height;
            muteButton.touchEnabled = true;
            this.stage.addChild(muteButton);
            let weakSelf = this;
            muteButton.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
                if(weakSelf.isMute){
                    jsb_unmute();
                    muteButton.texture = RES.getRes("icon_unmute_png");
                }else{
                    jsb_mute();
                    muteButton.texture = RES.getRes("icon_mute_png");
                }
                muteButton.anchorOffsetX = muteButton.width/2;
                muteButton.anchorOffsetY = muteButton.height/2;
                weakSelf.isMute = !weakSelf.isMute;
            },this);
        }

    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private
    private introAminationScene: SceneIntroAnimation;
    private perksScene: ScenePerks;
    private invationScene: SceneInvite;
    private bgPattern: CurtainBitmap;
    private createGameScene(): void {

        this.introAminationScene = new SceneIntroAnimation();
        this.introAminationScene.addEventListener(LogoBall.DONE, this.onLogoBallDone, this);
        this.addChild(this.introAminationScene);

        // this.onLogoBallDone(null);
        // this.onInvatationDone(null);
    }
    private onLogoBallDone(e): void {
        this.invationScene = new SceneInvite();
        this.invationScene.addEventListener(SceneInvite.DONE, this.onInvatationDone, this);
        this.addChild(this.invationScene);
    }
    private onInvatationDone(e): void {
        this.perksScene = new ScenePerks();
        this.addChild(this.perksScene);
    }


    get width(): number {
        return this.stage.stageWidth;
    }
    get height(): number {
        return this.stage.stageHeight;
    }
}


