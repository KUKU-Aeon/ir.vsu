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

            function resize() {
                doc_width = document.body.clientWidth;
                width = screen.width <700 ? doc_width*0.8160 : doc_width*0.6720
            }

            resize();

            let activeSlide = 0;

            slides[activeSlide].classList.add('active');

            if (sliderCounter) sliderCounter.innerHTML =`<p><span>${activeSlide + 1}</span>&nbsp;/&nbsp;${slides.length}</p>`;

            if (prevButton) prevButton.addEventListener('click', function () {

                activeSlide--;

                if (activeSlide < 0) activeSlide = slides.length - 1;

                if (sliderCounter) sliderCounter.innerHTML =`<p><span style="color: #273C75">${activeSlide + 1}</span>&nbsp;/&nbsp;${slides.length}</p>`;

                wrapper.style.transform = `translate3d(-${width * activeSlide}px, 0, 0)`;
            });

            if (nextButton) nextButton.addEventListener('click', function () {

                activeSlide++;

                if (activeSlide > slides.length - 1) activeSlide = 0;

                if (sliderCounter) sliderCounter.innerHTML =`<p><span style="color: #273c75">${activeSlide + 1}</span>&nbsp;/&nbsp;${slides.length}</p>`;
                console.log(width, activeSlide, doc_width)
                wrapper.style.transform = `translate3d(-${width * activeSlide}px, 0, 0)`;
            });

            window.addEventListener('resize', resize);
        }

        window.addEventListener('close', function () {
            window.localStorage.clear();
        })

        let navigation = document.querySelectorAll('.navigation');


        navigation.forEach(button => {
            button.addEventListener('click', function () {
                let navbar = document.querySelector(".navbar");
                let tab = `tab-${button.id}`
                console.log(tab)
                let article = document.getElementById(tab);
                console.log(article)
                article.classList.add('active');
                navbar.style.display = "none";

                let back_button = document.getElementById(`back-${button.id}`);
                back_button.addEventListener('click', function (){
                    article.classList.remove('active');
                    navbar.style.display = "flex";
                })

            })
        })

        let button = document.getElementById('nav_button');
        let menu = document.querySelector('nav');
        let action = false;

        button.addEventListener('click', function() {
            if (action === false) {
                if (menu) menu.classList.add('active');
                if (button) button.classList.add('active');
                action = true;
                document.body.style.overflow = 'hidden';
                menu.style.animation = "nav_menu 1s forwards"
            } else {
                if (menu) menu.classList.remove('active');
                if (button) button.classList.remove('active');
                menu.style.animation = "nav_menu_back 1s forwards"
                action = false;
                document.body.style.overflow = '';
            }
        });

        let drop_menu = document.getElementById('my-drop-down-menu');
        let sub_menu = document.querySelectorAll('.child');

        drop_menu.addEventListener('mouseover', function (){
               sub_menu.forEach(menu => {
                   menu.style.animation = "drop_menu 0.5s forwards"
               })
            });
        drop_menu.addEventListener('mouseout', function (){
            sub_menu.forEach(menu => {
                menu.style.animation = "drop_menu_out   0.5s forwards"
            })
        });

    });