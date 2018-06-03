

$(document).ready(() => {
    

    let randomController = (() => {
        colorList = {
            "color1": 0,
            "color2": 0,
            "color3": 0,
            "color4": 0,
            "goal": 0,
        };
        return {
            randomRoot: function(){
                
                for (i = 0; i < $("li").length; i++) {
                    $("li").eq(i).val(Math.floor((Math.random() * 12) + 1));
                    colorName = `color${i+1}`
                    colorList[colorName] = $("li").eq(i).val();
                    //console.log(colorList[colorName])
                }
                colorList.goal = Math.floor((Math.random() * 101) + 19);

                return colorList;
            }
        }
    })();

    let mainController = (() => {

        let getColors = () => {
            colors = randomController.randomRoot();
            //console.log(colors)
        }

        scores = {
            wins: 0,
            count: 0,
            losses: 0
        }

        let showScores = (code) => {
                if (code === 0) {  
                    $("#score").text(0);
                    $("#losses").text(0);
                    $(".message").hide();
                }

                setTimeout(() => {
                    $("#score").text(scores.count);
                }, 200);
                setTimeout(() => {
                    $("#hidden").text(colors.goal);
                    $("#wins").text(scores.wins);
                    $("#losses").text(scores.losses)
                }, 500);
        }

        let checkScore = () => {
            if (scores.count === colors.goal) {
                scores.wins += 1;
                scores.count = 0;
                $(".message").show();
                $(".message").text("You win!");
                $(".message").css("color", "#45ff34");
                getColors()
            } else if (scores.count > colors.goal) {
                scores.losses += 1;
                scores.count = 0;
                $(".message").show();   
                $(".message").text("Too high");
                $(".message").css("color","#ff4534");
                getColors()
            }
            showScores();

            setTimeout(() => {
                $(".message").hide();
            }, 900);
        }

        $("li").on("click", function() {
            let result = $("li").eq($("li").index(this)).val();
            scores.count += result;
            console.log(result);
            checkScore();
        })

        $("button").on("click", tutorial);
        
        function tutorial() {
            
            $(".first").show();
            $("#explain-random").on("click", () => {
                $(".second").show();
            })
            $("#explain-crystals").on("click", () => {
                $(".third").show();
                $("#explain-score").on("click", hideTutorial);
            })
        }
        
        function hideTutorial() {
            $(".first").hide();
            $(".second").hide();
            $(".third").hide();
        }

        return {
            starter: function() {
                getColors();
                showScores(0);
                hideTutorial();
            }
        }

    })();
    mainController.starter();
});




// var listItems = $("#productList li");
// listItems.each(function (idx, li) {
//     var product = $(li);
// });