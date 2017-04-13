window.onload = function() {
clklistener();
initialize();
$( "#grid" ).one( "click", starttime);
};

let clk;
let btn;
let bomb=10;
var timer;



function clklistener(){
  $('.square').on('contextmenu', function(){
    btn=$(this).attr("id");
    clk=2;
    $(this).removeClass("closed").addClass("flag");
    $("#numbomb").text(--bomb);
    if($(this).text()==10)
    
    return false;
});
$('.square').on('click', function(){
    btn=$(this).attr("id");
    clk=1;
    $(this).removeClass("closed");
    console.log($(this).text());
    leftclk(btn);
    return true;

});
}
opacity: 0.5;
function initialize(){
  $('.square').text(0).css('color', 'rgba(0,0,0,0)');
  $('.square').addClass("closed");
  randgene();
}
var counter = 0;
var min=0
let s;
let m;
  function starttime () {
    
    counter++;//increment the counter by 1
    timer=setTimeout ( "starttime()", 1000 );//runs itsself after 1000 miliseconds
    if(counter>60)
    {
      counter=0;
      min++;
    }
    m=pad(min);
    s=pad(counter);
    $('#time').text(`${m}:${s}`);
    //console.log(counter);uncomment to can see it in action, only with firebug
  
  }

  function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function randgene(){
      var rand;
      let array=[];
      for(let i=0;i<10;i++){
        rand=(Math.floor(Math.random()*65)); 
        console.log(rand);
        array[i]=$('.square').eq(rand).text(10).css('color', 'rgba(0,0,0,1)');
      }
      clues();
}

function clues(){
  var i=0
  var arr = [];
  var bigarray=[];
  m=8;
  n=8;
  // create the 2d array and intilize to zero
  for(var c = 0; c < 10; c++){
    bigarray[c] = [];    
    for(var r = 0; r < 10; r++){ 
      bigarray[c][r] = 0;   
    }    
  }
  // get the data from the original div
  for(var c = 1; c < 9; c++){   
    for(var r = 1; r < 9; r++){ 
      bigarray[r][c]=parseInt($('.square').eq(i).text()); 
      i++;  
    }    
  }

  // adding adjacent numbers
  for(var c = 1; c < 9; c++){   
    for(var r = 1; r < 9; r++){ 
      if(bigarray[r][c]===10){
        for (var cc = c - 1; cc <= c+1; cc++){
          for (var rr = r - 1; rr <= r+1; rr++){
            if (bigarray[rr][cc]!==10) {
              ++bigarray[rr][cc];
            }
          }
        }
      }    
    }
  }
// return the values back
  i=0;
  for(var r = 1; r < 9; r++){   
    for(var c = 1; c < 9; c++){ 
      $('.square').eq(i).text(bigarray[c][r]).css('color', 'rgba(0,0,0,1)'); 
      i++;  
    }    
  }

}


function leftclk(btn)
{
  btn="#"+btn;
  console.log($(btn).text());
  switch(parseInt($(btn).text()))
    {
      case 0:
        break;
      case 1:
      $(btn).removeClass("closed").addClass( "one" );
      break;

      case 2:
      $(btn).removeClass("closed").addClass( "two" );
      break;

      case 3:
      $(btn).removeClass("closed").addClass( "three" );
      break;

      case 4:
      $(btn).removeClass("closed").addClass( "four" );
      break;

      case 5:
      $(btn).removeClass("closed").addClass( "five" );
      break;

      case 6:
      $(btn).removeClass("closed").addClass( "six" );
      break;

      case 7:
      $(btn).removeClass("closed").addClass( "seven" );
      break;

      case 8:
      $(btn).removeClass("closed").addClass( "eight" );
      break;

      case 9:
      $(btn).removeClass("closed").addClass( "flag" );
      break;

      case 10:
      $(btn).removeClass("closed").addClass( "clickedbomb" );
      $("#resetbtn").removeClass("happy").addClass("sad");
      clearTimeout(timer);
      console.log("sad");
      break;

      default: 
    }
  }


