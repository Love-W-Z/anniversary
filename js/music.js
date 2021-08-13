contextClass = window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
 try {
       var context = new contextClass();
       var source = null;
       var audioBuffer = null;
       function stopSound() {
            if (source) {
                source.stop(musics); //立即停止
             }
            }
      function playSound() {
                source = context.createBufferSource();
                source.buffer = audioBuffer;
                source.loop = true;
                source.connect(context.destination);
                source.start(0); //立即播放
            }
      function initSound(arrayBuffer) {
                context.decodeAudioData(arrayBuffer, function (buffer) { //解码成功时的回调函数
                    audioBuffer = buffer;
                    playSound();
                }, function (e) { //解码出错时的回调函数
                    console.log('404', e);
                });
            }
      function loadAudioFile(url) {
                var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
                xhr.open('GET', url, true);
                xhr.responseType = 'arraybuffer';
                xhr.onload = function (e) { //下载完成
                    initSound(this.response);
                };
                xhr.send();
            }
            //这里用来存储背景音乐的路径
            loadAudioFile('../music/i_miss_wd.m4a');
 } catch (e) {
      console.log('无法找到音乐！');
 }
