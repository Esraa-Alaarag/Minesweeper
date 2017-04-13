window.onload = function() {
clklistener();
initialize();
$( "#grid" ).one( "click", starttime);
};

let clk;
let btn;
let bomb=10



function clklistener(){
  $('.square').on('contextmenu', function(){
    btn=$(this).attr("id");
    clk=2;
    $(this).removeClass("closed").addClass("flag");
    $("#numbomb").text(--bomb);
    return false;
});
$('.square').on('click', function(){
    btn=$(this).attr("id");
    clk=1;
    $(this).removeClass("closed");
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
    setTimeout ( "starttime()", 1000 );//runs itsself after 1000 miliseconds
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
        rand=Math.floor(Math.random()*65); 
        array[i]=$('.square').eq(rand).text(10).css('color', 'rgba(0,0,0,1)');
      }
}

