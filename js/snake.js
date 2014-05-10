var a_snake = null;

var game_started = true;
var my_canvas = document.getElementById("my_canvas");

/*
	dot
*/
function Dot(x, y , w, h, img){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.img = img;
	this.dx = 0;
	this.dy = 0;
	this.orientation = "";
}
Dot.prototype.draw = function( canvas ){
							if( !this.img ){
								console.log("img null");
							}
							
							canvas.getContext("2d").drawImage(this.img, this.x, this.y)
						};
Dot.prototype.update = function(){
							this.x += this.dx;
							this.y += this.dy;
							
							//console.log("updated");
						};
Dot.prototype.set_orientation = function( orientation ){
							switch( orientation ){
								case "L":{
									this.dx = - this.img.width;
									this.dy = 0;
								};break;
								case "R":{
									this.dx = this.img.width; 
									this.dy = 0;
								};break;
								case "U":{
									this.dx = 0;
									this.dy = - this.img.height; 
								};break;
								case "D":{
									this.dx = 0;
									this.dy = this.img.height; 
								};break;
							}
							
							this.orientation = orientation;
						};

						
/*
	snake
*/
function Snake(x, y){
	this.x = x;
	this.y = y;
	this.ate = false;
	this.first = true;
}
Snake.prototype.dot_img = null;
Snake.prototype.dots = [];
Snake.prototype.set_orientation = function( orientation ){
							// head knows where to go
							this.dots[0].set_orientation( orientation );
						};
Snake.prototype.set_ate = function( ate ){
							this.ate = ate;
						};
Snake.prototype.update = function(){
							// if first time, insert an apple
							if( this.first ){
								var new_dot = new Dot(this.x, this.y, this.dot_img.width, this.dot_img.height, this.dot_img );
								new_dot.set_orientation( "R" );
								
								this.dots.push( new_dot );
								
								this.first = false;
								console.log("le first");
							}
									
							// ate an apple ?
							if( this.ate ){
								var a_dot_last = this.dots[this.dots.length - 1];

								var x = 0;
								var y = 0;
								
								switch( a_dot_last.orientation ){
									case "R":{
										x = a_dot_last.x - a_dot_last.img.width;
										y = a_dot_last.y;
										
										console.log("R");
									};break;
									case "L":{
										x = a_dot_last.x + a_dot_last.img.width;
										y = a_dot_last.y;
									};break;
									case "U":{
										x = a_dot_last.x;
										y = a_dot_last.y + a_dot_last.img.height;
									};break;
									case "D":{
										x = a_dot_last.x;
										y = a_dot_last.y - a_dot_last.img.height;
									};break;
								}

								// grow !
								this.dots.push( new Dot(x, y, this.dot_img.width, this.dot_img.height, this.dot_img ) );
								
								this.ate = false;
							}
							
							// follow at the next !, except you head
							for( var i = this.dots.length - 1 ; i > 0 ; i-- ){
								var a_dot = this.dots[i];
								var a_dot_prev = this.dots[i - 1];
								
								a_dot.x = a_dot_prev.x;
								a_dot.y = a_dot_prev.y;
							}
							
							// head obey !
							this.dots[0].update();
							
						};
Snake.prototype.draw = function( my_canvas ){
							// draw here
							for(var i = 0 ; i < this.dots.length ; i++ ){
								var a_dot = this.dots[i];
								
								a_dot.draw(my_canvas);
							}
						};
						
						
/*
	init - update - draw
*/
function init(){
	a_snake = new Snake(0, 0);
	
	// load img
	var img = new Image();
	img.src = "./img/dot.png";
	img.onload = function(){
					a_snake.dot_img = img;
				};

	setInterval(function(){
		update();
		draw();
	}, 1000);
}

function update(){
	if( game_started ){
		a_snake.update();
	}
}
function draw(){
	// clean canvas
	my_canvas.width ++;
	my_canvas.width --;
	
	a_snake.draw(my_canvas);
}


/*
	Control
*/
function to_down(){
	a_snake.set_orientation("D");
}
function to_up(){
	a_snake.set_orientation("U");
}
function to_left(){
	a_snake.set_orientation("L");
}
function to_right(){
	a_snake.set_orientation("R");
}
function eat_please(){
	a_snake.set_ate(true);
}