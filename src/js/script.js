
document.addEventListener('DOMContentLoaded', function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();

    $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    (function burgerMenu() {
        let menu = $('#menu');
        let menu_links = $('.menu__link');
        $('#burger-container').click(function () {
            menu.toggleClass('menu_open');
        });
        for (let i = 0; i < menu_links.length; i++) {
            menu_links.eq(i).click(function () {
                menu.toggleClass('menu_open');
            });
        }
    }());

    (function popups() {
        let discountPopup = document.getElementsByClassName('discount-popup')[0];
        let discountPopupBtn = discountPopup.getElementsByClassName('btn')[0];

        document.querySelector('.discount .btn').onclick = () => {
            discountPopup.classList.remove('hidden');
        }
        discountPopupBtn.onclick = () => {
            discountPopup.classList.add('hidden');
        }

        let mastersBtns = document.querySelectorAll('.master__btn');
        let mastersSlider = document.getElementsByClassName('multiple-items')[0];
        let mastersFormContainer = document.getElementsByClassName('masters__form-container')[0];
        let mastersFormClose = document.getElementsByClassName('masters__form-close')[0];
        mastersBtns.forEach((masterBtn) => {
            masterBtn.onclick = () => {
                mastersSlider.classList.add('hidden');
                mastersSlider.style = 'height: 0';
                mastersFormContainer.classList.remove('hidden');
                mastersFormContainer.style = 'height: auto;';
            }
        });
        mastersFormClose.onclick = () => {
            mastersSlider.classList.remove('hidden');
            mastersFormContainer.classList.add('hidden');
            mastersFormContainer.style = 'height: 0;';
            mastersSlider.style = 'height: auto;';
        }
    }());

    (function form() {
        $('.error-input').hide();
        let name = $('#name');
        let phone = $('#phone');
        let service = $('#service');
        let master = $('#master');
        let datepicker = $('#datepicker');
        let time = $('#time');
        let form = $('#form');

        let loader = $('.loader');

        phone.mask("+7 (999) 999 - 99 - 99");

        $("#service").selectmenu();
        $("#master").selectmenu();
        $("#time").selectmenu();
        $("#datepicker").datepicker({minDate: +1, maxDate: "+1M +10D"});
        $("#datepicker").datepicker("option", "showAnim");

        $('#submit').click(function () {

            let hasError = false;
            $('.error-input').hide();
            name.css('border-color', '#ae8959');
            phone.css('border-color', '#ae8959');
            service.next().css('border-color', '#ae8959');
            master.next().css('border-color', '#ae8959');
            datepicker.css('border-color', '#ae8959');
            time.next().css('border-color', '#ae8959');

            if (!name.val()) {
                name.next().show();
                hasError = true;
                name.css('border-color', 'red');
            }

            if (!phone.val()) {
                phone.next().show();
                hasError = true;
                phone.css('border-color', 'red');
            }

            if (!service.val()) {
                service.next().next().show();
                hasError = true;
                service.next().css('border-color', 'red');
            }

            if (!master.val()) {
                master.next().next().show();
                hasError = true;
                master.next().css('border-color', 'red');
            }

            if (!datepicker.val()) {
                datepicker.next().show();
                hasError = true;
                datepicker.css('border-color', 'red');
            }

            if (!time.val()) {
                time.next().next().show();
                hasError = true;
                time.next().css('border-color', 'red');
            }

            if (!hasError) {
                loader.removeClass('hidden');
                $.ajax({
                    method: 'POST',
                    url: 'http://testologia.ru/checkout',
                    data: {
                        name: name.val(),
                        phone: phone.val(),
                        service: service.val(),
                        master: master.val(),
                        datepicker: datepicker.val(),
                        time: time.val()
                    }
                })
                    .done(function (msg) {
                        loader.addClass('hidden');
                        if (msg.success) {
                            form.addClass('hidden');
                            $('.masters__form-container h2').html('Спасибо что выбрали<br>Strong Club!');
                            $('.masters__form-container h2').css('margin-bottom', '79px');
                            $('#message').css('height', 'auto');
                            $('#message').removeClass('hidden');
                        } else {
                            alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                        }
                    })
            }
        })
    }());


    (function map() {
        ymaps.ready(init);

        function init() {
            // Создаем карту.
            var myMap = new ymaps.Map("map", {
                center: [55.75, 37.54],
                zoom: 15,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            });

            // Создаем метку.
            var myPlacemark = new ymaps.Placemark([55.75, 37.54], {}, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'public/images/icons/place.png',
                // Размеры метки.
                iconImageSize: [40, 50],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            });

            myMap.geoObjects.add(myPlacemark);
        }
    }());
})
