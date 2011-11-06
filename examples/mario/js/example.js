var keyPressed = false;

/*
 * Here is the fw in use.
 */

//Load init 
canvas.init();
canvas.loadImage('img/map/block.png','block');
canvas.loadImage('img/skins/mario.png','mario');


//Loop animation
canvas.loop(function(ctx) {
	
	//Detect if a key is pressed
	canvas.keyPress(function(key) {
		if(key == 32 && !mario.jump) { //space
			mario.jump = true;
			mario.jumpspeed = mario.jumpstart;
		}
		
		switch(key) {
			case 65: //A
				keyPressed = moveChar(mario,-1,0);
				break;
			case 68: //D
				keyPressed = moveChar(mario,1,0);
				break;
			/*case 87: //W
				moveChar(mario,0,-1);
				break;
			case 83: //S
				moveChar(mario,0,1);
				break;
			case 32: //space
				break;*/
		}
		
		if(mario.jump) {
			keyPressed = jump(mario);
		}
	});
	
	buildMap(map);
	jump(mario);
});
