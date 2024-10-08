$(document).ready(function () {
  var conditionFlg = 0;
  countdownTimer();
  setCitySelect();
  customSelectbox(2);
  websiteRedirect();
  openMenu();
  closeMenu();
  setCarousel();
  changeCarousel();
  // $('.custom-select2 .select-selected').click(function () {
  //   if (conditionFlg == 0) {
  //     if($(window).width() >425) {
  //       $.alert({
  //         title: 'Thông báo!',
  //         content: 'Bố mẹ chưa chọn tỉnh/thành phố',
  //         boxWidth: '37.5%',
  //         useBootstrap: false,
  //         type: 'red',
  //         theme: 'my-theme',
  //         backgroundDismiss: true
  //       });
  //     } else {
  //       $.alert({
  //         title: 'Thông báo!',
  //         content: 'Bố mẹ chưa chọn tỉnh/thành phố',
  //         boxWidth: '80%',
  //         useBootstrap: false,
  //         type: 'red',
  //         theme: 'my-theme',
  //         backgroundDismiss: true
  //       });
  //     }
  //   }
  // });
  $('.custom-select2 .select-selected').click(function () {
    if (conditionFlg == 0) {
      if($(window).width() >425) {
        $.dialog({
          title: 'Thông báo!',
          boxWidth: '37.5%',
          content: 'Bố mẹ chưa chọn tỉnh/thành phố',
          useBootstrap: false,
          type: 'red',
          backgroundDismiss: true
        });
      } else {
        $.dialog({
          title: 'Thông báo!',
          content: 'Bố mẹ chưa chọn tỉnh/thành phố',
          boxWidth: '80%',
          useBootstrap: false,
          backgroundDismiss: true
        });
      }
    }
  });

  $('.tooltip').tooltipster({
    side: 'top',
    trigger: "custom",
    triggerOpen: {
      click: true,  // For mouse
      tap: true    // For touch device
    },
    triggerClose: {
      click: true,  // For mouse
      tap: true    // For touch device
    }
  });
});

function countdownTimer() {
  // var countDownDate = new Date("Jan 1, 2025 00:00:00").getTime();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  var countDownDate = tomorrow.getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    var dayQuotient = Math.floor(distance / (1000 * 60 * 60 * 24) / 10);
    var dayRemainder = Math.floor(distance / (1000 * 60 * 60 * 24)) % 10;
    var hourQuotient = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) / 10);
    var hourRemainder = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) % 10;
    var minuteQuotient = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60) / 10);
    var minuteRemainder = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) % 10;
    var secondQuotient = Math.floor((distance % (1000 * 60)) / 1000 / 10);
    var secondRemainder = Math.floor((distance % (1000 * 60)) / 1000) % 10;

    $("#day-quotient").text(dayQuotient);
    $("#day-remainder").text(dayRemainder);
    $("#hour-quotient").text(hourQuotient);
    $("#hour-remainder").text(hourRemainder);
    $("#minute-quotient").text(minuteQuotient);
    $("#minute-remainder").text(minuteRemainder);
    $("#second-quotient").text(secondQuotient);
    $("#second-remainder").text(secondRemainder);

  }, 1000);
}

function customSelectbox(selectFlg) {
  var x, i, j, selElmnt, a, b, c;
  /*look for any elements with the class "custom-select":*/
  if (selectFlg == 1) {
    x = document.getElementsByClassName("custom-select");
  } else {
    x = document.getElementsByClassName("custom-select2");
  }

  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
      /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  /*if the user clicks anywhere outside the select box,
  then close all select boxes:*/
  document.addEventListener("click", closeAllSelect);
}

function setCitySelect() {
  $.ajax({
    url: 'https://nhtoan611.github.io/glico-landing/js/city.json',
    type: 'GET',
    success: function (data) {
      data.forEach(function (city) {
        $('#city-select')
          .append($("<option></option>")
            .attr("value", city.id)
            .text(city.name));
      });
      customSelectbox(1);
      $('.select-items').children().on('click', function () {
        var city = $(this).html();
        conditionFlg = 1;
        setDistrictSelect(city);
      });
    }
  });
}

