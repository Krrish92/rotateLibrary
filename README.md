# rotateLibrary
Rotate any image with mouse or touch

ie. code for infinite rotate volume button

HTML::

    <img class = 'volume-slider' src = 'your-volume-button-image-src' alt = 'volume button'>


Javascript :: Put this code in onready function -

      <script>
        var volCount = 0;
        var lastVal = 0;
        $(".volume-slider").Rotate({
            moveStart : function(e){
                volCount = 0;
                lastVal = 0;
                $(e).nextAll(".vol-count:first").css("display","block").text("000");
            },
            move : function(e){
                e.previous_angle = isNaN(e.previous_angle) ? 0 : e.previous_angle;
                var angleDifference = Math.abs(e.previous_angle - e.current_angle);
                var val = Math.floor(angleDifference/50);
                if(val != lastVal) {

                    if(e.direction == 1){
                        volCount = volCount <= 100 ? volCount + 1 : 100;
                    }
                    else if(e.direction == -1){
                        volCount = volCount >= -100 ? volCount - 1 : -100;
                    }

                    lastVal = val;
                }

                e.volCount = volCount;
                $(e).nextAll(".vol-count:first").css("display","block").text(getStr(Math.abs(volCount)));
            }, 
            moveEnd : function(e){
                if(e.volCount > 0) {
                    var temp = $(e).data("volume-up");
                    var cmdArr = temp.split(",");
                    var command = cmdArr[0]+","+cmdArr[1]+","+ getStr(e.volCount) +","+ cmdArr[3];
                    doSend(command);
                }else if(e.volCount < 0){
                    var temp = $(e).data("volume-down");
                    var cmdArr = temp.split(",");
                    var command = cmdArr[0]+","+cmdArr[1]+","+ getStr(Math.abs(e.volCount)) +","+ cmdArr[3];
                    doSend(command);
                }
                $(e).nextAll(".vol-count:first").css("display","none").text("000");
            }
        });
    </script>
