        // sidebar
        function toggleSidebar() {
          document.getElementById('sidebar').classList.toggle('active');
          document.getElementById('overlay').classList.toggle('active');
        }
        //cart count 
      document.addEventListener("DOMContentLoaded", function () {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartCountElement = document.getElementById("cartCount");
        if(cartCountElement){ 
          cartCountElement.textContent = cart.length;
        }
      });

    // slider

        document.addEventListener("DOMContentLoaded", () => {
      const slides = document.getElementById("slideWrapper");
      const dots = document.querySelectorAll(".dot");

      let currentIndex = 1;
      const totalSlides = dots.length + 2; // includes cloned first and last slides

      // Set initial position
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Function to update active dot
      function updateDots(index) {
        dots.forEach(dot => dot.classList.remove("active"));
        if (index >= 0 && index < dots.length) {
          dots[index].classList.add("active");
        }
      }

      // Move to a specific slide
      function moveTo(index) {
        slides.style.transition = "transform 0.6s ease-in-out";
        slides.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
      }

      // Move to next slide
      function nextSlide() {
        moveTo(currentIndex + 1);
      }

    //   // Slide transition end logic for infinite loop
      slides.addEventListener("transitionend", () => {
        if (currentIndex === totalSlides - 1) {
          slides.style.transition = "none";
          currentIndex = 1;
          slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        } else if (currentIndex === 0) {
          slides.style.transition = "none";
          currentIndex = totalSlides - 2;
          slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        updateDots(currentIndex - 1);
      });

      // Dot click event
      dots.forEach(dot => {
        dot.addEventListener("click", () => {
          clearInterval(interval);
          const index = parseInt(dot.getAttribute("data-index"));
          moveTo(index + 1);
          updateDots(index);
          interval = setInterval(nextSlide, 4000);
        });
      });

      // Auto slide every 4s
      let interval = setInterval(nextSlide, 4000);
    });


        // Horizontal slider controls
        const sliderItems = document.getElementById('sliderItems');
        const slideLeftBtn = document.getElementById('slideLeft');
        const slideRightBtn = document.getElementById('slideRight');

        slideLeftBtn.addEventListener('click', function() {
          sliderItems.scrollBy({ left: -450, behavior: 'smooth' });
        });
        slideRightBtn.addEventListener('click', function(){
          sliderItems.scrollBy({ left: 450, behavior: 'smooth' });
        });
        // object box
        const data = [
          {
            title: "Latest fashoin  | Up to 55% off",
            items: [
              { img: "/images/kurti1.jpg", label: "kurti1" },
              { img: "/images/kurti7.jpg", label: "kurti2" },
              { img: "/images/kurti3.jpg", label: "kurti3" },
              { img: "/images/kurti4.jpg", label: "kurti4" },
            ],
            link:"/see-more/1"
          },
          {
            title: "Men Latest Fashion style",
            items: [
              { img: "/images/New folder/MenFormal11.jpg", label: "men1" },
              { img: "/images/New folder/MenFormal13.jpg", label: "men2" },
              { img: "/images/New folder/MenFormal12.jpg", label: "men3" },
              { img: "/images/New folder/MenFormal10.jpg", label: "men4" },
            ],
            link:"/see-more/1"
        
          },
        
          {
            title: "Women's Formal Fashion",
            items: [
              { img: "/images/WomenFormal/girl Formal15.jpg", label: "Formal1" },
              { img: "/images/WomenFormal/girl Formal14.jpg", label: "Formal2" },
              { img: "/images/WomenFormal/girl Formal16.jpg", label: "Formal3" },
              { img: "/images/WomenFormal/girl Formal22.jpg", label: "Formal4" },
            ],
            link:"/see-more/1"
          }
        ];
      
        const container = document.getElementById("boxContainer");
        let html = '';

        data.forEach(box => {
          html += `<div class="box">
            <h3>${box.title}</h3>
            <div class="grid">`;

          box.items.forEach(item => {
            html += `
              <div class="item">
                <img src="${item.img}" alt="${item.label}">
                <span>${item.label}</span>
              </div>`;
          });

          html += `</div>
            <a href="${'/see-more/1'}">See more</a>
          </div>`;
        });

        container.innerHTML = html;
        //   horozantal slider
        const sliderItem1 = document.getElementById('sliderItem1');
        const slideLeftBtn1 = document.getElementById('slideLeft1');
        const slideRightBtn1 = document.getElementById('slideRight1');

        slideLeftBtn1.addEventListener('click', function() {
          sliderItem1.scrollBy({ left: -450, behavior: 'smooth' });
        });
        slideRightBtn1.addEventListener('click', function(){
          sliderItem1.scrollBy({ left: 450, behavior: 'smooth' });
        });
        

        // 2nd boxObject
        const secondData = [
      {
        title: "Deals on Top Brands",
        items: [
          { img: "/images/WomenSaree/saree18.jpg", label: "Saree" },
          { img: "/images/WomenSaree/saree19.jpg", label: "Saree" },
          { img: "/images/WomenSaree/saree20.jpg", label: "Saree" },
          { img: "/images/WomenSaree/sarees16.jpg", label:"Saree" },
        ],
        link: "/see-more/2"
      },

      {
        title: "Casual Fashion | Under ₹599",
        items: [
          { img: "images/MenCasual/Men3.jpg", label: "Casual-Cloths" },
          { img: "images/MenCasual/Men4.jpg", label: "Casual-Cloths" },
          { img: "images/MenCasual/Men7.jpg", label: "Casual-Cloths" },
          { img: "images/MenCasual/Men9.jpg", label: "Casual-Cloths" },
        ],
        link: "/see-more/2"
      },
      {
        title: "Girl's Pant Collection",
        items: [
          { img: "/images/girl pant2.jpg", label: "Girl-Pant"},
          { img: "/images/girl pant3.jpg", label: "Girl-Pant" },
          { img: "/images/girl pant4.jpg", label: "Girl-Pant" },
          { img: "/images/pant girl 6.jpg", label:"Girl-Pant" },
        ],
        link: "/see-more/2"
      },
    ];

    const secondContainer = document.getElementById("secondBoxContainer");
    let secondHTML = '';

    secondData.forEach(box => {
      secondHTML += `<div class="box">
        <h3>${box.title}</h3>
        <div class="grid">`;

      box.items.forEach(item => {
        secondHTML += `
          <div class="item">
            <img src="${item.img}" alt="${item.label}">
            <span>${item.label}</span>
          </div>`;
      });

      secondHTML += `</div>
        <a href="/see-more/2">See more</a>
      </div>`;
    });
    const sliderItem2 = document.getElementById('sliderItem2');
        const slideLeftBtn2 = document.getElementById('slideLeft2');
        const slideRightBtn2 = document.getElementById('slideRight2');

        slideLeftBtn2.addEventListener('click', function() {
          sliderItem2.scrollBy({ left: -450, behavior: 'smooth' });
        });
        slideRightBtn2.addEventListener('click', function(){
          sliderItem2.scrollBy({ left: 450, behavior: 'smooth' });
        });
      

    secondContainer.innerHTML = secondHTML;
    // horizantal slide in white space
    const exploreScroll = document.getElementById('exploreScroll');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    leftBtn.addEventListener('click', function(){
      exploreScroll.scrollBy({ left: -300, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', function(){
      exploreScroll.scrollBy({ left: 300, behavior: 'smooth' });
    });
    // Horizontal slider controls
        const sliderItem3 = document.getElementById('sliderItem3');
        const slideLeftBtn3 = document.getElementById('slideLeft3');
        const slideRightBtn3 = document.getElementById('slideRight3');

        slideLeftBtn3.addEventListener('click', function() {
          sliderItem3.scrollBy({ left: -450, behavior: 'smooth' });
        });
        slideRightBtn3.addEventListener('click', function(){
          sliderItem3.scrollBy({ left: 450, behavior: 'smooth' });
        });

        // 3rd box objects
        const thirdData = [
      {
        title: " Girl Summer Suit",
        items: [
          { img: "/images/Suit girl/suit10.jpg", label: "Suit" },
          { img: "/images/Suit girl/suit11.jpg", label: "Suit" },
          { img: "/images/Suit girl/suit12.jpg", label: "Suit" },
          { img: "/images/Suit girl/suit13.jpg", label: "Suit"},
        ],
        link: "#"
      },

      {
        title: "Boys Kids Outfits | Under ₹599",
        items: [
          { img: "/images/Kid/boy1.jpg", label: "Kid's Cloth" },
          { img: "/images/Kid/boy2.jpg", label: "Kid's Cloth" },
          { img: "/images/Kid/boy3.jpg", label: "Kid's Cloth" },
          { img: "/images/Kid/boy5.jpg", label: "Kid's Cloth" },
        ],
        link: "#"
      },
      {
        title: "Girl's Kids Collection",
        items: [
          { img: "/images/Kid/girl2.jpg", label: "Girl Kids Cloths"},
          { img: "/images/Kid/girl3.jpg", label: "Girl Kids Cloths" },
          { img: "/images/Kid/girl4.jpg", label: "Girl Kids Cloths" },
          { img: "/images/Kid/girl5.jpg", label: "Girl Kids Cloths" },
        ],
        link: "#"
      },
    ];


    const thirdContainer = document.getElementById("thirdBoxContainer");
    let thirdHTML = '';

    thirdData.forEach(box => {
      thirdHTML += `<div class="box">
        <h3>${box.title}</h3>
        <div class="grid">`;

      box.items.forEach(item => {
        thirdHTML += `
          <div class="item">
            <img src="${item.img}" alt="${item.label}">
            <span>${item.label}</span>
          </div>`;
      });

      thirdHTML += `</div>
        <a href="index6.html">See more</a>
      </div>`;
    });
    
      

    thirdContainer.innerHTML = thirdHTML;

    // Horizontal slider controls
        const sliderItem4 = document.getElementById('sliderItem4');
        const slideLeftBtn4 = document.getElementById('slideLeft4');
        const slideRightBtn4 = document.getElementById('slideRight4');

        slideLeftBtn4.addEventListener('click', function() {
          sliderItem4.scrollBy({ left: -450, behavior: 'smooth' });
        });
        slideRightBtn4.addEventListener('click', function(){
          sliderItem4.scrollBy({ left: 450, behavior: 'smooth' });
        });
      

    // star wala
    document.addEventListener("DOMContentLoaded", function () {
      const scrollAmount = 250;
      const carouselView = document.querySelector(".carousel-view");
      const leftArrow = document.querySelector(".arrow.left");
      const rightArrow = document.querySelector(".arrow.right");

      leftArrow.addEventListener("click", function(){
        carouselView.scrollBy({
          left: -scrollAmount,
          behavior: "smooth"
        });
      });

      rightArrow.addEventListener("click", function() {
        carouselView.scrollBy({
          left: scrollAmount,
          behavior: "smooth"
        });
      });
    });


      function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
      



        

