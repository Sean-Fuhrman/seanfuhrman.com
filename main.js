const HOMEPAGE_CLOSING_ANIMATION_TIME = 600;
const HOMEPAGE_OPENING_ANIMATION_TIME = 600;

let timeoutID;

/** Start of code for routing with animations */
document.addEventListener("click", (e) => {
    const {target} = e;
    if(!target.matches("a")) {
        return;
    }
    if(target.pathname == "/Resume.pdf") {
        window.location.pathname = "/Resume.pdf";
        return;
    }
    e.preventDefault();
    urlRoute(e);
});

const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();
}

const urlRoutes = {
    "/" : {
        title : "Home | Sean Fuhrman",
        description : "I'm a Computer Engineering major studying at University of California San Diego. I'm passionate about computert science, artificial intelligence, building fun projects, and learning new things",
        openWithAnimations: openHomepage,
        openWithoutAnimtions: () => {
            initHomepage();
            addFadeInAnimations();
        },
    },
    "/projects" : {
        title : "Projects | Sean Fuhrman",
        description : "Welcome to my projects page! Showcasing a music genre clasifer, this website, and more",
        openWithAnimations: openProjects,
        openWithoutAnimtions: initProjects,
    },
    "/blog" : {
        title : "Blog | Sean Fuhrman",
        description : "Notes and general writings",
        openWithAnimations: openBlog,
        openWithoutAnimtions: initBlog,
    },
    "/contact" : {
        title : "Contact | Sean Fuhrman",
        description : "Come leave me a comment",
        openWithAnimations: openContact,
        openWithoutAnimtions: initContact,
    },
    "/publications" : {
        title : "Publications | Sean Fuhrman",
        description : "My publications",
        openWithAnimations: openPublications,
        openWithoutAnimtions: initPublications,
    },
}

const urlLocationHandler = async () => {
    let location = window.location.pathname;
    if(location.length == 0) {
        location = "/";
    }

    if(/^\/blog\/.*/.test(location)) { //some blog post is being loaded
        openBlogPost(location);
        return;
    }

    const route = urlRoutes[location] || urlRoutes["/"]; //NOTE: replace this with 404 page if i want to implement that

    document.querySelector('meta[name="description"]').setAttribute("content", route.description);
    document.title = route.title;

    //add page with or without animations as necessary

    if(document.querySelectorAll("main section").length > 1) { //indicates multiple quick clicks
        document.querySelectorAll("main section").forEach((e) => e.remove());
        window.clearTimeout(timeoutID);
        route.openWithoutAnimtions();
        return;
    }

    if(document.querySelector("main section") == null) {
        route.openWithoutAnimtions();
    } else {
        route.openWithAnimations();
    }
}

window.onpopstate = urlLocationHandler;

urlLocationHandler();

/** End of code for routing with animations */


/** Start of code for hompage */

function addFadeInAnimations() {
    document.querySelector('#profile-pic').className += "  fade-in-animate";
    document.querySelector('#foreground h1').className += " fade-in-delay1-animate";
    document.querySelector('#foreground h2').className += " fade-in-delay1-animate";
    document.querySelector('#foreground p').className += " fade-in-delay1-animate";
    document.querySelector('.icon-container').className += " fade-in-delay2-animate";

    // only add this if screen is large enough
    if(window.innerWidth >= 600) {
        document.querySelectorAll('#foreground nav a').forEach(button => { button.className += " fade-in-delay2-animate"; });
        document.querySelector('#resume-button').className += " fade-in-delay2-animate";
    }
   
    // add timeout to remove animation class
    setTimeout(() => {
        document.querySelectorAll('#foreground nav a').forEach(button => { button.classList.remove("fade-in-delay2-animate"); });
        document.querySelector('#resume-button').classList.remove("fade-in-delay2-animate");
    }, 1800);
}

function initHomepage() {
    let main = document.querySelector('main');
    let homePageTpl = document.getElementById('homepage-tpl');
    main.append(homePageTpl.content.cloneNode(true));

    // hookup our new toggle
    const btn = document.getElementById('nav-toggle');
    btn.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
    });

    // also close the menu if someone clicks a link
    document.querySelectorAll('#foreground nav a')
    .forEach(a => a.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
    }));
}

