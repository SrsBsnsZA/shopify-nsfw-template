document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.getElementById('hoeville')
  let currentIndex = 0;

  const handleTextBlock = (index) => {
    const textBlock = wrapper.querySelector(`[data-hoeville="${index}"]`)
    if(textBlock){
      const textSections = document.querySelectorAll('.hoeville-text-wrapper')
      for(const section of textSections){
        if(parseInt(section.getAttribute('data-hoeville')) !== index) {
          section.style.display = 'none'
        }else{
          if (section.style.removeProperty) {
            section.style.removeProperty('display');
          } else {
            section.style.removeAttribute('display');
          }
        }
      }
    }
  }

  const animate = (index, triggerIndex) => {
    if (index > triggerIndex) return;

    if(index === 4){
      document.getElementById('squirt').style.opacity = '1'
      return
    }
    const section = document.getElementById(`section-${index}`)
    section.style.display = 'block'
    const grad1 = document.getElementById(`${index}-grad-1`)
    grad1.beginElement()
    const grad2 = document.getElementById(`${index}-grad-2`)
    grad2.beginElement()
  }

  if(wrapper){
    var triggers = document.getElementsByClassName("trigger");
    animate(currentIndex, 0)
    handleTextBlock(0)
    const outline = document.getElementById(`outline_0`)
    outline.style.opacity = '1'

    for (const trigger of triggers) {
      trigger.addEventListener('mouseover', () => {
        const triggerIndex = parseInt(trigger.getAttribute('data-trigger-index'))
        if(currentIndex === triggerIndex) return;
        currentIndex = triggerIndex
        document.getElementById('squirt').style.opacity = '0'
        const sections = document.querySelectorAll('.sections')
        for(const section of sections){
          section.style.display = 'none'
        }
        const outlines = document.querySelectorAll(`.hover-indicator`)
        for(const outline of outlines){
          outline.style.opacity = '0'
        }
        const outline = document.getElementById(`outline_${triggerIndex}`)
        outline.style.opacity = '1'
        handleTextBlock(triggerIndex)
        for (let index = 0; index < (triggerIndex +1); index++) {
          setTimeout(() => {
            animate(index, (triggerIndex +1))
          }, (200 * index))
        }
      })
    }
  }
});
