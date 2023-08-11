export default class Game extends Phaser.Scene {
    constructor() {
      super("Game");
    }
  
    init() {
      this.contadorBounce = 0;
      this.contadorNivel = 1;
    }
  
    preload() {
      // load assets
      this.load.image("Pj", "./images/Pj.png");
      this.load.image("ball", "./images/Ball2.png");
      this.load.image("rect", "./images/rectangle.png");
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  
    create() {
      this.ball = this.physics.add
        .image(400, 100, "ball")
        .setScale(0.06)
        .setVelocity(100, 200)
        .setBounce(1, 1)
        .setCollideWorldBounds(true);
  
      this.playb = this.physics.add
        .image(400, 560, "Pj")
        .setScale(0.4)
        .setImmovable(true)
        .setCollideWorldBounds(true)
        .refreshBody();
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
      this.physics.add.collider(this.ball, this.obstac, null, null, this);
      this.textLevel = this.add.text(16, 16, "Nivel: 1", {
        fontSize: "30px",
        fill: "#fff",
        fontFamily: "Bond",
      });

      this.backgroundColor = "#22442f";
    }
  
    update() {
      this.playb.setVelocity(0);
  
      if (this.cursors.left.isDown) {
        this.playb.setVelocityX(-300);
      } else if (this.cursors.right.isDown) {
        this.playb.setVelocityX(300);
      } else if (this.cursors.up.isDown) {
        this.playb.setVelocityY(-300);
      } else if (this.cursors.down.isDown) {
        this.playb.setVelocityY(300);
      } else {
        this.playb.setVelocityX(0);
      }
    }
  
    moreVelocityball() {
      this.ball.setVelocityX(this.ball.body.velocity.x * 1.1);
      this.ball.setVelocityY(this.ball.body.velocity.y * 1.1);
    }
    countBound(ball, playb) {
        this.contadorBounce++;
        console.log(this.contadorBounce);
        if (this.contadorBounce === 2) {
          //this.pasarNivel();
          this.config.backgroundColor("#22442f")
        }
      } 
  }
  export { Game };