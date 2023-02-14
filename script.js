'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// ===================== Cookie ========================== //
// const header = document.querySelector('.header')
// const message = document.createElement('div')
// message.classList.add('cookie-message')

// message.insertAdjacentHTML('afterbegin','We use cookie for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>')
// header.append(message)

// document.querySelector('.btn--close-cookie').addEventListener('click',function(){
//     message.remove()
// })

// message.style.width = '104.1%'
// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 40 + 'px'

// ===================== Croll to for learn more ========================== //
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click',function(){
  section1.scrollIntoView({behavior: 'smooth'})
})


// ===================== Croll to for nav-link ========================== //

    //Cách này đơn giản nhưng khi có quá nhiều nav_link thì sẽ làm chậm hiệu xuất
// document.querySelectorAll('.nav__link').forEach(
//   function(element){
//     element.addEventListener('click',function(e){
//       const id = this.getAttribute('href')
//       document.querySelector(id).scrollIntoView({behavior:'smooth'})
//     })
//   }
// )

    //Thay thế bằng cách áp dụng kĩ thuật nổi bọt
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault() //Ngăn kĩ thuật # bên file HTML

  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
  }
})


// ===================== Operation ========================== //
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',function(e){
  const active_tab = e.target.closest('.operations__tab')
  if(!active_tab) return; //Nhấn bên ngoài nút

  //Active btn
  tabs.forEach(element => element.classList.remove('operations__tab--active'))
  active_tab.classList.add('operations__tab--active')

  //Active content
  tabsContent.forEach(element => element.classList.remove('operations__content--active'))
  const active_content = document.querySelector(`.operations__content--${active_tab.dataset.tab}`).classList.add('operations__content--active')
  
})

// ===================== Nav_Hover ========================== //
    // Cách 1
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover',function(e){
  if(e.target.classList.contains('nav__link')){
    const link_active = e.target
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link')
    //Phòng trường hợp logo web ở nhiều nơi 
    const logo = link_active.closest('.nav').querySelector('.nav__logo')
    siblings.forEach(element => {
      if(element !== link_active){
        element.style.opacity = 0.5
      }
    })
    logo.style.opacity = 0.5
  }
})

nav.addEventListener('mouseout',function(e){
  if(e.target.classList.contains('nav__link')){
    const link_active = e.target
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link')
    //Phòng trường hợp logo web ở nhiều nơi 
    const logo = link_active.closest('.nav').querySelector('.nav__logo')
    siblings.forEach(element => {
      if(element !== link_active){
        element.style.opacity = 1
      }
    })
    logo.style.opacity = 1
  }
})

    //Cách 2 --- Viết gọn
// const nav = document.querySelector('.nav');
// const handlerHover = function(e,opacity){
//   if(e.target.classList.contains('nav__link')){
//     const link_active = e.target
//     const siblings = link_active.closest('.nav').querySelectorAll('.nav__link')
//     //Phòng trường hợp logo web ở nhiều nơi 
//     const logo = link_active.closest('.nav').querySelector('.nav__logo')
//     siblings.forEach(element => {
//      if(element !== link_active){
//       element.style.opacity = opacity
//       }
//     })
//     logo.style.opacity = opacity
//   }
// }

// nav.addEventListener('mouseover',function(e){
//   handlerHover(e,0.5);
// })
// nav.addEventListener('mouseout',function(e){
//   handlerHover(e,1);
// })

// ===================== Sticky ========================== //
    //Cách 1
const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function(entries, _ ){
  const [entry] = entries; //Tương đương với việc const [entry] = entries[0], chỉ có 1 ngưỡng nên chỉ có 1 entry
  if(!entry.isIntersecting)
    nav.classList.add('sticky')
  else nav.classList.remove('sticky')  
}

const headerObserver = new IntersectionObserver(stickyNav,{
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})
headerObserver.observe(header)

    //Cách 2: Hiệu suất của trang web sẽ bị giảm xuống vì lấy value scroll liên tục
// const CoordSection1 = section1.getBoundingClientRect().top 
// window.addEventListener('scroll',function(){
//   if(window.scrollY > CoordSection1){
//     nav.classList.add('sticky')
//   }
// })


// ===================== Section ========================== //
const sectionAll = document.querySelectorAll('.section')

const sectionHidden = function(entries, observe ){
  const [entry] = entries;  //Tương đương với việc const [entry] = entries[0], chỉ có 1 ngưỡng nên chỉ có 1 entry
  if(!entry.isIntersecting) return;
  else entry.target.classList.remove('section--hidden')  //entry.target : phần tử hiện đang được giao nhau
  observe.unobserve(entry.target)
}

const sectionObsever = new IntersectionObserver(sectionHidden , {
  root: null,
  threshold: 0.15
})
sectionAll.forEach(section => {
  sectionObsever.observe(section)
  section.classList.add('section--hidden')
})


// ===================== Lazy-load ========================== //

const imageAll = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observe){
  const [entry] = entries;  //Tương đương với việc const [entry] = entries[0], chỉ có 1 ngưỡng nên chỉ có 1 entry
  if(!entry.isIntersecting) return;
  //Thay thế soure cũng đồng nghĩa là web sẽ load lại ảnh đó
  else entry.target.src = entry.target.dataset.src //entry.target : phần tử hiện đang được giao nhau
  entry.target.addEventListener('load',() => {
    entry.target.classList.remove('lazy-img')
  })
  observe.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg,{
  root:null,
  threshold: 0,
  rootMargin: '-200px'  //Thực ra là 200px thì đúng
})

imageAll.forEach(img => {
  imgObserver.observe(img)
})

// ===================== Click-slider ========================== //
    //Arrow-slider
const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')

let curSlide = 0;
const slideMax = slides.length;

const calcGoToSlide = function(currentSlide){
  slides.forEach(function(slide,i){
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`
  })
}
calcGoToSlide(0) // 0% , 100% , 200% --> Khởi tạo

// -100% , 0% , 100%
const nextSlide = function(){
  if(curSlide === slideMax - 1){
    curSlide = 0
  }
  else curSlide++;

  calcGoToSlide(curSlide)
  activeDots(curSlide)
}
// -200% , -100% , 0%
const previousSlide = function(){
  if(curSlide === 0){
    curSlide = slideMax - 1
  }
  else curSlide--;

  calcGoToSlide(curSlide)
  activeDots(curSlide)
}

btnRight.addEventListener('click',nextSlide)
btnLeft.addEventListener('click',previousSlide)
    //Key - slider
document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowRight')  nextSlide()
  if(e.key === 'ArrowLeft') previousSlide()
})


    //Dots - slider
const dotContainer = document.querySelector('.dots')

const createDots = function(){
  slides.forEach(function(_ , i){
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`)
  })
}
createDots() 

const activeDots = function(slide){
  document.querySelectorAll('.dots__dot').forEach(function(dot){
    dot.classList.remove('dots__dot--active')
  })
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}
activeDots(0) //Khởi tạo

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const slide = e.target.dataset.slide
    calcGoToSlide(slide)
    activeDots(slide)
  }
    
})