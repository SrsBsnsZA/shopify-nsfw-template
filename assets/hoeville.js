let wrapper;
let currentIndex = 0;
let prevClass = "lemoan";
const wrapperClasses = ["lemoan", "pg", "amateur", "xtrahot", "hardcore"];

function animateScale(index, triggerIndex) {
    // added second condition to prevent bug when scaling down and setTimeout callbacks for higher levels get called
    if (index > triggerIndex || (!((currentIndex + 1) == triggerIndex))) return;

    if (index === 4) {
        document.getElementById("squirt").style.opacity = "1";
        return;
    }
    const section = document.getElementById(`section-${index}`);
    section.style.display = "block";
    const grad1 = document.getElementById(`${index}-grad-1`);
    grad1.beginElement();
    const grad2 = document.getElementById(`${index}-grad-2`);
    grad2.beginElement();
}

function changeScale(val) {
    const triggerIndex = val / 25;
    if (currentIndex === triggerIndex) {
        return;
    }
    currentIndex = triggerIndex;
    wrapper.classList.remove(prevClass);
    wrapper.classList.add(wrapperClasses[triggerIndex]);
    prevClass = wrapperClasses[triggerIndex];
    document.getElementById("squirt").style.opacity = "0";
    const sections = document.querySelectorAll(".sections");
    for (const section of sections) {
        section.style.display = "none";
    }
    for (let index = 0; index < triggerIndex + 1; index++) {
        setTimeout(() => {
            animateScale(index, triggerIndex + 1);
        }, 200 * index);
    }
}

document.addEventListener("DOMContentLoaded", function () {
  wrapper = document.getElementById("hoeville");

  if (wrapper) {
    const slider = $('#range-slider');

    // slider.on("input", function (e) {
    //   slider.trigger("change");
    // });
    slider.on("change", function (e) {
        changeScale($(this).val());
    });

    $('#hoeville .scale > .trigger').on('click', function() {
        const triggerIndex = $(this).data('trigger-index');
        slider.val(triggerIndex * 25).change();
    });

    animateScale(currentIndex, 1);

  }
});
