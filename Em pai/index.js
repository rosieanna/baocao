window.onload = function() {
  alert("Click bên trái hoặc bên phải bức hình để bet.\nKhông khuyến khích đánh bạc dưới mọi hình thức :))"); 
};

$(document).ready(function() {
  $(".plus").click(function() {
    var budget = parseInt($(".budget").text());
    var valueIn = $("#inputId");
    var betValue = parseInt(valueIn.val());
    var picButton = $(this).closest(".frame").find(".layer-1 button").first();
    var currentValue = parseInt(picButton.text());
    if (budget > 0 && !isNaN(betValue) && betValue <= budget) {
      budget = budget - betValue;
      $(".budget").text(budget);
      $("#inputId").val(""); 
      picButton.text(currentValue + betValue);
    } else if (budget > 0) {
      budget--;
      $(".budget").text(budget);
      picButton.text(currentValue + 1);
    }
  });

  $(".minus").click(function() {
    var budget = parseInt($(".budget").text());
    var valueIn = $("#inputId");
    var betValue = parseInt(valueIn.val());
    var picButton = $(this).closest(".frame").find(".layer-1 button").first();
    var currentValue = parseInt(picButton.text());
    if (currentValue > 0 && !isNaN(betValue) && betValue <= currentValue) {
      budget = budget + betValue;
      $(".budget").text(budget);
      $("#inputId").val(""); 
      picButton.text(currentValue - betValue);
    } else if (currentValue > 0) {
      budget++;
      $(".budget").text(budget);
      picButton.text(currentValue - 1);
    }
  });
});

$(document).ready(function() {
	initWheel();
  let profit = 0;
  let bet = 0;
  let earn = 0;
 	$('.btn.pl').on('click', function(){
    profit = 0;
    bet = 0;
    earn = 0;
    const outcome = Math.floor(Math.random() * 15);
    spinWheel(outcome);
    const picButtons = $(".pic");
    picButtons.each(function() {
        bet += parseInt($(this).text());
    });
    switch (outcome) {
      case 0:
        earn = parseInt($(`.coin`).text()) * 14;
        break;
      case 1:
      case 3:
      case 5:
      case 7:
      case 9:
      case 11:
      case 13:
        earn = parseInt($(`.gold`).text()) * 2;
        break;
      case 2:
      case 4:
      case 6:
      case 8:
      case 10:
      case 12:
        earn = parseInt($(`.brick`).text()) * 2;
        break;
      case 14:
        earn = 0;
        break;
      default:
    }
      profit = earn - bet;
    setTimeout(() => {
      if (profit == 0) {
        var sound = new Audio("./sfx/normal.mp3");
        sound.play();
      }   else if (profit > 0) {
        var sound = new Audio("./sfx/profit.mp3");
        sound.play();
      }   else {
        var sound = new Audio("./sfx/normal.mp3");
        sound.play();
      }
  }, 5800);
    setTimeout(() => {
      var budget = parseInt($(".budget").text());
      $('.budget').text(budget + earn);
      if (profit == 0) {
          confirm(`Tổng bet: ${bet}\nNhận về: ${earn}\nProfit: ${profit}`);
      }   else if (profit > 0) {
          confirm(`Tổng bet: ${bet}\nNhận về: ${earn}\nProfit: ${profit}`);
      }   else {
          confirm(`Tổng bet: ${bet}\nNhận về: ${earn}\nProfit: ${profit}`);
      }
      $('.brick.pic').text('0');
      $('.gold.pic').text('0');
      $('.coin.pic').text('0');
  }, 6000);
  });

  $('.btn.rs').on('click', function() {
    const picButtons = $(".pic");
    bet = 0;
    picButtons.each(function() {
      bet += parseInt($(this).text());
      $('.budget').text(bet);
    });
    $('.brick.pic').text('0');
    $('.gold.pic').text('0');
    $('.coin.pic').text('0');
  });

  $('.btn.ai').on('click', function() {
    const budget = parseInt($(".budget").text());
    if (budget > 0) {
      $("#inputId").val(budget); 
    }
  });
});

function initWheel(){
	var $wheel = $('.roulette-wrapper .wheel'),
  		row = "";
      
  row += "<div class='row'>";
  row += "  <div class='card brick'><\/div>";
  row += "  <div class='card gold'><\/div>";
  row += "  <div class='card brick'><\/div>";
  row += "  <div class='card gold'><\/div>";
  row += "  <div class='card brick'><\/div>";
  row += "  <div class='card gold'><\/div>";
  row += "  <div class='card mushroom'><\/div>";
  row += "  <div class='card coin'><\/div>";
  row += "  <div class='card gold'><\/div>";
  row += "  <div class='card brick'><\/div>";
  row += "  <div class='card gold'><\/div>";
  row += "  <div class='card brick'><\/div>";
  row += "  <div class='card gold'><\/div>";
  row += "  <div class='card brick'><\/div>";
  row += "  <div class='card gold'><\/div>";
  row += "<\/div>";
  
	for(var x = 0; x < 29; x++){
  	$wheel.append(row);
  }
}
function spinWheel(roll){
  var $wheel = $('.roulette-wrapper .wheel'),
  		order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      position = order.indexOf(roll);
  var rows = 12,
  		card = 75 + 3 * 2,
      landingPosition = (rows * 15 * card) + (position * card);
  var randomize = Math.floor(Math.random() * 75) - (75/2);
  landingPosition = landingPosition + randomize;
  var object = {
		x: Math.floor(Math.random() * 50) / 100,
    y: Math.floor(Math.random() * 20) / 100
	};
  
  $wheel.css({
		'transition-timing-function':'cubic-bezier(0,'+ object.x +','+ object.y + ',1)',
		'transition-duration':'6s',
		'transform':'translate3d(-'+landingPosition+'px, 0px, 0px)'
	});
  
  setTimeout(function(){
		$wheel.css({
			'transition-timing-function':'',
			'transition-duration':'',
		});
    
    var resetTo = -(position * card + randomize);
		$wheel.css('transform', 'translate3d('+resetTo+'px, 0px, 0px)');
  }, 6 * 1000);
}