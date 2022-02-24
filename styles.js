$(document).ready(function () {
  //Hide upper case keyboard
  $("#keyboard-upper-container").css("display", "none");

  //when shift key is held down, hide lower case keyboard, show upper case keyboard
  $(document).keydown(function (e) {
    if (e.shiftKey) {
      $("#keyboard-lower-container").css("display", "none");
      $("#keyboard-upper-container").css("display", "block");
    }
  });
  $(document).keyup(function () {
    $("#keyboard-lower-container").css("display", "block");
    $("#keyboard-upper-container").css("display", "none");
  });

  //set up the first sentence on screen (highlighter already in html)
  let sentences = [
    // "ten ate neite ate nee enet ite ate inet ent eate",
    // "Too ato too nOt enot one totA not anot tOO aNot",
    // "oat itain oat tain nate eate tea anne inant nean",
    // "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate",
  ];

  //show sentence and letter user is on (set up with first)
  let s = 0;
  let l = 0;
  $("<p></p>").text(sentences[s]).appendTo("#sentence");
  $("<h3></h3>").text(sentences[s][l]).appendTo("#target-letter");

  //set variable for mistaken keystrokes at start 0
  var numberOfMistakes = 0;
  var start;

  //listen for key press (on repeats function for every keypress)
  $(document).on("keypress", function (e) {
    //get key code value of key pressed
    var a = e.key.charCodeAt(0);

    //get id with the same value and color it in
    $("#" + a).css("background-color", "yellow");
  });

  //uncolor with keyup
  $(document).keyup(function (e) {
    //get key code value of key pressed
    let correctChar = sentences[s][l].charCodeAt(0);
    var charCode = e.key.charCodeAt(0);
    $("#" + charCode).css("background-color", "#f5f5f5");

    //get current time to calculate words per minute later
    if (l == 0 && s == 0) {
      let time = new Date();
      start = time.getMinutes();
    }

    //get key code of current letter of the sentence

    console.log(charCode, correctChar);
    //compare keystroke to current letter. If it is a match,
    if (charCode == correctChar) {
      //show green check (also set display back to initial because feedback will be cleared at end of each sentence)
      $(`#feedback`).append(`<span class='glyphicon glyphicon-ok'></span>`);
      //   .css("display", "initial");

      //move highlighter
      $("#yellow-block").css("left", "+=17.5px");

      //and increment current letter
      l++;
      $("#target-letter").text(sentences[s][l]);

      //check to see if user has reached end of sentence (this occurs when the current sentence's index = the sentences length)
      if (l == sentences[s].length) {
          s++;
          //check to see if user is on last sentence
          console.log("S is" + s)
          if (s == sentences.length) {
              console.log("test");
              var timeUp = new Date();
              var end = timeUp.getMinutes();
              
              //get elapsed minutes
              var timing = end - start;
              
              //get wpm
              let speed = Math.round((55 - numberOfMistakes) / timing);
              
              //replace sentence with words per minute
              //   $("#yellow-block").css("left", "5px");
              $("#yellow-block").css("display", "none");
              $("#sentence").append(
                  "You've made it to the end! You typed: " +
                  speed +
                  " words per minute."
                  );
                 
                  //ask user if they want to play again
                  $(document).off("keypress");
                  $("#target-letter").text("click on the screen to begin again");
                  $(document).click(function () {
                      location.reload();
                    });
                    //replace only target letter with updated incremented one
                    //   //increment sentence and set target letter back to start (0)
                    //   s++;
                    //   l = 0;
                    //   //move highlighter back
                    //     console.log(sentences[s])
                    //   //clear out feedback div (hide green check)
                    //   $("#feedback").empty();
                    //   //replace sentence and target letter displayed with incremented one
                    //   $("#sentence").text(sentences[s]);
                    //   $("#target-letter").text(sentences[s][l]);
                }
                else {
                    console.log(l);
                console.log(sentences[s].length);
                l = 0;
                $("#sentence").empty();
                $("#target-letter").empty();
                $("<p></p>").text(sentences[s]).appendTo("#sentence");
                $("<h3></h3>").text(sentences[s][l]).appendTo("#target-letter");
                }
      }
    } else {
      // display red x
      let $wrong = $("<span>✗</span>");
      $($wrong).addClass("red");
      $($wrong).appendTo("#feedback");
      //and tally mistake
      numberOfMistakes += 1;
    }
  });
});
