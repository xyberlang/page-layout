

  //轮播图
  const sLeft = document.getElementById('arrow-left');
  const sRight = document.getElementById('arrow-right');
  const Banner = document.getElementById('nav-info');
  const sLi = document.getElementsByClassName('banner-li');
  //自动轮播--加入动画无缝衔接效果
  let index = 0,
          timer = null,
          timer1 = null,
          banWidth = Banner.clientWidth,
          STEP = banWidth * 0.01,
          currentIndex = 0,
          offsetL = 0;
  //自动播放
window.onload = function() {
  //初始化
  sLi[0].style.display = 'block';
  sLi[1].style.display = 'none';
  sLi[2].style.display = 'none';
  timer = setInterval(function () {
    autoRun(sLi,-1,-STEP);
  },4000);
};
  Banner.onmouseover = function() {
    if(!sLi[index].offsetLeft) {
      clearInterval(timer);
    }
  };
  Banner.onmouseleave = function() {
    timer = setInterval(function () {
      autoRun(sLi, -1, -STEP);
    }, 4000)
  };
  //点击左箭头--当前图片向右移动，下一张图片定位向右紧跟着
  sLeft.onclick = function () {
    if(!sLi[index].offsetLeft) {
      autoRun(sLi,1,STEP);
    }
  };
  //点击右箭头--当前图片向左移动，前一张图片定位向左紧跟着
  sRight.onclick = function () {
    if(!sLi[index].offsetLeft) {
      autoRun(sLi,-1,-STEP);
    }
  };
  /**图片自动移动方法
   * 1.当前图片向右移动--改变图片的left值
   * 2.上一张图片向右跟进--获取当前图片的offsetLeft-divWidth赋值给上一张图片的left
   */
  function autoRun(array,direction,step) {
    clearInterval(timer1);
    currentIndex = index;
    if(direction === -1){
      index++;
      index = index > array.length-1 ? 0 : index;
    }else if(direction === 1){
      index--;
      index = index < 0 ? array.length-1 : index;
    }
    array[index].style.display = 'block';
    timer1 = setInterval(function () {
      offsetL = array[currentIndex].offsetLeft;
      offsetL += step;
      array[currentIndex].style.left = offsetL + 'px';
      array[index].style.left = offsetL - direction * banWidth + 'px';
      if(offsetL === direction * banWidth){
        clearInterval(timer1);
      }
    },5)
  }
  /**
   * 阻止浏览器默认事件
   */
  function stopDefault(e) {
    if(e && e.preventDefault){
      e.preventDefault();
    }else {
      window.event.returnValue = false;
    }
  }