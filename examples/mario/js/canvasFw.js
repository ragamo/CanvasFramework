var canvas = {
	config: {
		width: 550,
		height: 400,
		fps: 60
	},
	
	ctx: null,
	images: [],
	keyPressed: [],
	
	init: function(idTarget) {
		this.config.fpsTime = Math.round(1000/this.config.fps);
		
		var cnvs = document.createElement('canvas');
        cnvs.setAttribute('width', this.config.width);
        cnvs.setAttribute('height', this.config.height);
		this.ctx = cnvs.getContext('2d');
		
		var destino = (!idTarget)? document.body: document.getElementById(idTarget);
		destino.appendChild(cnvs);
		
		//Eventos
		//TODO: hacer e.which crossbrowser
		document.onkeydown = function(e) {
			if(!canvas.keyPressed.inArray(e.which))
				canvas.keyPressed.push(e.which);
			e.preventDefault();
		};
		document.onkeyup = function(e) {
			canvas.keyPressed.splice(canvas.keyPressed.find(e.which),1);
			e.preventDefault();
		}
	 },
	 
	 clear: function() {
	 	this.ctx.clearRect(0,0,this.config.width,this.config.height);
	 },
	 
	 loop: function(_fnCallback) {
	 	var that = this;
	 	var frameTime = new Date().getTime();
	 	this.draw(_fnCallback);
		
		var next = this.config.fpsTime - (new Date().getTime() - frameTime)
		setTimeout(function(){
			that.loop(_fnCallback);
		}, next)
	 },
	 
	 draw: function(_fnCallback) {
	 	this.clear();		
		if(_fnCallback) _fnCallback(this.ctx);
	 },
	 
	 /* Helpers */
	 loadImage: function(url, name) {
	 	var img = new Image();
		img.src = url;
		img.onload = function() {
			var nom = (name)?name:url;
			canvas.images[nom] = img;
		};
	 },
	 
	 getImage: function(name) {
	 	return this.images[name];
	 },
	 
	 drawImage: function(name,x,y,cw,ch,dx,dy,dw,dh) {
	 	try {
			if(dx && dy && dw && dh)
				this.ctx.drawImage(this.getImage(name),x,y,cw,ch,dx,dy,dw,dh);
			else if(cw && ch)
				this.ctx.drawImage(this.getImage(name),x,y,cw,ch);
			else
				this.ctx.drawImage(this.getImage(name),x,y);
		} catch(e) {}
	 },
	 
	 keyPress: function(_fnCallback) {
	 	var largo = this.keyPressed.length;
	 	if(_fnCallback && largo>0) {
			for(var i=0; i<largo; i++) {
				_fnCallback(this.keyPressed[i]);	
			}
		}
	 }
};

Array.prototype.find = function(val) {
	var largo = this.length;
	for(var i=0; i<largo; i++) {
		if(this[i] == val) {
			return i;
		}
	}
	return null;
};

Array.prototype.inArray = function(val) {
	var largo = this.length;
	for(var i=0; i<largo; i++) {
		if(this[i] == val) {
			return true
		}
	}
	return false;
};
