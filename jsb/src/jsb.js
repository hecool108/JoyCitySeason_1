function fullscreen(){
    var elem = document.getElementById("main-player");
        var
          el = document.documentElement
        , rfs =
               el.requestFullScreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
        ;
        rfs.call(el);
}
function jsb_init_keyboard_event(hook) {
    document.addEventListener("keydown",function (e) {
        hook(e);
    });
}

function jsb_mute(){
    document.getElementById('bgmusic').pause();
}
function jsb_unmute(){
    document.getElementById('bgmusic').play();
}