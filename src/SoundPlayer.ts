/**
 *
 * @author 
 *
 */
class SoundPlayer extends egret.EventDispatcher{
    public constructor() {
        super();
    }
    public static player: SoundPlayer;
    public static getPlayer(): SoundPlayer {
        if(SoundPlayer.player == null) {
            console.log("LocalModel init");
            SoundPlayer.player = new SoundPlayer();
        }
        return SoundPlayer.player;
    }
    
    private loader:egret.URLLoader;
    private delay:number;
    private scLocal: egret.SoundChannel;
    private scExternal: egret.SoundChannel;
    
    
    public playSound(name:string,stopPrev:boolean = true,volume:number = 1){
        if(!this.soundOn){
            return;
        }
        if(stopPrev){
            this.stopLocal();    
        }
        var sound: egret.Sound = RES.getRes(name);
        if(sound != null){
            
            this.scLocal = sound.play(0,1);
            this.scLocal.volume = volume;    
        }
    }

    public playExternalSound(name: string,stopPrev: boolean = true,delay:number = 0){
        if(!this.soundOn) {
            return;
        }
        if(stopPrev){
            this.stopExternal();  
        }
        this.delay = delay;
        this.loader = new egret.URLLoader();
        let weakSelf = this;
        this.loader.addEventListener(egret.Event.COMPLETE,this.onSoundLoaded,this);
        this.loader.once(egret.IOErrorEvent.IO_ERROR,function(e:egret.IOErrorEvent){
            console.log(e);
        },this);
        this.loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        this.loader.load(new egret.URLRequest("resource/soundtracks/" + name +".mp3"));
    }
    private onSoundLoaded(event: egret.Event):void{
        this.loader.removeEventListener(egret.Event.COMPLETE,this.onSoundLoaded,this);
        let sound: egret.Sound = this.loader.data;
        sound.type = egret.Sound.MUSIC;
        let weakSelf = this;
        setTimeout(function() {
            weakSelf.scExternal = sound.play(0,1);
            weakSelf.scExternal.addEventListener(egret.Event.SOUND_COMPLETE,weakSelf.onExtPlayComplete,weakSelf);    
        }, this.delay);
        weakSelf.dispatchEventWith("start");
    }
    private onExtPlayComplete(e:egret.Event):void{
        this.dispatchEventWith("complete");
    }
    public stopLocal(){
        if(this.scLocal != null) {
            this.scLocal.stop();
            this.scLocal = null;
        }
    }
    public stopExternal() {
        if(this.loader != null){
            this.loader.removeEventListener(egret.Event.COMPLETE,this.onSoundLoaded,this);
        }
        if(this.scExternal != null) {
            this.scExternal.stop();
            this.scExternal = null;
        }
    }
    public stopAll(){
        this.stopLocal();
        this.stopExternal();
    }    
    public soundOn:boolean = true;
}
