document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.getElementById('hoeville');
    let currentIndex = 0;
    const wrapperClasses = [
            'lemoan',
            'pg',
            'amateur',
            'xtrahot',
            'hardcore'
    ];

    // const slideIndy = document.getElementById('indy');
    var prevClass = 'lemoan'
    const animate = (index, triggerIndex) => {
        if (index > triggerIndex) return;



        if (index === 4) {
            document.getElementById('squirt').style.opacity = '1';
            return;
        }
        const section = document.getElementById(`section-${index}`);
        section.style.display = 'block';
        const grad1 = document.getElementById(`${index}-grad-1`);
        grad1.beginElement();
        const grad2 = document.getElementById(`${index}-grad-2`);
        grad2.beginElement();

        // const slidePos = [
        //     'calc(0% - 15px)',
        //     'calc(25% - 20px)',
        //     'calc(50% - 25px)',
        //     'calc(75% - 30px)',
        //     'calc(100% - 35px)',
        // ];
        // slideIndy.style.bottom = `${slidePos[triggerIndex -1]}`;
    };

    if (wrapper) {
        const slider = document.getElementById('range-slider');

        slider.addEventListener('input', function(e) {
            const triggerIndex = e.target.value / 25
            if (currentIndex === triggerIndex) return;

            wrapper.classList.remove(prevClass)
            wrapper.classList.add(wrapperClasses[triggerIndex])
            prevClass = wrapperClasses[triggerIndex];
            currentIndex = triggerIndex;
            document.getElementById('squirt').style.opacity = '0';
            const sections = document.querySelectorAll('.sections');
            for (const section of sections) {
                section.style.display = 'none';
            }
            for (let index = 0; index < (triggerIndex + 1); index++) {
                setTimeout(() => {
                    animate(index, (triggerIndex + 1));
                }, (200 * index));
            }
        }, false);
        // var triggers = document.getElementsByClassName('trigger');

        animate(currentIndex, 0);

        // for (const trigger of triggers) {
        //     trigger.addEventListener('click', () => {
        //         const triggerIndex = parseInt(
        //                 trigger.getAttribute('data-trigger-index'));
        //
        //
        //         if (currentIndex === triggerIndex) return;
        //
        //         wrapper.classList.remove(prevClass)
        //         wrapper.classList.add(wrapperClasses[triggerIndex])
        //         prevClass = wrapperClasses[triggerIndex];
        //         currentIndex = triggerIndex;
        //         document.getElementById('squirt').style.opacity = '0';
        //         const sections = document.querySelectorAll('.sections');
        //         for (const section of sections) {
        //             section.style.display = 'none';
        //         }
        //         for (let index = 0; index < (triggerIndex + 1); index++) {
        //             setTimeout(() => {
        //                 animate(index, (triggerIndex + 1));
        //             }, (200 * index));
        //         }
        //
        //     });
        // }
    }
});
