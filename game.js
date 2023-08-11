export default class Game extends Phaser.Scene {
    constructor() {
      super("Game");
    }
  
    init() {
      this.contadorBounce = 0;
      this.contadorNivel = 1;
      this.isWinner = false;
      this.isLose = false;
    }
  
    preload() {
      // load assets
      this.load.image("Pj", "./images/Pj.png");
      this.load.image("ball", "./images/Ball2.png");
      this.load.image("rect", "./images/rectangle.png");
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  
    create() {
        //pelotinha
      this.ball = this.physics.add
        .image(400, 100, "ball")
        .setScale(0.06)
        .setVelocity(100, 200)
        .setBounce(1, 1)
        .setCollideWorldBounds(true);

        //suelo
       this.rect =  this.physics.add
        .image(400,600, "rect")
        .setScale(0.2)
        .setCollideWorldBounds(true)
        .setDisplaySize(800, 8)
        //aro
      this.playb = this.physics.add
        .image(400, 560, "Pj")
        .setScale(0.4)
        .setImmovable(true)
        .setCollideWorldBounds(true)
        .refreshBody()
        .setDisplaySize(130,75)
        .setInteractive();
      this.playb.body.allowGravity = false;
      this.camera = this.cameras.main;
      this.obstac = this.physics.add.staticGroup();
  
      this.physics.world.setBoundsCollision(true, true, true, true);
  
      this.physics.add.collider(
        this.ball,
        this.playb,
        this.countBound,
        null,
        this
      );
      this.physics.add.collider(
        this.ball,
        this.rect,
        this.destroyBall,
        null,
        this
      );
      this.physics.add.collider(this.ball, this.obstac, null, null, this);
      this.textLevel = this.add.text(16, 16, "Nivel: 1", {
        fontSize: "30px",
        fill: "#fff",
        fontFamily: "Bond",
      });
      this.textLose = this.add.text(58, 200, "Perdiste, clickealo para reintentar", {
        fontSize: "50px",
        fill: "#fff",
        fontFamily: "Bond",
      });
      this.textLose.setVisible(false);
      this.textWin = this.add.text(58, 200, "Ganaste, clickealo para reintentar", {
        fontSize: "50px",
        fill: "#fff",
        fontFamily: "Bond",
      });
      this.textWin.setVisible(false);
    }
  
    update() {
        //mov aro
      this.playb.setVelocity(0);
      if (this.cursors.left.isDown) {
        this.playb.setVelocityX(-320);
      } else if (this.cursors.right.isDown) {
        this.playb.setVelocityX(320);
      } else {
        this.playb.setVelocityX(0);
      }
       if (this.isLose) {
        this.textLose.setVisible(true);
        this.playb.setPosition(400, 360)
        this.playb.on("pointerup", () => {
        this.scene.start("Game");
      })
    }
    if (this.contadorNivel === 4) {
        this.textWin.setVisible(true);
        this.ball.disableBody(true, true);
        this.playb.setPosition(400, 360)
        this.playb.on("pointerup", () => {
        this.scene.start("Game");
      })
    }
}
  
    moreVelocityball() {
      this.ball.setVelocityX(this.ball.body.velocity.x * 1.075);
      this.ball.setVelocityY(this.ball.body.velocity.y * 1.075);
    }
    countBound(ball, playb) {
        this.contadorBounce++;
        console.log(this.contadorBounce);
        if (this.contadorBounce === 1) {
          this.nextLevel();
        }
    console.log(this.isLose)
      }
      nextLevel() {
        console.log("Nivel" + this.contadorNivel);
        this.contadorBounce = 0;
        this.contadorNivel++;
        this.textLevel.setText("Nivel: " + this.contadorNivel);
        this.moreVelocityball();
        if (this.contadorNivel === 10) {
        this.isWinner = true;
        }
      }
    destroyBall(){
    this.ball.disableBody(true, true);
    this.isLose = true;
    console.log(this.isLose)
    }
  }
  export { Game };