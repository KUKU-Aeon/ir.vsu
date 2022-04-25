    document.addEventListener('DOMContentLoaded', function () {

    let header = document.querySelector('header');
    let prevScroll = pageYOffset;
    let scroll = pageYOffset;
    let hidden = false;

    let scrolledDown = 0;

    window.addEventListener('scroll', function () {
        if (!header)
            return;

        scroll = pageYOffset;

        if ((header) && !hidden)
            header.classList.remove('hidden');

        if ((scroll - prevScroll > 0) && !hidden) {
            header.classList.add('hidden');
            hidden = true;
            prevScroll = scroll;
            scrolledDown = 0;
        } else {
            if (hidden && (scroll - prevScroll < 0))
                scrolledDown += scroll - prevScroll;
            else
                scrolledDown = 0;

            if ((scrolledDown < -50) && hidden) {
                header.classList.remove('hidden');
                hidden = false;
                prevScroll = scroll
            }
        }
        if (hidden && pageYOffset === 0) {
            header.classList.remove('hidden');
            hidden = false;
            prevScroll = scroll
        }

        prevScroll = scroll
    });
});

document.addEventListener('DOMContentLoaded', function (){

    class ItcTabs {
        constructor(target, config) {
            const defaultConfig = {};
            this._config = Object.assign(defaultConfig, config);
            this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
            this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
            this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
            this._eventShow = new Event('tab.itc.change');
            this._init();
            this._events();
        }

        _init() {
            this._elTabs.setAttribute('role', 'tablist');
            this._elButtons.forEach((el, index) => {
                el.dataset.index = index;
                el.setAttribute('role', 'tab');
                this._elPanes[index].setAttribute('role', 'tabpanel');
            });
        }

        show(elLinkTarget) {
            const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
            const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
            const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
            if (elLinkTarget === elLinkActive) {
                return;
            }
            elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
            elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
            elLinkTarget.classList.add('tabs__btn_active');
            elPaneTarget.classList.add('tabs__pane_show');
            this._elTabs.dispatchEvent(this._eventShow);
            elLinkTarget.focus();
        }

        showByIndex(index) {
            const elLinkTarget = this._elButtons[index];
            elLinkTarget ? this.show(elLinkTarget) : null;
        };

        _events() {
            this._elTabs.addEventListener('click', (e) => {
                const target = e.target.closest('.tabs__btn');
                if (target) {
                    e.preventDefault();
                    this.show(target);
                }
            });
        }
    }
    new ItcTabs('.tabs');
});

    document.addEventListener('DOMContentLoaded', function () {
        const sliders = document.querySelectorAll('.slider');

        for (let i = 0; i < sliders.length; i++) {
            createSlider(sliders[i]);
        }

        function createSlider(slider) {
            const slides = slider.querySelectorAll('.slide');

            if (slides.length < 2) return;

            const wrapper = slider.querySelector('.slider-wrapper');
            const prevButton = slider.querySelector('.button-prev');
            const nextButton = slider.querySelector('.button-next');
            const sliderCounter = slider.querySelector('.slider-counter');

            if (!prevButton && !nextButton) return;
            let width = 0;
            let doc_width = document.body.clientWidth;
            console.log(doc_width);

            function resize() {
                doc_width = document.body.clientWidth;
                width = doc_width*0.6720;
                console.log(width);
            }

            resize();

            let activeSlide = 0;

            slides[activeSlide].classList.add('active');

            if (sliderCounter) sliderCounter.innerHTML =`<p><span>${activeSlide + 1}</span>&nbsp;/&nbsp;${slides.length}</p>`;

            if (prevButton) prevButton.addEventListener('click', function () {
                console.log(width);
                activeSlide--;

                if (activeSlide < 0) activeSlide = slides.length - 1;

                if (sliderCounter) sliderCounter.innerHTML =`<p><span style="color: #273C75">${activeSlide + 1}</span>&nbsp;/&nbsp;${slides.length}</p>`;

                wrapper.style.transform = `translate3d(-${width * activeSlide}px, 0, 0)`;
                console.log(width * activeSlide);
            });

            if (nextButton) nextButton.addEventListener('click', function () {

                activeSlide++;
                console.log(width);

                if (activeSlide > slides.length - 1) activeSlide = 0;

                if (sliderCounter) sliderCounter.innerHTML =`<p><span style="color: #273c75">${activeSlide + 1}</span>&nbsp;/&nbsp;${slides.length}</p>`;

                wrapper.style.transform = `translate3d(-${width * activeSlide}px, 0, 0)`;
            });

            window.addEventListener('resize', resize);
        }


    });