function setDistrictSelect(city) {
  $.ajax({
    url: 'https://nhtoan611.github.io/glico-landing/js/district.json',
    type: 'GET',
    success: function (data) {
      $(".custom-select2 option[value!='0']").remove();
      data.forEach(function (store) {
        if (store.city == city) {
          $('#district-select')
            .append($("<option></option>")
              .text(store.district));
        };
      });
      $('.custom-select2>div').remove();
      customSelectbox(2);
      $('.custom-select2 .select-items').children().on('click', function () {
        var district = $(this).html();
        displayStore(city, district);
      });
    }
  });
}

function displayStore(city, district) {
  $.ajax({
    url: 'https://nhtoan611.github.io/glico-landing/js/store.json',
    type: 'GET',
    success: function (data) {
      $('.store-list>div').remove();
      data.forEach(function (store) {
        if ((store.city == city) && (store.district == district)) {
          $('.store-list').append('<div class="store-address"><p class="store-name">' + store.name + '</p><p>' + store.address + '</p></div>');
          // if (store.address.length > 43) {
          //   for (var i = 43; i > 0; i--) {
          //     if (store.address[i] === ',') {
          //       var shortAddress = store.address.substring(0, i);
          //       shortAddress = shortAddress.concat(' ...');
          //       break;
          //     };
          //   }
          //   $('.store-list').append('<div class="store-address tooltip" title="' + store.address + '"><p class="store-name">' + store.name + '</p><p>' + shortAddress + '</p></div>');
          // } else {
          //   $('.store-list').append('<div class="store-address"><p class="store-name">' + store.name + '</p><p>' + store.address + '</p></div>');
          // }
        };
      });
    }
  });
}

function openMenu() {
  $('#menu-logo').click(function () {
    $('.home').hide();
    $('.menu-mobile').show()
  })
}

function closeMenu() {
  $('.close-btn').click(function () {
    $('.home').show();
    $('.menu-mobile').hide();
  })
}

function websiteRedirect() {
  $("#btn-store").click(function () {
    $('html, body').animate({
      scrollTop: $("#store-location-page").offset().top
    }, 1000);
  });
  $("#btn-gift").click(function () {
    $('html, body').animate({
      scrollTop: $("#gift-page").offset().top
    }, 1000);
  });
  $('.header-facebook').click(function () {
    window.open("https://www.facebook.com/glicoicreoVietnam/");
  });
  $('.header-website').click(function () {
    window.open("http://glico.com.vn/");
  });
  $('.contact-facebook').click(function () {
    window.open("https://www.facebook.com/glicoicreoVietnam/");
  });
  $('.contact-website').click(function () {
    window.open("http://glico.com.vn/");
  });
  $('.menu-facebook').click(function () {
    window.open("https://www.facebook.com/glicoicreoVietnam/");
  });
  $('.menu-website').click(function () {
    window.open("http://glico.com.vn/");
  });
  $('.menu-hotline').click(function () {
    window.open("tel:190055599");
  });
  $('.dot').click(function () {
    $(this).parent().find('.dot-active').removeClass('dot-active');
    $(this).addClass('dot-active');
  });
  // gift img1
  $('.gift-img1 .dot-blue').click(function () {
    $('.gift-img1 img').attr('src', 'img/gift1-2.png');
  });
  $('.gift-img1 .dot-brown').click(function () {
    $('.gift-img1 img').attr('src', 'img/gift1-1.png');
  });
  $('.gift-img1 .dot-pink').click(function () {
    $('.gift-img1 img').attr('src', 'img/gift1.png');
  });
  // gift img2
  $('.gift-img2 .dot-red').click(function () {
    $('.gift-img2 img').attr('src', 'img/gift2-1.png');
  });
  $('.gift-img2 .dot-white').click(function () {
    $('.gift-img2 img').attr('src', 'img/gift2-2.png');
  });
  $('.gift-img2 .dot-cyan').click(function () {
    $('.gift-img2 img').attr('src', 'img/gift2.png');
  });
  //gift img3
  $('.gift-img3 .dot-cyan').click(function () {
    $('.gift-img3 img').attr('src', 'img/gift-m7.png');
  });
  $('.gift-img3 .dot-yellow').click(function () {
    $('.gift-img3 img').attr('src', 'img/gift-m9.png');
  });
  $('.gift-img3 .dot-pink').click(function () {
    $('.gift-img3 img').attr('src', 'img/gift4.png');
  });
  //gift img4
  $('.gift-img4 .dot-pink').click(function () {
    $('.gift-img4 img').attr('src', 'img/gift5.png');
  });
  $('.gift-img4 .dot-black').click(function () {
    $('.gift-img4 img').attr('src', 'img/gift5-1.png');
  });
  $('.gift-img4 .dot-cyan').click(function () {
    $('.gift-img4 img').attr('src', 'img/gift5-2.png');
  });
}

