const HOMEPAGE_CLOSING_ANIMATION_TIME = 2200;
const HOMEPAGE_OPENING_ANIMATION_TIME = 2400;

// run init when loaded
window.addEventListener("DOMContentLoaded", init);
function init() {
    initHomepage();
    addFadeInAnimations();
}

function addFadeInAnimations() {
    document.querySelector('#foreground h1').className = "fade-in-animate";
    document.querySelector('#foreground p').className = "fade-in-delay1-animate";
    document.querySelector('#foreground button').className = "fade-in-delay2-animate";
    document.querySelector('#resume-button').className = "fade-in-delay2-animate";
}

function initHomepage() {
    let main = document.querySelector('main');
    let homePageTpl = document.getElementById('homepage-tpl');
    main.append(homePageTpl.content.cloneNode(true));


    let foreground = document.getElementById('foreground');
    foreground.style.width = "95%";
    foreground.style.height = "95%";

    document.getElementById('view-portfolio-button').addEventListener('click', openPortfiolio);
}

function removeHomepage() {
    document.getElementById('view-portfolio-button').removeEventListener('click', openPortfiolio);
    document.getElementById('homepage').remove(); 
}

function initPortfolio() {
    let main = document.querySelector('main');
    let portfolioTpl = document.getElementById('portfolio-tpl');
    main.append(portfolioTpl.content.cloneNode(true));

    document.getElementById('back-home-button').addEventListener('click', backHome);
    document.getElementById('left-button').addEventListener('click', moveSliderRight);
    document.getElementById('right-button').addEventListener('click', moveSliderLeft);

    document.body.style.backgroundColor = "var(--portfolio-background-color)";

    init_slider();
}

function removePortfolio() {
    document.getElementById('right-button').removeEventListener('click', moveSliderRight);
    document.getElementById('left-button').removeEventListener('click', moveSliderLeft);
    document.getElementById('back-home-button').removeEventListener('click', backHome);
    document.getElementById('portfolio').remove(); 
}

//triggered when view portfolio button is pressed
function openPortfiolio(e) {
    //remove event listener to prevent multiple clicks
    document.getElementById('view-portfolio-button').removeEventListener('click', openPortfiolio);
    //add portfolio, without animations
    initPortfolio();
    //remove event listener to prevent click during animation
    document.getElementById('back-home-button').removeEventListener('click', backHome);


    //add animations
    document.getElementById('top-line').className = "top-close-animate";
    document.getElementById('bottom-line').className = "bottom-close-animate";
    document.getElementById('foreground').className = "foreground-close-animate";
    document.getElementById('homepage').className = "homepage-close-animate";
    document.getElementById('portfolio').className = "portfolio-open-animate";
   
    //remove homepage after animations
    window.setTimeout(() => { 
        removeHomepage(); 
        //reset portfolio to reset animation time
        removePortfolio();
        initPortfolio();
        // init_slider();
    }, HOMEPAGE_CLOSING_ANIMATION_TIME);
}

//triggered when back home button is pressed
function backHome(e){
    //remove event listener to prevent multiple clicks
    document.getElementById('back-home-button').removeEventListener('click', backHome);
    
    //add homepage to main
    initHomepage();
    //remove event listener to prevent click during animation
    document.getElementById('view-portfolio-button').removeEventListener('click', openPortfiolio);

    //add animations
    document.getElementById('portfolio').className = "portfolio-close-animate";
    document.getElementById('homepage').className = "homepage-open-animate";
    document.getElementById('foreground').className = "foreground-open-animate";
    document.getElementById('bottom-line').className = "bottom-open-animate";
    document.getElementById('top-line').className = "top-open-animate";

    let foreground = document.getElementById('foreground');
    foreground.style.width = "100%";
    foreground.style.height = "100%";

    //remove homepage after animations
    window.setTimeout(() => { 
        removePortfolio(); 
        //reset portfolio to reset animations
        removeHomepage();
        initHomepage();
    }, HOMEPAGE_OPENING_ANIMATION_TIME);
}



