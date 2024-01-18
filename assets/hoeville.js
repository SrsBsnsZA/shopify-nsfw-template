document.addEventListener("DOMContentLoaded", function () {
  var triggers = document.getElementsByClassName("trigger");

  for (const trigger of triggers) {
    trigger.addEventListener('mouseover', () => {
      document.getElementById('squirt').style.opacity = '0'
      const sections = document.querySelectorAll('.sections')
      for(const section of sections){
        section.style.display = 'none'
      }
      const triggerIndex = parseInt(trigger.getAttribute('data-trigger-index') ) +1
      for (let index = 0; index < triggerIndex; index++) {

        setTimeout(() => {
          animate(index)
        }, (200 * index))
      }

      const animate = (index) => {
        if (index > triggerIndex) return;
        const section = document.getElementById(`section-${index}`)
        section.style.display = 'block'
        const grad1 = document.getElementById(`${index}-grad-1`)
        grad1.beginElement()
        const grad2 = document.getElementById(`${index}-grad-2`)
        grad2.beginElement()
        const listenerMethod = (event) => {
          grad2.removeEventListener('endEvent', listenerMethod)
          if(index === 3){
            document.getElementById('squirt').style.opacity = '1'
          }
        }

        grad2.addEventListener("endEvent", listenerMethod);
      }

      animate(0)

    })
  }
});
