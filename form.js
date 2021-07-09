class form{
    constructor(){
        this.button1 = createButton('PLAY');
        this.button2 = createButton('HOW TO PLAY?')
        this.title = createElement('h1');
        this.greeting = createElement('h2');
    }
   
    display(){
       this.title.html("INTERSTELLAR");
       this.title.position(displayWidth/2 - 100,0);
       this.button1.position(displayWidth/2 - 20 , displayHeight/2 - 250);
       this.button2.position(displayWidth/2 - 50 , displayHeight/2 - 200);
       this.greeting.html("HI!")
       this.greeting.position(displayWidth/2 - 10 , displayHeight/4 - 100);
    }
}
class story{
    constructor(){
        this.back = createButton('BACK');
    
        this.story = createElement('h1');
        this.storyLine = createElement('h2');
        this.help = createElement('h3');

    }
    display(){
        this.back.position(displayWidth/2 - 80 , displayHeight/2 - 50);

        this.story.html("STORY")
        this.story.position(displayWidth/2 - 100, displayHeight/2 - 300);

        this.storyLine.html("You have been assigned a mission. You are the captain of the best team of astronauts. You had to go into a black hole to search for a new terrestrial life. But you have been deceived. What happens is that one member of your team is a traitor. He had already established contact with the aliens and now tries to invade the Earth. Now you, as the captain, have to save the Earth and also kill the traitor. The whole future of the Earth depends on you! Let's see what you can do!")
        this.storyLine.position(displayWidth/2 - 850, displayHeight/2 - 200);

        this.help.html("The captain can move with the help of the mouse. You have to press 'space' to use the laser gun. And remember you cannot let any alien pass by!!")
        this.help.position(displayWidth/2 - 850, displayHeight/2 - 100);
    }
}