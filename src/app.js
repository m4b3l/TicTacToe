
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    chooseO:null,
    Ochosen:null,
    chooseX:null,
    Xchosen:null,
    Oneplayer:null,
    Oneplayerchosen:null,
    Twoplayer:null,
    Twoplayerchosen:null,
    gameTitle:null,
    restartButton:null,
    startButton:null,
    gameStarted:false,
    allX:[],
    allO:[],
    Col:[],
    Row:[],
    
    random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    
    choosePlayer : function(location, event){
        var ubicacion = location.getLocation();
        var juego = event.getCurrentTarget();
        var cuadro1, cuadro2;
        
        if(!juego.gameStarted){		
            cuadro1 = juego.chooseO.getBoundingBox();
            cuadro2 = juego.Ochosen.getBoundingBox();
            if(cc.rectContainsPoint(cuadro1,ubicacion) || cc.rectContainsPoint(cuadro2,ubicacion)){
                juego.chooseO.setVisible(false);
                juego.Ochosen.setVisible(true);
                juego.Xchosen.setVisible(false);
                juego.chooseX.setVisible(true);
            }
            cuadro1 = juego.chooseX.getBoundingBox();
            cuadro2 = juego.Xchosen.getBoundingBox();
            if(cc.rectContainsPoint(cuadro1,ubicacion) || cc.rectContainsPoint(cuadro2,ubicacion)){
                juego.chooseO.setVisible(true);
                juego.Ochosen.setVisible(false);
                juego.Xchosen.setVisible(true);
                juego.chooseX.setVisible(false);
            }
            cuadro1 = juego.Oneplayer.getBoundingBox();
            cuadro2 = juego.Oneplayerchosen.getBoundingBox();
            if(cc.rectContainsPoint(cuadro1,ubicacion) || cc.rectContainsPoint(cuadro2,ubicacion)){
                juego.Oneplayer.setVisible(false);
                juego.Oneplayerchosen.setVisible(true);
                juego.Twoplayerchosen.setVisible(false);
                juego.Twoplayer.setVisible(true);
            }
            cuadro1 = juego.Twoplayer.getBoundingBox();
            cuadro2 = juego.Twoplayerchosen.getBoundingBox();
            if(cc.rectContainsPoint(cuadro1,ubicacion) || cc.rectContainsPoint(cuadro2,ubicacion)){
                juego.Oneplayer.setVisible(true);
                juego.Oneplayerchosen.setVisible(false);
                juego.Twoplayerchosen.setVisible(true);
                juego.Twoplayer.setVisible(false);
            }
        }
        
        cuadro1 = juego.restartButton.getBoundingBox();
        if(cc.rectContainsPoint(cuadro1,ubicacion)){
            juego.gameStarted = false;
            for(var aux of juego.allO){
                aux.setVisible(false);
            }
            for(var aux of juego.allX){
                aux.setVisible(false);
            }
        }
        
        cuadro1 = juego.startButton.getBoundingBox();
        if(cc.rectContainsPoint(cuadro1,ubicacion)){
            juego.gameStarted = true;
            if(juego.Ochosen.isVisible() && juego.Oneplayerchosen.isVisible()){
                juego.compuPlay(0);
            }
        }
		return true;
	},
    
    compuPlay : function(ty){
        while(true){
            if(this.tableOcuppied()){
                this.gameStarted = false;
            }
            var posX = this.random(0, 2);
            var posY = this.random(0, 2);    
            var x1 = this.Col[posY*2];
            var x2 = this.Col[posY*2 + 1];
            var y1 = this.Row[posX*2];
            var y2 = this.Row[posX*2 + 1];
            var idx = posX*3+posY;
            if(ty == 0){
                this.allX[idx].x = (x1+x2)/2;
                this.allX[idx].y = (y1+y2)/2;
            }else{
                this.allO[idx].x = (x1+x2)/2;
                this.allO[idx].y = (y1+y2)/2;
            }
            if(!this.allX[idx].isVisible() && !this.allO[idx].isVisible()){
                if(ty == 0){
                    this.allX[idx].setVisible(true);
                }else{
                    this.allO[idx].setVisible(true);
                }
                break;
            }
        }
    },
    
    tableOcuppied : function(){
        for(var i=0; i<9; i++){
            if(!this.allX[i].isVisible() && !this.allO[i].isVisible()){
                return false;
            }
        }
        alert("Es un empate!!");
        return true;
    },
    
    identify : function(a, b){
        var aux = '_';
        if(this.allX[a*3+b].isVisible()){
            aux = 'X';
        }
        else if(this.allO[a*3+b].isVisible()){
            aux = 'O';
        }
        return aux;
    },
    
    checkWinner : function(){
        //Horizontal
        for(var i=0; i<3; i++){
            var winner = true;
            for(var j=1; j<3; j++){
                if(this.identify(i, j-1) != this.identify(i, j)){
                    winner = false;
                }
            }
            if(winner){
                if(this.identify(i, 0) != '_'){
                    alert("Felicidades!! Ha ganado "+this.identify(i, 0));
                    return true;
                }
            }
        }
        //Vertical
        for(var j=0; j<3; j++){
            var winner = true;
            for(var i=1; i<3; i++){
                if(this.identify(i-1, j) != this.identify(i, j)){
                    winner = false;
                }
            }
            if(winner){
                if(this.identify(0, j) != '_'){
                    alert("Felicidades!! Ha ganado "+this.identify(0, j));
                    return true;
                }
            }
        }
        //diagonal
        var winner;
        winner = true;
        for(var i=1; i<3; i++){
            if(this.identify(i-1, i-1) != this.identify(i, i)){
                winner = false;
            }
        }
        if(winner){
            if(this.identify(0, 0) != '_'){
                alert("Felicidades!! Ha ganado "+this.identify(0, 0));
                return true;
            }
        }
        
        winner = true;
        for(var i=1, j=1; i<3; i++, j--){
            if(this.identify(i-1, j+1) != this.identify(i, j)){
                winner = false;
            }
        }
        if(winner){
            if(this.identify(0, 2) != '_'){
                alert("Felicidades!! Ha ganado "+this.identify(0, 2));
                return true;
            }
        }
        return false;
    },
    
    checkAndAdd : function(touch, ty, row, col, idx){
        var x1 = this.Col[col*2];
        var x2 = this.Col[col*2 + 1];
        var y1 = this.Row[row*2];
        var y2 = this.Row[row*2 + 1];
        if(touch.x >= x1 && touch.x <= x2 && touch.y >= y1 && touch.y <= y2 && !this.allX[idx].isVisible() && !this.allO[idx].isVisible()){
            if(ty == 0){
                this.allX[idx].x = (x1+x2)/2;
                this.allX[idx].y = (y1+y2)/2;
                this.allX[idx].setVisible(true);
            }else{
                this.allO[idx].x = (x1+x2)/2;
                this.allO[idx].y = (y1+y2)/2;
                this.allO[idx].setVisible(true);
            }
            return true;
        }
        return false;
    },
    
    play : function(location, event){
        var touch = location.getLocation();
        var juego = event.getCurrentTarget();
        if(juego.gameStarted){
            if(juego.checkWinner()){
                this.gameStarted = false;
                return true;
            }
            if(juego.tableOcuppied()){
                return true;
            }
            var ty = 0;
            if(juego.Ochosen.isVisible()){
                ty = 1;
            }
            var cnt = 0;
            var valid = false;
            for(var i=0; i<3; i++){
                for(var j=0; j<3; j++){
                    if(juego.checkAndAdd(touch, ty, i, j, cnt)){
                        valid=true;
                    }
                    cnt = cnt+1;
                }
            }
            if(valid){
                if(juego.checkWinner()){
                    this.gameStarted = false;
                    return true;
                }
                if(!juego.tableOcuppied() && juego.Oneplayerchosen.isVisible()){
                    juego.compuPlay(!ty);
                    if(juego.checkWinner()){
                        this.gameStarted = false;
                    }
                }
                if(juego.Twoplayerchosen.isVisible()){
                    if(ty == 0){
                        juego.Xchosen.setVisible(false);
                        juego.chooseX.setVisible(true);
                        juego.Ochosen.setVisible(true);
                        juego.chooseO.setVisible(false);
                    }else{
                        juego.Xchosen.setVisible(true);
                        juego.chooseX.setVisible(false);
                        juego.Ochosen.setVisible(false);
                        juego.chooseO.setVisible(true);
                    }
                }
            }
        }
        return true;
    },
    
    ctor:function () {
        //super init first
        this._super();
        
        this.Col.push(360);
        this.Col.push(420);
        this.Col.push(450);
        this.Col.push(515);
        this.Col.push(545);
        this.Col.push(610);
        
        this.Row.push(340);
        this.Row.push(410);
        this.Row.push(230);
        this.Row.push(310);
        this.Row.push(120);
        this.Row.push(200);
        
        var aux;
        for(var i=0; i<9; i++){
            aux = new cc.Sprite(res.O_png);
            aux.setVisible(false);
            this.allO.push(aux);
            this.addChild(aux, 1);
            
            aux = new cc.Sprite(res.X_png);
            aux.setVisible(false);
            this.allX.push(aux);
            this.addChild(aux, 1);
        }

        /////////////////////////////
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // create and initialize a label
        this.gameTitle = new cc.LabelTTF("TicTacToe V0.1", "Arial", 24);
        this.gameTitle.x = size.width / 2;
        this.gameTitle.y = size.height / 2 + 210;
        
        this.chooseO = new cc.Sprite(res.O_png);
        this.chooseO.setScale(0.3,0.3);
        this.chooseO.x = size.width / 2 - 120;
        this.chooseO.y = size.height / 2 + 170;
        
        this.Ochosen = new cc.Sprite(res.Ochosen_png);
        this.Ochosen.setScale(0.3,0.3);
        this.Ochosen.x = size.width / 2 - 120;
        this.Ochosen.y = size.height / 2 + 170;
        this.Ochosen.setVisible(false);
        
        this.chooseX = new cc.Sprite(res.X_png);
        this.chooseX.setScale(0.3,0.3);
        this.chooseX.x = size.width / 2 - 60;
        this.chooseX.y = size.height / 2 + 170;
        this.chooseX.setVisible(false);
        
        this.Xchosen = new cc.Sprite(res.Xchosen_png);
        this.Xchosen.setScale(0.3,0.3);
        this.Xchosen.x = size.width / 2 - 60;
        this.Xchosen.y = size.height / 2 + 170;
        
        this.Oneplayer = new cc.Sprite(res.Oneplayer_png);
        this.Oneplayer.setScale(0.3,0.3);
        this.Oneplayer.x = size.width / 2 - 120;
        this.Oneplayer.y = size.height / 2 + 140;
        
        this.Oneplayerchosen = new cc.Sprite(res.Oneplayerchosen_png);
        this.Oneplayerchosen.setScale(0.3,0.3);
        this.Oneplayerchosen.x = size.width / 2 - 120;
        this.Oneplayerchosen.y = size.height / 2 + 140;
        this.Oneplayerchosen.setVisible(false);
        
        this.Twoplayer = new cc.Sprite(res.Twoplayer_png);
        this.Twoplayer.setScale(0.3,0.3);
        this.Twoplayer.x = size.width / 2 - 60;
        this.Twoplayer.y = size.height / 2 + 140;
        this.Twoplayer.setVisible(false);
        
        this.Twoplayerchosen = new cc.Sprite(res.Twoplayerchosen_png);
        this.Twoplayerchosen.setScale(0.3,0.3);
        this.Twoplayerchosen.x = size.width / 2 - 60;
        this.Twoplayerchosen.y = size.height / 2 + 140;
        
        this.startButton = new cc.LabelTTF("Start game", "Arial", 18);
        this.startButton.x = size.width / 2 + 100;
        this.startButton.y = size.height / 2 + 165;
        
        this.restartButton = new cc.LabelTTF("Restart game", "Arial", 18);
        this.restartButton.x = size.width / 2 + 100;
        this.restartButton.y = size.height / 2 + 140;

        // add the children to this layer
        this.addChild(this.gameTitle, 5);
        this.addChild(this.chooseO, 1);
        this.addChild(this.chooseX, 1);
        this.addChild(this.Ochosen, 1);
        this.addChild(this.Xchosen, 1);
        this.addChild(this.restartButton, 1);
        this.addChild(this.startButton, 1);
        this.addChild(this.Oneplayer, 1);
        this.addChild(this.Twoplayer, 1);
        this.addChild(this.Oneplayerchosen, 1);
        this.addChild(this.Twoplayerchosen, 1);

        this.sprite = new cc.Sprite(res.tablero_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        
        //Inicializando eventos
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: this.choosePlayer,
            onTouchEnded: this.play
		}, this);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

