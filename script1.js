window.onload = function() {
  // function to add on right click function and left click
   // function on the grid's cells
  clklistener();
  // this function initialize the cells in the grid to zero
  initialize();
  // start the timing with the first click on the grid
  $( "#grid" ).one( "click", starttime);

  document.oncontextmenu = function() {
    return false;
}


};

// global variables
// number of mines
let mines=10;
// pointer to the timer
var timer;
// start with no game no lost
var lost=false;



// right clk listener 
function clklistener(){

  // let all of the squares in the grid listen
  // for right click and toggle between  flag 
  // and closed classes which change the button BG

  var audio1 = $("#clicksound")[0];
  var audio2 = $("#rightclick")[0];
  var audio3 = $("#bombsound")[0];
  let btn;
  // righ click function
  $('.square').on('contextmenu', function(){
    // store the id of the clicked square
    btn=$(this).attr("id");
    // toggle between classes to change the BG
    $(this).toggleClass( "flag", "closed");
    // get the number of elements with flag 
    // class then subtract the result from 10
    $("#numbomb").text(10-getflag());
    audio2.play();
  });


  // left click function
  $('.square').on('click', function(){
    audio1.play();
    // store the id of the clicked square
    btn=$(this).attr("id");
    //open the cell by removing the class with the button BG
    // change the BG
    $(this).removeClass("closed");
    // call function get the BG  that suitable to the cell value
    leftclk(btn);
    
    if($(this).text()==10)
    {
      audio3.play();
    }
  });

  // smily button to reset the game
  $('#resetbtn').click(function () {
  $('#square').on('click');
  $('#square').on('contextmenu');
  initialize();

  });
}

// pareparing the grid
function initialize(){
  // all the text is hidden and BG is closed buttons
  $('.square').text(0).css('text-indent', '-10000px').css('overflow', 'hidden');
  $('.square').addClass("closed");
  // call function to spread the mines randomly in the grid
  randgene();
}


// set timers counters to zero
var sec = 0;
var min=0
let s=0;
let m=0;
  function starttime () {
    //increment the second by 1
    sec++;
    // this condition was added to 
    // include the case when the user 
    // click mine right from the begining
    if(!lost)
    timer=setTimeout ( "starttime()", 1000 );
    // after 60 seconds increment the minutes set the 
    // seconds back to zero
    if(sec>60)
    {
      sec=0;
      min++;
    }
    // get the numbers in 00 format then return them back to the timer
    m=pad(min);
    s=pad(sec);
    $('#time').text(`${m}:${s}`);
  }

  // this function create 00 format
  function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

// distribute the mines randomly in the grid and display 
// the numbers around the mines
function randgene(){
      var rand;
      for(let i=0;i<10;i++){
        // get random number as an index to put the mines
        rand=randcheck();
        // store the mine by putting 10 in square text
        $('.square').eq(rand).text(10).css('text-indent', '-10000px').css('overflow', 'hidden');
      }
      // get the numbers that surround the mines
      clues();
}
// generate the random numbers for mines location
// global variable to store the random number inside
// to compare it and make sure it's not already exist
var holder=[];
function randcheck(rand)
{
  let found=0;
  // make sure no number is repeated
  while(found!==-1){
    // get a number between 0 and 64
    rand=(Math.floor(Math.random()*65));
    // check if the number in repeated by looking in the array
    found=holder.indexOf(rand);
  }
  // if the number is new push it to the array
  holder.push(rand);
  // send it back
  return rand;
}
// this function create the number clues which indicate number of 
// mine around each cell , although the grid is 8x8 this function
 // create a bigger array 10x10 for the case  when the mines are 
 // on the bound
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
  // get the data from the original div in number format
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
            // to make sure that the adjacent cells don`t contain mine
            if (bigarray[rr][cc]!==10) {
              ++bigarray[rr][cc];
            }
          }
        }
      }    
    }
  }
// store the grid values back
  i=0;
  for(var r = 1; r < 9; r++){   
    for(var c = 1; c < 9; c++){ 
      $('.square').eq(i).text(bigarray[c][r]).css('color', 'rgba(0,0,0,1)'); 
      i++;  
    }    
  }

}