class PortfolioItem extends HTMLElement{
    constructor() {
        super();
        const header = this.getAttribute('header');
        const details = this.getAttribute('details');
        const githubLink = this.getAttribute('github');
        const img = this.getAttribute('img');
        let srcAttributes = this.getAttributeNames().filter(attrName => attrName.startsWith('src'));
        srcAttributes = srcAttributes.map(attrName => this.getAttribute(attrName));

        if(!header || !img || !details) {
            console.error("Portfolio Item must have header, details, and img attributes");
            return;
        }
        
        this.attachShadow({mode : "open"});

        let srcHTML = "";


        if(srcAttributes.length != 0) {
            srcHTML = `<video autoplay loop muted playsinline id="media">`;
            srcAttributes.forEach(src => {
                srcHTML += `<source src="${src}" type="video/${src.split('.').pop()}">`;
            });
            srcHTML += `<img src="${img}">`;
            srcHTML += `</video>`;
        } else {
            srcHTML = `<img id="media" src="${img}">`;
        }

        let githubHTML = "";

        if(githubLink) {
            githubHTML += `
                <a id="github-link" href="${githubLink}" >
                    <svg width="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                </a>
            `;
        } 
       
        this.shadowRoot.innerHTML += `
            <style>
                * {
                    margin: 0;
                    padding : 0;
                }
                div {
                    width: 100%;
                    height : 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    border: 3px solid var(--portfolio-highlight-color);
                    border-radius: 10px;
                    background: var(--portfolio-item-background-color);
                    color: var(--portfolio-item-text-color);
                    padding-bottom: 10px;
                    padding-top : 10px;
                    gap : 10px;
                }
                #media {
                    width: 90%;
                }
                div h3 {
                    text-align : center;
                }
                div p {
                    text-align : center;
                    width: 90%;
                }
                #github-link {
                    text-decoration: none;
                    color: var(--portfolio-item-text-color);
                    height : 2rem;
                    width : 2rem;
                }
                div a {
                    color: lightblue;
                }
                div svg {
                    height : 2rem;
                    width : 2rem;
                }
                div a:hover {
                    filter: brightness(0.7);
                }
                section {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: center;
                    column-gap: 10px;
                    align-items: center;
                }
            </style>

            <div class="portfolio-item-container">
                <section>
                    <h3 > ${header}  </h3>
                    ${githubHTML}
                </section>
                ${srcHTML}
                <p> ${details} </p>
        `;
        
        
        
        this.shadowRoot.innerHTML += '</div>'
    }
}

customElements.define('portfolio-item', PortfolioItem);

function moveSliderRight () {
    //move slider right

    let position1 = document.getElementsByClassName('position1')[0];
    let position2 = document.getElementsByClassName('position2')[0];
    let position3 = document.getElementsByClassName('position3')[0];
    let position4 = document.getElementsByClassName('position4')[0];
    let position5 = document.getElementsByClassName('position5')[0];

    let newPosition1 = position1.previousElementSibling;
    if(newPosition1 == null) {
        newPosition1 = document.getElementById('slider').lastElementChild;
    }
    newPosition1.className = "position1";
    position1.className = "position2";
    position2.className = "position3";
    position3.className = "position4";
    position4.className = "position5";
    if(position5.className == "position5"){
        position5.className = "";
    }

    update_slider_counter("right");
}

function moveSliderLeft () {
    //move slider left

    let position1 = document.getElementsByClassName('position1')[0];
    let position2 = document.getElementsByClassName('position2')[0];
    let position3 = document.getElementsByClassName('position3')[0];
    let position4 = document.getElementsByClassName('position4')[0];
    let position5 = document.getElementsByClassName('position5')[0];

    let newPosition5 = position5.nextElementSibling;
    if(newPosition5 == null) {
        newPosition5 = document.getElementById('slider').firstElementChild;
        console.log(newPosition5)
    }
    newPosition5.className = "position5";
    position5.className = "position4";
    position4.className = "position3";
    position3.className = "position2";
    position2.className = "position1";
    if(position1.className == "position1"){
        position1.className = "";
    }

    update_slider_counter("left");
}

function strict_modulo (n, m) {
    return ((n % m) + m) % m;
}


function update_slider_counter(direction) {
    let slider = document.getElementById('slider');
    let sliderItems = slider.children;
    let sliderItemsLength = sliderItems.length;

    let prevDot = document.getElementById("dot" + (update_slider_counter.counter + 1));
    if(prevDot) {
        prevDot.className = "";
    }

    if ( typeof update_slider_counter.counter == 'undefined' ) {
        //perform the initialization
        update_slider_counter.counter = 2;
    }

    if(direction === "left") {
        update_slider_counter.counter = strict_modulo((update_slider_counter.counter + 1), sliderItemsLength);
    } else if (direction === "right") {
        update_slider_counter.counter = strict_modulo((update_slider_counter.counter - 1), sliderItemsLength);
    }

    let currDot = document.getElementById("dot" + (update_slider_counter.counter+1));
    currDot.className = "selected";
}

function init_slider() {
    let slider = document.getElementById('slider');
    let sliderCounter = document.getElementById('slider-counter');
    let sliderItems = slider.children;
    let sliderItemsLength = sliderItems.length;

    //set first 5 items
    for(let i = 0; i < 5; i++) {
        sliderItems[i].className = "position" + (i + 1);
    }

    //set rest of items
    for(let i = 5; i < sliderItemsLength; i++) {
        sliderItems[i].className = "";
    }

    let sliderCounterInnerHTMl = "";
    //set slider counter
    for(let i = 0; i < sliderItemsLength; i++) {
        sliderCounterInnerHTMl += `<span id="dot${i + 1}"></span>`;
    }
    sliderCounter.innerHTML = sliderCounterInnerHTMl;
    update_slider_counter("none", sliderItemsLength);
}