function removeHomepage() {
    document.getElementById('homepage').remove(); 
}

function openHomepage() {
    //get current section that needs to be closed
    let currSection = document.querySelector("main section");

    //add homepage
    initHomepage();

    currSection.className = "close-animate";
    document.getElementById('homepage').className = "homepage-open-animate";

    let foreground = document.getElementById('foreground');
    foreground.style.width = "100%";
    foreground.style.height = "100%";

    timeoutID = window.setTimeout(() => { 
        currSection.remove();
        //reset projects to reset animations
        removeHomepage();
        initHomepage();
    }, HOMEPAGE_OPENING_ANIMATION_TIME);
}

/** End of code for homepage */

/** Start of code for projects page */


function openProjects(e) {
    //add projects, without animations
    initProjects();

    //add animations
    document.getElementById('foreground').className = "foreground-close-animate";
    document.getElementById('homepage').className = "homepage-close-animate";
    document.getElementById('projects').className = "open-animate";
   
    //remove homepage after animations
    timeoutID = window.setTimeout(() => { 
        removeHomepage(); 
        //reset projects to reset animation time
        removeProjects();
        initProjects();
    }, HOMEPAGE_CLOSING_ANIMATION_TIME);
}

function closeProjects(e){
    //remove event listener to prevent multiple clicks
    document.getElementById('back-home-button').removeEventListener('click', closeProjects);
    
    //add homepage to main
    initHomepage();
    //remove event listener to prevent click during animation
    removeHomepageEventListeners();


    //add animations
    document.getElementById('projects').className = "close-animate";
    document.getElementById('homepage').className = "homepage-open-animate";
    document.getElementById('foreground').className = "foreground-open-animate";

    pushPageState("");

    let foreground = document.getElementById('foreground');
    foreground.style.width = "100%";
    foreground.style.height = "100%";

    //remove homepage after animations
    timeoutID = window.setTimeout(() => { 
        removeprojects(); 
        //reset projects to reset animations
        removeHomepage();
        initHomepage();
    }, HOMEPAGE_OPENING_ANIMATION_TIME);
}

class projectsItem extends HTMLElement{
    constructor() {
        super();
        const header = this.getAttribute('header');
        const details = this.getAttribute('details');
        const githubLink = this.getAttribute('github');
        const img = this.getAttribute('img');
        let srcAttributes = this.getAttributeNames().filter(attrName => attrName.startsWith('src'));
        srcAttributes = srcAttributes.map(attrName => this.getAttribute(attrName));

        if(!header || !img || !details) {
            console.error("projects Item must have header, details, and img attributes");
            return;
        }
        
        this.attachShadow({mode : "open"});

        let srcHTML = "";

        //if source attributes has more than one element, it indicates video
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

        if(githubLink) { //long string of numbers is github svg
            githubHTML += `
                <a id="github-link" href="${githubLink}" >
                    <svg width="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                </a>
            `;
        } 
        let paragraphFontSize = "1";
       
        this.shadowRoot.innerHTML += `
            <style>
                * {
                    margin: 0;
                    padding : 0;
                }
                div {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    border: 3px solid var(--projects-highlight-color);
                    border-radius: 10px;
                    background: var(--projects-item-background-color);
                    padding-bottom: 10px;
                    padding-top : 10px;
                    padding-left : 5px;
                    padding-right : 5px;
                    gap : 10px;
                }
                #media {
                    width: 80%;
                }
                div h3 {
                    text-align : center;
                }
                div p {
                    text-align : center;
                    width: 90%;
                    font-size: ${paragraphFontSize}rem;
                }
                #github-link {
                    text-decoration: none;
                    color: var(--projects-item-text-color);
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
                    flex-flow: row no-wrap;
                    justify-content: center;
                    column-gap: 10px;
                    align-items: center;
                    width: 90%;
                }
            </style>

            <div class="projects-item-container">
                <section>
                    <h3 > ${header}  </h3>
                    ${githubHTML}
                </section>
                ${srcHTML}
                <p> ${details} </p>
            </div>
        `;
    }
}

customElements.define('projects-item', projectsItem);