// function to handel left click cases.
function leftclk(btn)
{ let SSS,rr,cc;
  btn="#"+btn;
  console.log($(btn).text());
  switch(parseInt($(btn).text()))
    {
      case 0:
       cc=btn[2];
       rr=btn[3];
       open(cc,rr);
        break;
      case 1:
      // remove the cell cover and display the cell value
      $(btn).removeClass("closed").addClass( "one" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 2:
      $(btn).removeClass("closed").addClass( "two" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 3:
      $(btn).removeClass("closed").addClass( "three" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 4:
      $(btn).removeClass("closed").addClass( "four" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 5:
      $(btn).removeClass("closed").addClass( "five" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 6:
      $(btn).removeClass("closed").addClass( "six" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 7:
      $(btn).removeClass("closed").addClass( "seven" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 8:
      $(btn).removeClass("closed").addClass( "eight" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 9:
      $(btn).removeClass("closed").addClass( "flag" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 10:
      $(btn).removeClass("closed").addClass( "clickedbomb" );
      $("#resetbtn").removeClass("happy").addClass("sad");
      // disable the right and left clicks in the grid
      revealall();
      $(".square").off('click');
      //window.alert("you lost, Press reset to restart");
      // stop the timer
      lost=true;
      clearTimeout(timer);

      break;

      default: 
    }
  }
// this function to find out how many cell in the grid with flag 
// and return it
function getflag(){
  return $('.flag').length;
}

// this function to diable enable right and left click
function clickcontrol(btn){
  $(btn).off('click');
  $(btn).off('contextmenu');
}



function open(cc,rr) {
// create 2d array 
  let m;
  let bigarray=[];
  for(var c = 0; c < 8; c++){
    bigarray[c] = [];    
    for(var r = 0; r < 8; r++){ 
      bigarray[c][r] = 0;   
    }    
  }
  let i=0;
  // feed the new 2d array with the grid cells
  
// get the data from the original div in number format
  for(var c = 0; c < 8; c++){   
    for(var r = 0; r < 8; r++){ 
      bigarray[r][c]=parseInt($('.square').eq(i).text()); 
      i++;  
    }    
  }
  var audio4 = new Audio('images/TaDa.wav');
  audio4.play();
destroyAdjacentTiles(cc,rr,bigarray);
}

function destroyAdjacentTiles(x,z, thisCube) {
let m;
    if(x<0){
      return false;
    }
    
    if(x>8){
      return false;
    }
    if(z<0){
      return false;
    }
    if(z>8){
      return false;
    }

      m=thisCube[z][x];
      if(thisCube[z][x]==null)
        return false;
    if(thisCube[z][x]==10)
        return false;

    else if(thisCube[z][x]!==0){
    thisCube[z][x]=null;
    revealcell(x,z);

    return false}
    thisCube[z][x]=null;
    revealcell(x,z);
    destroyAdjacentTiles(x-1, z,thisCube);
    destroyAdjacentTiles(x+1, z,thisCube);
    destroyAdjacentTiles(x, z-1,thisCube);
    destroyAdjacentTiles(x, z+1,thisCube);

    return true;
}

  function revealcell(r,c)
  {
    let id;
    id="#c"+r+c;
    if($(id).text()==0)
    $(id).removeClass("closed");
    else{
    leftclk(id.substr(1))}
  }

  function revealall()
  { let value;
    let i=0 , s=0;
    for(let i=0;i<64;i++){
      value=parseInt($('.square').eq(i).text());
       $(".square").eq(i).removeClass("flag");
      console.log(value);
      if(value!==10 && value!==0 )
      {
       console.log($(".square").eq(i).attr("id"));
       leftclk($(".square").eq(i).attr("id"));
       s++;
      }
      if(value===10)
      {
        clickcontrol(".square");
        $(".square").eq(i).removeClass("closed").addClass( "bomb" ); 
      }
      if(value===0)
      {
        $(".square").eq(i).removeClass("closed"); 
      }
    }

  }