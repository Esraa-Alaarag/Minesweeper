window.onload = function() {
	this.game= new grid();
	game.inti();
}	



// ===================================================


class cell {
  	constructor() {
    //Put attributes here!
    	this.value = 0;
    	this.opened = false;
	}
	intiCell(i) {
		$(".square").eq(i).addClass(".closed");
	}

	show(){
		console.log("Im here");
		switch(this.value)
		{
			case 0:
				if(this.opened===false){
					this.addClass( "closed" );
					break;
				}
				if(this.opened===true){
					this.addClass( "zero" );
					break;
				}
			case 1:
			this.addClass( "one" );
			break;

			case 2:
			this.addClass( "two" );
			break;

			case 3:
			this.addClass( "three" );
			break;

			case 4:
			this.addClass( "four" );
			break;

			case 5:
			this.addClass( "five" );
			break;

			case 6:
			this.addClass( "six" );
			break;

			case 7:
			this.addClass( "seven" );
			break;

			case 8:
			this.addClass( "eight" );
			break;

			case 9:
			this.addClass( "flag" );
			break;

			case 10:
			this.addClass( "bomb" );
			break;
		}
    	
	}
	reveal()
	{

	}
}
// ====================================================


class grid {
  	constructor() {
  	//Put attributes here!
  	// Reminder: This will construct Letter objects
    	this.Cell=[];
    	// this.randgene();
    	// this.openempty(location);
    	// this.flag(location);
    	// this.reveal();
  	}
  //Go to town on those methods below!
	inti()
  	{
  		console.log('i ran')
  		var i=0;
  		for(let c=0;c<8;c++){
  			this.Cell[c]=[];
  			for(let r=0;r<8;r++){
  				this.Cell[c][r]= new cell();	
  			}
  		}
  			
  		for(let c=0;c<8;c++){
  			for(let r=0;r<8;r++){
  				this.Cell[c][r]=$(".square").eq(i);
  				this.Cell[c][r].show();
  				 i++;
  				// console.log(this.Cell[c][r]);
  			}
  		}

	}
	

	/*randgene(){
  		var randR;
  		var randC;
  		for(let i=0;i<10;i++){
  			randR=Math.floor(Math.random()*9);
  			randC=Math.floor(Math.random()*9);
  			this.cell[randR][randC].value()=10;
  			this.cell[randR][randC].show();
		}
  	}*/
}

