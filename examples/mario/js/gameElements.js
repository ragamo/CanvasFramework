/*
 * Game elements definition
 */
var map = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
var tiles = {
	w: 32,
	h: 32
};
var mario = {
	xtile: 2,
	ytile: 1,
	x: (2*tiles.w),
	y: (1*tiles.h),
	_x: (2*tiles.w),
	_y: (1*tiles.h),
	w: 30,
	h: 30,
	speed: 6,
	yspeed: 3,
	gravity: 0.8,
	jump: false,
	jumpstart: -26,
	jumpspeed: 0
};


/*
 * Some global functions
 */
function moveChar(mario, dirx, diry, jump) {
	if (Math.abs(jump) == 1) {
		speed = mario.jumpspeed*jump;
	} else {
		speed = mario.speed;
	}
	
	getCorners(mario, mario.x, mario.y+mario.speed*diry);
	if (diry == -1) {
		if (mario.upleft && mario.upright) {
			mario.y += mario.yspeed*diry;
		} else {
			mario.y = mario.ytile * tiles.h + mario.h;
			mario.jumpspeed = 0;
		}
	}
	if (diry == 1) { 
		if (mario.downleft && mario.downright) {
			mario.y += mario.yspeed*diry;
		} else {
			mario.y = (mario.ytile + 1.9) * tiles.h - mario.h;
			mario.jump = false;
		}  
	}
	
	getCorners(mario, mario.x+mario.speed*dirx, mario.y);
	if (dirx == -1 && mario.downleft && mario.upleft) {
		mario.x += speed*dirx;
		fall(mario);
	}
	if (dirx == 1 && mario.upright && mario.downright) {
  		mario.x += speed*dirx;
		fall(mario);
	}
	
	mario._x = mario.x;
	mario._y = mario.y;
	mario.xtile = Math.floor(mario._x/tiles.w);
	mario.ytile = Math.floor(mario._y/tiles.h);
	
	return true;
}

function fall (ob) {
	if (!ob.jump) {
		getCorners(ob, ob.x, ob.y+1);
		if (ob.downleft && ob.downright) {
  			ob.jumpspeed = 0;
 			ob.jump = true;
		}
	}
}

function jump(ob) {
	ob.jumpspeed = ob.jumpspeed + ob.gravity;
	if (ob.jumpspeed > tiles.h-ob.h) {
		ob.jumpspeed = tiles.h-ob.h;
	}
	if (ob.jumpspeed < 0) {
		moveChar(ob, 0, -1, -1);  
	} else if (ob.jumpspeed > 0) {
		moveChar(ob, 0, 1, 1);  
	}
	return true;
}

function getCorners(ob,x,y) {
	ob.downY = Math.floor((y+ob.h-1)/tiles.h);
	ob.upY = Math.floor(y/tiles.h);
	ob.leftX = Math.floor(x/tiles.w);
	ob.rightX = Math.floor((x+ob.w-1)/tiles.w);

	ob.upleft = (map[ob.upY][ob.leftX])?false:true;
	ob.downleft = (map[ob.downY][ob.leftX])?false:true;
	ob.upright = (map[ob.upY][ob.rightX])?false:true;
	ob.downright = (map[ob.downY][ob.rightX])?false:true;
}

function buildMap(map) {
	var mapHeight = map.length;
	var mapWidth = map[0].length;
	for(var i=0; i<mapHeight; i++) {
		for(var j=0; j<mapWidth; j++) {
			if(map[i][j] == 1) {
				canvas.drawImage('block',j*tiles.w,i*tiles.h);
			}
		}
	}
	canvas.drawImage('mario',0,0,tiles.w,tiles.h,mario.x,mario.y,mario.w,mario.h);
}