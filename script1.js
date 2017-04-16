// onload every thing will be ready to start
window.onload = function() {
  // function to add on right click function and left click
   // function on the grid's cells
  clklistener();
  // this function initialize the cells in the grid to zero
  initialize();
  // if it's not the end of the game, start the timing with 
  // the first right or left click on the grid 
  if(!lost){
  $( "#grid" ).one( "click", starttime);
 $( "#grid" ).one( "contextmenu", starttime);}
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
// where the time string is stored
let timestring;



// right clk listener 
function clklistener(){
  // coonect the sounds to the clicks
  var audio1 = $("#clicksound")[0];
  var audio2 = $("#rightclick")[0];
  var audio3 = $("#bombsound")[0];
  let btn;
  // righ click function:let all of the squares in the grid listen
  // for right click and toggle between  flag 
  // and closed classes which change the button BG
  $('.square').on('contextmenu', function(){
    // store the id of the clicked square
    btn=$(this).attr("id");
    // toggle between classes to change the BG
    $(this).toggleClass( "flag", "closed");
    // update number of flags in the counter
    getflag();
    // play sound with click
    audio2.play();
  });


  // left click function
  $('.square').on('click', function(){
    // play a sound with each click
    audio1.play();
    // store the id of the clicked square
    btn=$(this).attr("id");
    // call function to get the BG  that suitable to the cell value
    leftclk(btn);
    //update number of flags in the counter
    getflag();
    // chech for winning condition
    checkwinner();
    // if the used clicked square will value 10 = bombmake bombing
     // sound
    if($(this).text()==10)
    {
      audio3.play();
    }
  });

  // smily button to reset the game
  $('#resetbtn').click(function () {
    window.location.reload();
  });
}

// pareparing the grid
function initialize(){
  // all the text is hidden and BG is closed buttons
  $('.square').text(0).css('text-indent', '-10000px').css('overflow', 'hidden');
  //$('.square').text(0);
  $('.square').addClass("closed");
  // call function to spread the mines randomly in the grid
  randgene();
}


// set timers counters to zero
var sec = 0;
var min=0
let s=0;
let m=0;

// time display function
function starttime () {
  //increment the second by 1
  // this condition was added to 
  // include the case when the user 
  // click mine right from the begining
  if(!lost)
   sec++; 
  timer=setTimeout ( "starttime()", 1000 );
  // after 60 seconds increment the minutes set the 
  // seconds back to zero
  if(sec>60)
  {
    sec=0;
    min++;
  }
  // get the numbers in 00 format then return them back to the timer
  m=twodigit(min);
  s=twodigit(sec);
  timestring=`${m}:${s}`;
  $('#time').text(timestring);
}

// this function create 00 format
function twodigit(n) {
  return (n < 10) ? ("0" + n) : n;
}

// distribute the mines randomly in the grid and display 
// the numbers around the mines
function randgene(){
  var rand;
  for(let i=0;i<10;i++){
    // get random number as an index to put the mines
    rand=randcheck();
    // store the mine by putting 10 in square text then hide
    // the numbers using indentation.
    $('.square').eq(rand).text(10).css('text-indent', '-10000px').css('overflow', 'hidden');
  }
  // get the numbers that surrounds the mines
  clues();
}


// global variable to store the history of the random numbers 
// to compare it and make sure it's not already exist (repeated)
var holder=[];
// generate the random numbers for mines location
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
  switch(parseInt($(btn).text()))
    {
      // if the user clicked on empty space the grid will
      // be open
      case 0:
       cc=btn[2];
       rr=btn[3];
       open(cc,rr);
        break;
      case 1:
      // remove the cell cover and display the cell value
      $(btn).removeClass("closed flag").addClass( "one" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 2:
      $(btn).removeClass("closed flag").addClass( "two" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 3:
      $(btn).removeClass("closed flag").addClass( "three" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 4:
      $(btn).removeClass("closed flag").addClass( "four" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 5:
      $(btn).removeClass("closed flag").addClass( "five" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);

      break;

      case 6:
      $(btn).removeClass("closed flag").addClass( "six" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 7:
      $(btn).removeClass("closed flag").addClass( "seven" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 8:
      $(btn).removeClass("closed flag").addClass( "eight" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;

      case 9:
      $(btn).removeClass("closed flag").addClass( "flag" );
      // disable the right and left clicks in the cell
      clickcontrol(btn);
      break;
       //when the user click on bomb
      case 10:
      // display bomb
      $(btn).removeClass("closed").addClass( "clickedbomb" );
      // change the picture of happy face to sad face
      $("#resetbtn").removeClass("happy").addClass("sad");
      // open all the grid
      revealall();
      // disable the right and left clicks in the grid
      clickcontrol(btn);
      // stop the timer
      lost=true;
      clearTimeout(timer);
      break;

      default: 
    }
  }
// this function to find out how many cell in the grid with flag 
function getflag(){
  let num;
  num=$('.flag').length;
   $("#numbomb").text(10-num);
}

// this function to diable enable right and left click
function clickcontrol(btn){
  $(btn).off('click');
  $(btn).off('contextmenu');
}

// this function to check if the cell is closed or not
 function isclosed(r,c)
 {
  let id;
    id="#c"+r+c;
    if($(id).hasClass('closed')=== true)
      return true;
      else 
        return false;
 }

// this function to openup the cells when click on empty cell
function open(cc,rr) {
  // create 2d array 
  cc=parseInt(cc);
  rr=parseInt(rr);
  // if the cell already openned exist
  if(isclosed(cc,rr)===false)return;
  let m;
  let bigarray=[];

  // create empty array
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
  // display a sound when opening cell
  var audio4 = new Audio('images/TaDa.wav');
  audio4.play();
  openup(cc,rr,bigarray);
  }

function openup(x,z, thisCube) {
  let m;
  // bound cases
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
  // if the cell is opened before
  if(thisCube[z][x]==null)
    return false;
  // if there is a bomb
  if(thisCube[z][x]==10)
    return false;
  m=thisCube[z][x];
  // if the cell is number
  if(thisCube[z][x]!==0){
    //open the cell
    revealcell(x,z);
    return false;}
    // set cell value to cell
    thisCube[z][x]=null;
    // open the cell
    revealcell(x,z);
    // repeate this process for four direction
    // recursive function
    openup(x-1, z,thisCube);
    openup(x+1, z,thisCube);
    openup(x, z-1,thisCube);
    openup(x, z+1,thisCube);

    return true;
}

// open one cell
function revealcell(r,c)
{
  // update the flag counter
  getflag();
  let id;
  id="#c"+r+c;
  // open the empty cells
  if($(id).text()==0){
  $(id).removeClass("closed flag");
  // disable the right and left click
  clickcontrol(id)
}
  else{
    // open the cells that has number
    leftclk(id.substr(1))
  }
}

// this function open all the cells
function revealall()
{ let value;
  let i=0 , s=0;
  for(let i=0;i<64;i++){
    value=parseInt($('.square').eq(i).text());
    $(".square").eq(i).removeClass("flag");
    // the value of the cell is number
    if(value!==10 && value!==0 )
    {
      leftclk($(".square").eq(i).attr("id"));
      s++;
    }
    // if the cell had bomb
    if(value===10)
    {
      clickcontrol(".square");
      $(".square").eq(i).removeClass("closed").addClass( "bomb" ); 
    }
    // if the cell is empty
    if(value===0)
    {
      $(".square").eq(i).removeClass("closed"); 
    }
  }
}

function checkwinner(){
  // display winner sound
  var audio5 = new Audio('images/won.wav');
  // if what's left is 10 cells closed
  if($('.closed').length===10){
    // display alert sound
    window.alert(`Congratulation you won . You finished the game in ${timestring} `);
    // remove all the grid cells and display picture instead
    $('#grid').empty().append('<img src="images/WIN.png">').addClass('grow');
    // disable right and left click
    clickcontrol();
    lost=true;
    audio5.play();
    // stop the timer
    clearTimeout(timer);
  }
}
