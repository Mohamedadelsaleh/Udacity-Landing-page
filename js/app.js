/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const navigationList = document.querySelector('ul#navbar__list')
const allSections = document.querySelectorAll('section')

// convert sections from nodelist to array 
const sections = Array.from(allSections)


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Build the navigation menu dynamically
const createNavList = () => {
    for (let section of sections) {

        // Create li 'List item' for each section added or will be added dynamically 
        let listItems = document.createElement('li')
        
        // Get the name of each list item from data-nav attribute to add it as a navigation name in navBar 
        let sectionNavigation = section.getAttribute('data-nav')

        // Add it to HTML and NavBar
        listItems.innerHTML = `<a class='menu__link' href='#${section.id}'>${sectionNavigation}</a>`
        navigationList.appendChild(listItems)
    }
}

// Calling Function 
createNavList()

/********************** Smoothy Scrolling for onClick events **************************/

const navLink = document.querySelectorAll('.menu__link');

navLink.forEach((el) => el.addEventListener('click', (e) =>{
        e.preventDefault();
        const secID = e.target.getAttribute('href');
        const section = document.querySelector(secID);
        window.scrollTo({
            top: section.offsetTop,
            behavior:"smooth"
        })
    } 
));

// Add functionality to distinguish the section in view
const viewedSection = (sectionView) => {
    let sectionPostion = sectionView.getBoundingClientRect();
    return sectionPostion.top <= 150 && sectionPostion.bottom >= 150 ;

}

// add active property to section in viewport
const activeSection = () => {

    const activeList = document.querySelectorAll('.menu__link')
    sections.forEach((section, idx) => {
        
        // section doesn't have active property add this property to it
        if (viewedSection(section)){ 
            if(!section.classList.contains('your-active-class') && !activeList[idx].classList.contains('active_List') ) {
                section.classList.add('your-active-class')
                activeList[idx].classList.add('active_List')
            }
        }
        // any section else will remove this property from him
        else {
            section.classList.remove('your-active-class')
            activeList[idx].classList.remove('active_List')
        }
    })
}
document.addEventListener('scroll',activeSection)


/***************************  Scrolling Button ************************/

const topBTN = document.getElementById('top');

window.onscroll =  () => {
    scrollFunction();
    
};

const scrollFunction = () => {
    // when scrolling down to 30px from top or more button will appear
    if (document.body.scrollTop > 30) {
        topBTN.style.display = 'block';
    } else {
        topBTN.style.display = 'none';
    }
}

// when clicking on top button return to top at 0px
topBTN.addEventListener('click', ()=>{
    window.scrollTo({
        top: 0,
        behavior:"smooth"
    }); 
});