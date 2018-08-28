/*
* @Author: Vera
* @Date:   2018-08-14 16:30:21
* @Last Modified by:   Vera
* @Last Modified time: 2018-08-16 23:26:12
*/
window.onload = function () {
    // body... 
    var container = document.getElementById('container');
    var picture = document.getElementById('picture');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var animated = false;
    var timer;

 /*   next.onclick = function () {
         picture.style.left = parseInt(picture.style.left) - 600 + 'px';
    }
    prev.onclick = function () {
        picture.style.left = parseInt(picture.style.left) + 600 +'px';
    }*/
    function animate(offset) {
        if (offset == 0) {
            return;
        }
        animated = true;
        var newLeft = parseInt(picture.style.left) + offset;
        var time = 300; //位移总时间
        var interval = 10; //每10毫秒位移一次 
        var speed = offset/(time/interval);//每次位移量，负值说明往左边移动

        function go() {
            if ((speed < 0 && parseInt(picture.style.left) > newLeft) || (speed > 0 && parseInt(picture.style.left) < newLeft)) {
                picture.style.left = parseInt(picture.style.left) + speed +'px';
                setTimeout(go, interval);
            }
            else {
                animated = false; 
                picture.style.left = newLeft + 'px';
                if (newLeft > -600) {
                    picture.style.left = -3600 + 'px';
                }
                if (newLeft < -3600) {
                    picture.style.left = -600 + 'px';
                }
                animated = false;
            }
        }
        go();

    }
    function play() {
        timer = setInterval(function() {
            next.onclick();
        },3000);
    }
    function stop() {
        clearTimeout(timer);
    }
    function showButton() {
        for(var i = 0; i<buttons.length; i++){
            if(buttons[i].className == 'on'){
                buttons[i].className = '';
                break;

            }
        }
        buttons[index-1].className = 'on';
    }

    next.onclick = function() {
        if (index == 6) {
            index = 1;
        }else {
            index += 1;            
        }
       
        showButton();
        if (!animated) {
            animate(-600);
        }
        
    }
    prev.onclick = function() {
        if (index == 1) {
            index = 6;
        }else {
            index -= 1;            
        }
        showButton();
        if (!animated) {
            animate(-600);
        }
    }  
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            if(this.className == 'on'){
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -600 * (myIndex - index);
            index = myIndex;

            showButton();
            if (!animated) {
                animate(offset);
            }
        }
    }
    //加括号返回值是执行函数后的返回值，不加括号返回的是整个函数信息
    container.onmouseover = stop;
    container.onmouseout = play;
    play();

   


}

