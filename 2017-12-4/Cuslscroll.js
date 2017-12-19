class Cuslscroll {
    constructor(selectior, options = {}) {
        this.eventQueue = [];

        function defaultValues(options, defaluts) {
            for (let name in defaluts) {
                if (typeof options[name] == "undefined") {
                    options[name] = defaluts[name];
                }
            }
        }

        defaultValues(options, {
            bounce: true,
            bounceTime: 600,
            scrollX: false,
            scrollY: true,
            freeScroll: false,
            startX: 0,
            startY: 0,
            directionLockThreshold: 5
        })

        let parent = Array.from(document.querySelectorAll(selectior));
        parent.forEach(element => {
            let child = element.children[0];
            if (!child) return;

            child.addEventListener("touchstart", start, false);
            child.addEventListener("touchmove", move, false);
            child.addEventListener("touchend", end, false);

            let startX = 0;
            let startY = 0;
            let disX = 0;
            let disY = 0;
            let dir = "";
            let firstMove;
            let _this = this;
            let translateX = options.startX,
                translateY = options.startY;

            function start(ev) {
                startX = ev.targetTouches[0].clientX;
                startY = ev.targetTouches[0].clientY;
                disX = startX - translateX;
                disY = startY - translateY;

                dir = "";
                _this.eventQueue.forEach(element => {
                    if (element.type == "beforeScrollStart") {
                        element.fn();
                    }
                });

                firstMove = true;

            }

            function move(ev) {
                if (firstMove) {
                    firstMove = false;
                    _this.eventQueue.forEach(element => {
                        if (element.type == "scrollStart") {
                            element.fn();
                        }
                    })
                }

                if (dir == "") {
                    
                    if(Math.abs(ev.targetTouches[0].clientX-startX)>=options.directionLockThreshold){
                        dir='x';
                      }
            
                      if(Math.abs(ev.targetTouches[0].clientY-startY)>=options.directionLockThreshold){
                        dir='y';
                      }
                    
                } else {
                    if (options.freeScroll || dir == "x") {
                        translateX = ev.targetTouches[0].clientX - disX;
                    }

                    if (options.freeScroll || dir == "y") {
                        translateY = ev.targetTouches[0].clientY - disY;
                    }

                    if (options.bounce == false) {
                        if (translateX > 0) {
                            translateX = 0;
                        }
                        if (translateX < parent.offsetWidth - child.offsetWidth) {
                            translateX = parent.offsetWidth - child.offsetWidth;
                        }

                        if (translateY > 0) {
                            translateY = 0;
                        }

                        if (translateY < parent.offsetHeight - child.offsetHeight) {
                            translateY = parent.offsetHeight - child.offsetHeight;
                        }

                    }
                    _this.x = translateX;
                    _this.y = translateY;

                    _this.eventQueue.forEach(element => {
                        if (element.type == "scroll") {
                            element.fn();
                        }
                    })

                    child.style.transform=`translateX(${translateX}px) translateY(${translateY}px)`;

                }

            }

            function end(ev) {
                if (translateX > 0) {
                    translateX = 0;
                }
                if (translateX < parent.offsetWidth - child.offsetWidth) {
                    translateX = parent.offsetWidth - child.offsetWidth;
                }

                if (translateY > 0) {
                    translateY = 0;
                }
                if (translateY < parent.offsetHeight - child.offsetHeight) {
                    translateY = parent.offsetHeight - child.offsetHeight;
                }

                child.style.transition = `${options.bounceTime}ms all ease`;
                child.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;

                child.addEventListener('transitionend', tend, false);

                function tend() {
                    child.style.transition = '';
                    child.removeEventListener('transitionend', tend, false);

                    _this.eventQueue.forEach(json => {
                        if (json.type == 'scrollEnd') {
                            json.fn();
                        }
                    });
                }
            }

        });


    }
    on(name, fn) {
        this.eventQueue.push({
            type: name,
            fn
        });
    }
}