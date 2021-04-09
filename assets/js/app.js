$(function() {  // полная загрузка документа

    let intro = $("#intro");    // выборка по id самая быстрая
    let header = $("#header");
    let introH = intro.innerHeight(); // высота блока с учётом padding
    let headerH = header.innerHeight(); // высота шапки 
    let scrollTop = $(window).scrollTop();        // this на window, позиция скролла от верха


    /* Header class on scroll ================================================*/

    headerScroll();

    $(window).on("scroll  resize", function() { // событие скролла, обновление всех переменных при resize окна
        headerScroll();
    });

    function headerScroll() {
        introH = intro.innerHeight();
        headerH = header.innerHeight();

        let scrollTop = $(this).scrollTop();    // this на window, позиция скролла от верха

        if( scrollTop >= (introH - headerH) ) {
            header.addClass("header--dark");
        } else {
            header.removeClass("header--dark");
        }
    }

    /* Smooth scroll to sections ================================================*/

    $("[data-scroll]").on("click", function(event) { // выборка элементов с data-scroll, событие клика
        event.preventDefault();

        let scrollEl = $(this).data("scroll");      // this на ссылку, получить значение data
        let scrollElPos = $(scrollEl).offset().top; // позиция элемента от верха

        $("html, body").animate({                   // плавная анимация
            scrollTop: scrollElPos - headerH
        }, 500); 
        console.log(scrollElPos);
    });

    /* ScrollSpy ===============================================================*/ 

    let windowH = $(window).height();
    scrollSpy(scrollTop);

    $(window).on("scroll", function() {             // событие скролла
        scrollTop = $(window).scrollTop();
        scrollSpy(scrollTop);
    });

    function scrollSpy(scrollTop) {
        $("[data-scrollspy]").each(function() {     // проход по всем элементам с атрибутом
            let $this = $(this);
            let sectionId = $this.data('scrollspy');  // значение data атрибута
            let sectionOffset = $this.offset().top;   // позиция каждой секции
            sectionOffset -= windowH / 2;

            if (scrollTop >= sectionOffset) {
                $('#nav [data-scroll]').removeClass('active');
                $('#nav [data-scroll="' + sectionId + '"]').addClass('active');
            }
            if (scrollTop == 0) {
                $('#nav [data-scroll]').removeClass('active');
            }
        });
    }

    /* Modals== ===============================================================*/ 

    $('[data-modal]').on('click', function(event) {
        event.preventDefault();

        let modal = $(this).data('modal');

        $('body').addClass('no-scroll');
        $(modal).addClass('show');

        setTimeout(function() {
            $(modal).find('.modal__content').css({
                transform: 'scale(1)',
                opacity: '1'
            });
        });
    });

    $('[data-modal-close]').on('click', function(event) {
        event.preventDefault();
        let modal = $(this).parents('.modal');
        modalClose(modal);
    });

    $('.modal').on('click', function() {
        let modal = $(this);
        
        modalClose(modal);
    });

    $('.modal__content').on('click', function(event) {
        event.stopPropagation();    // при событии на элементе не будет срабатывать на его родителе
    });

    function modalClose(modal) {
        modal.find('.modal__content').css({
            transform: 'scale(0.5)',
            opacity: '0'
        });

        setTimeout(function() {
            $('body').removeClass('no-scroll');
            modal.removeClass('show');
        }, 200);
    }
});