function setCarousel() {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    stagePadding: 100,
    responsive: {
      0: {
        items: 1
      }
    }
  })
}

function changeCarousel() {
  var owl1 = $('#gift-page1-mobile .owl-carousel');
  var owl2 = $('#gift-page2-mobile .owl-carousel');
  var owl3 = $('#gift-page3-mobile .owl-carousel');

  var src1 = 'img/gift6.png';
  var src2 = 'img/gift7.png';
  var src3 = 'img/gift-m1.png';
  var src4 = 'img/gift-m2.png';
  var src5 = 'img/gift-m3.png';
  var src6 = 'img/gift-m4.png';
  var src7 = 'img/gift-m5.png';
  var src8 = 'img/gift-m6.png';
  var src9 = 'img/gift-m7.png';
  var src10 = 'img/gift-m8.png';
  var src11 = 'img/gift-m9.png';
  var src12 = 'img/gift5.png';
  var src13 = 'img/gift5-1.png';
  var src14 = 'img/gift5-2.png';
  var src15 = 'img/gift3.png';
  // Listen to owl events:
  owl1.on('changed.owl.carousel', function (property) {
    var current = property.item.index;
    var src = $(property.target).find(".owl-item").eq(current).find("img").attr('src');
    if (src == src3 || src == src4 || src == src5) {
      $('#gift-page1-mobile .gift-title').text('Ghế ăn dặm đa năng 3 chế độ');
      $('#gift-page1-mobile .gift-detail').text('Tùy chỉnh độ cao, có thể gấp gọn và có bánh xe hỗ trợ bé tập đi');
    } else if (src == src6 || src == src7 || src == src8) {
      $('#gift-page1-mobile .gift-title').text('Xe chòi chân Motion thăng bằng cao cấp');
      $('#gift-page1-mobile .gift-detail').text('Kèm bàn đạp phát triển vận động');
    }
  });

  owl2.on('changed.owl.carousel', function (property) {
    var current = property.item.index;
    var src = $(property.target).find(".owl-item").eq(current).find("img").attr('src');
    if (src == src9 || src == src10 || src == src11) {
      $('#gift-page2-mobile .gift-title').text('Xe Bus kéo năng động');
      $('#gift-page2-mobile .gift-detail').text('Kèm đồ chơi đồng hành cùng bé');
    } else if (src == src12 || src == src13 || src == src14) {
      $('#gift-page2-mobile .gift-title').text('Xe đẩy 5 bánh thông minh');
      $('#gift-page2-mobile .gift-detail').text('Gấp gọn, nhẹ nhàng');
    } else if (src == src15) {
      $('#gift-page2-mobile .gift-title').text('Tủ nhựa cao cấp');
      $('#gift-page2-mobile .gift-detail').text('Có bánh xe di chuyển tiện lợi');
    }
  });

  owl3.on('changed.owl.carousel', function (property) {
    var current = property.item.index;
    var src = $(property.target).find(".owl-item").eq(current).find("img").attr('src');
    if (src == src1) {
      $('#gift-page3-mobile .gift-title').text('Bàn chơi đa năng, tiện dụng');
      $('#gift-page3-mobile .gift-detail').text('Kích thích sáng tạo');
    } else if (src == src2) {
      $('#gift-page3-mobile .gift-title').text('Thảm chơi chống thấm, chống trượt');
      $('#gift-page3-mobile .gift-detail').text('Chất liệu an toàn cho bé');
    }
  });
}
