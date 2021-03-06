   window.onload = function() {

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
        var score = 0;
        var scoreText;
        
        function preload () {
      
            game.load.image('sky', 'images/phaserexamples/sky.png');
            game.load.image('ground', 'images/phaserexamples/platform.png');
            game.load.image('star', 'images/phaserexamples/star.png');
            //game.load.spritesheet('dude', 'images/ninja/spritesheet/parts/ResizedRunAndIdle.png', 45.5, 54);
            game.load.atlasJSONHash('dude', 'images/ninjagirl/ninjagirl.png', 'images/ninjagirl/ninjagirl.json');
         
           
        }

        function create () {

           //  We're going to be using physics, so enable the Arcade Physics system
            game.physics.startSystem(Phaser.Physics.ARCADE);

            //  A simple background for our game
            game.add.sprite(0, 0, 'sky');

            //  The platforms group contains the ground and the 2 ledges we can jump on
            platforms = game.add.group();

            //  We will enable physics for any object that is created in this group
            platforms.enableBody = true;

            // Here we create the ground.
            var ground = platforms.create(0, game.world.height - 64, 'ground');

            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            ground.scale.setTo(2, 2);

            //  This stops it from falling away when you jump on it
            ground.body.immovable = true;

            //  Now let's create two ledges
            var ledge = platforms.create(400, 400, 'ground');

            ledge.body.immovable = true;

            ledge = platforms.create(-150, 250, 'ground');

            ledge.body.immovable = true;

              // The player and its settings
            player = game.add.sprite(32, game.world.height - 200, 'dude');
           
            
            
            //  We need to enable physics on the player
            game.physics.arcade.enable(player);

            //  Player physics properties. Give the little guy a slight bounce.
            player.body.bounce.y = 0.2;
            player.body.gravity.y = 300;
            player.body.collideWorldBounds = true;

            //  Our two animations, walking left and right.
            //player.animations.add('stop', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 10, true);
           player.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
           player.animations.add('idle', [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 10, true);
           player.animations.add('jump', [70, 71, 72, 73, 74, 75, 76, 77, 78, 79], 5, true);    
           player.animations.add('right', [81, 82, 83, 84, 85, 86, 87, 88, 89, 90], 10, true); 
              
             // Set Anchor to the center of your sprite

                player.anchor.setTo(.5,.5);
            createstars();
            scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        }
       function update() {
            game.physics.arcade.overlap(player, stars, collectStar, null, this);
            //  Collide the player and the stars with the platforms
           game.physics.arcade.collide(stars, platforms);
            game.physics.arcade.collide(player, platforms);
              //  Reset the players velocity (movement)
            player.body.velocity.x = 0;
            cursors = game.input.keyboard.createCursorKeys();

            if (cursors.left.isDown)
            {
                //  Move to the left
                player.body.velocity.x = -150;
                
               if(!player.body.touching.down){
                player.animations.play('jump');
                }else{player.animations.play('right');}
                

                // Invert scale.x to flip left/right

                player.scale.x = -1;

            

                
                
            }
            else if (cursors.right.isDown)
            {
                //  Move to the right
                player.body.velocity.x = 150;
                
                if(!player.body.touching.down){
                player.animations.play('jump');
                }else{player.animations.play('right');}
             

                // Invert scale.x to flip left/right

                player.scale.x = 1;
            }

            else
            {
                //  Stand still
                player.animations.play('idle');
                
                
            }

            //  Allow the player to jump if they are touching the ground.
            if (cursors.up.isDown && player.body.touching.down)
            {
                player.animations.play('jump');
                player.body.velocity.y = -350;
            }
       }
       function collectStar (player, star) {

            // Removes the star from the screen
            star.kill();            
                   
               //  Add and update the score
            score += 10;
           
            scoreText.text = 'Score: ' + score;

        }
       function createstars(){
              stars = game.add.group();
            
                stars.enableBody = true;

                //  Here we'll create 12 of them evenly spaced apart
                for (var i = 0; i < 12; i++)
                {
                    //  Create a star inside of the 'stars' group
                    var star = stars.create(i * 70, 0, 'star');

                    //  Let gravity do its thing
                    star.body.gravity.y = 6;

                    //  This just gives each star a slightly random bounce value
                    star.body.bounce.y = 0.7 + Math.random() * 0.2;
                }
            }
    };