function initProjects() {
    let main = document.querySelector('main');
    let projectsTpl = document.getElementById('projects-tpl');
    main.append(projectsTpl.content.cloneNode(true));

    document.getElementById('left-button').addEventListener('click', moveSliderRight);
    document.getElementById('right-button').addEventListener('click', moveSliderLeft);

    document.body.style.backgroundColor = "var(--projects-background-color)";

    init_slider();
}

function removeProjects() {
    document.getElementById('right-button').removeEventListener('click', moveSliderRight);
    document.getElementById('left-button').removeEventListener('click', moveSliderLeft);
    document.getElementById('projects').remove(); 
}

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

/** End of code for projects page */

/** Start of code for blog page */


function openBlog(e, pushState = true) {
    //add blog page, without animations
    initBlog();

    //add animations
    const fg = document.getElementById('foreground');
    if (fg){ 
        document.getElementById('foreground').className = "foreground-close-animate";
        document.getElementById('homepage').className = "homepage-close-animate";
        document.getElementById('blog').className = "open-animate";
    
        //remove homepage after animations
        timeoutID = window.setTimeout(() => { 
            removeHomepage(); 
            //reset contact page to reset animation time
            removeBlog();
            initBlog();
        }, HOMEPAGE_CLOSING_ANIMATION_TIME);
    } else{
        closeBlogPost();
        initBlog();
    }
}

function initBlog() {
    let main = document.querySelector('main');
    let blogTpl = document.getElementById('blog-tpl');
    main.append(blogTpl.content.cloneNode(true));

    document.body.style.backgroundColor = "var(--blog-background-color)";
}

function removeBlog(){
    document.getElementById('blog').remove(); 
}

function openBlogPost() {
    let main = document.querySelector('main');
    let blogPostTpl = document.getElementById('blog-post-tpl');

    // to ensure no glitching get rid of other content, this is OK because blog 
    // post never opens with animations
    document.querySelectorAll("main section").forEach((e) => e.remove());
    window.clearTimeout(timeoutID);
    main.append(blogPostTpl.content.cloneNode(true));

    //set zero-md src attribute based on URL (href of link must match file name)
    let filename = window.location.pathname.split("/")[2];
    document.querySelector('zero-md').src = "/blog-posts/" + filename + ".md";
}

function closeBlogPost() {
    //remove event listener to prevent multiple clicks
    let main = document.querySelector('main');
    let blogPostTpl = document.getElementById('blog-post-tpl');

    //remove blog post
    main.querySelector('zero-md').remove();
    main.querySelector('iframe.utterances-frame').remove();
    main.querySelector('section').remove();
    //add blog page
    initBlog();
}


/** End of code for blog page */

/** Start of code for contact page */

function openContact(e){
    //add contact page, without animations
    initContact();

    //add animations
    document.getElementById('foreground').className = "foreground-close-animate";
    document.getElementById('homepage').className = "homepage-close-animate";
    document.getElementById('contact').className = "open-animate";

    //remove homepage after animations
    timeoutID = window.setTimeout(() => { 
        removeHomepage(); 
        //reset contact page to reset animation time
        removeContact();
        initContact();

    }, HOMEPAGE_CLOSING_ANIMATION_TIME);

}

function initContact() {
    let main = document.querySelector('main');
    let contactTpl = document.getElementById('contact-tpl');
    main.append(contactTpl.content.cloneNode(true));

    document.body.style.backgroundColor = "var(--contact-background-color)";
}

function removeContact() {
    document.getElementById('contact').remove(); 
}
/** End of code for contact page */

/** Start of code for publications page */

function openPublications(e){
    //add publications page, without animations
    initPublications();

    //add animations
    document.getElementById('foreground').className = "foreground-close-animate";
    document.getElementById('homepage').className = "homepage-close-animate";
    document.getElementById('publications').className = "open-animate";

    //remove homepage after animations
    timeoutID = window.setTimeout(() => { 
        removeHomepage(); 
        //reset contact page to reset animation time
        removePublications();
        initPublications();

    }, HOMEPAGE_CLOSING_ANIMATION_TIME);
}

function initPublications() {
    let main = document.querySelector('main');
    let publicationsTpl = document.getElementById('publications-tpl');
    main.append(publicationsTpl.content.cloneNode(true));

    document.body.style.backgroundColor = "var(--publications-background-color)";
}

function removePublications() {
    document.getElementById('publications').remove(); 
}
/** End of code for publications page */