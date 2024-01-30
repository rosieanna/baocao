window.onload = function() {
    alert("Click bên trái hoặc bên phải bức hình để bet.\nKhông khuyến khích đánh bạc dưới mọi hình thức :))"); 
};

$(document).ready(function() {
    $(".plus").click(function() {
        var picButton = $(this).closest(".frame").find(".layer-1 button").first();
        var currentValue = parseInt(picButton.text());
        picButton.text(currentValue + 1);
    });

    $(".minus").click(function() {
        var picButton = $(this).closest(".frame").find(".layer-1 button").first();
        var currentValue = parseInt(picButton.text());
        var newValue = Math.max(0, currentValue - 1); 
        picButton.text(newValue);
    });
});
  
const startButton = document.querySelector(".start");
const resetButton = document.querySelector(".reset");
const images = document.querySelectorAll(".row img");
startButton.addEventListener("click", () => {
    images.forEach(img => {
        img.classList.add("shake");
        setTimeout(() => {
            img.classList.remove("shake");
        }, 1000);
    });
    let profit = 0;
    let bet = 0;
    let earn = 0;
    let arr = [];
    const picButtons = $(".pic");
    picButtons.each(function() {
        bet += parseInt($(this).text());
    });
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          arr.push(Math.floor(Math.random() * 6));
        }
        for (let i = 0; i < images.length; i++) {
            setTimeout(() => {
                images[i].src = `./images/${arr[i]}.png`;
            }, 600 * (i));
        }
        for (let i = 0; i < 3; i++) {
            const picChosen = $(`.pic.p${arr[i]}`);
            picChosen.each(function() {
                earn += parseInt($(this).text());
            });
        }
        earn=earn*2;
        profit = earn - bet;
        console.log(profit);
    }, 1400);
    setTimeout(() => {
        if (profit == 0) {
            confirm(`Tổng bet: ${bet}\nNhận về: ${earn}\nProfit: ${profit}`);
        }   else if (profit > 0) {
            confirm(`Tổng bet: ${bet}\nNhận về: ${earn}\nProfit: ${profit}`);
        }   else {
            confirm(`Tổng bet: ${bet}\nNhận về: ${earn}\nProfit: ${profit}`);
        }
    }, 3000);
});
resetButton.addEventListener("click", () => {
    images.forEach(img => {
        img.classList.add("shake");
        setTimeout(() => {
            img.classList.remove("shake");
        }, 1000);
    });
    images.forEach((img, index) => {
        img.src = `./images/question_box.webp`;
    });
    const picButtons = $(".pic");
    picButtons.each(function() {
        this.textContent = "0";
    });
});
