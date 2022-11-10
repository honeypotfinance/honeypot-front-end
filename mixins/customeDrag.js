export default {
  methods: {
    customeDrag(event) {
      // select target
      const target = event.currentTarget.className.includes("custome-window v-sheet")
        ? event.currentTarget : event.currentTarget.parentNode;
      // set initial state
      let offset = [0,0], isDown = false;

      isDown = true;
      offset = [
        target.offsetTop - typeEvent(event).clientY,
        target.offsetLeft - typeEvent(event).clientX
      ];
      
      function typeEvent(event) {
        if (event.type.includes('mouse')) {
          return event
        } else if (event.type.includes('touch')) {
          return event.touches[0]
        }
      }
      
      const onMove = (e) => {
        const
          container = document.getElementById("home"),
          positionY = typeEvent(e).clientY + offset[0],
          positionX = typeEvent(e).clientX + offset[1],
          rangeYStart = 0, rangeYEnd = container.getBoundingClientRect().height - target.getBoundingClientRect().height,
          rangeXStart = 0, rangeXEnd = container.getBoundingClientRect().width - target.getBoundingClientRect().width;

        if (e.type.includes('mouse')) e.preventDefault();
        if (isDown && positionY > rangeYStart && positionY < rangeYEnd) {
          target.style.top  = `${positionY}px`;
          target.style.bottom  = `initial`;
          target.style.margin  = `initial`;
        };
        if (isDown && positionX > rangeXStart && positionX < rangeXEnd) {
          target.style.left  = `${positionX}px`;
          target.style.right  = `initial`;
        };
      }
      const removeHandlers = () => {
        window.onmouseup = null
        window.onmousemove = null
        window.ontouchend = null
        window.ontouchmove = null
        isDown = false
      }
      
      // desktop
      window.onmouseup = () => removeHandlers()
      window.onmousemove = e => onMove(e)
      // mobile
      window.ontouchend = () => removeHandlers()
      window.ontouchmove = e => onMove(e)
    },
  }
}
