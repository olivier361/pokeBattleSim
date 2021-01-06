# pokeBattleSim
A little website project that uses JavaScript, jQuery, a RESTful web API and JSON data to simulate Pokemon battles.

__LINK TO THE SITE:__
http://webhome.csc.uvic.ca/~oliviergg/project2/final/html/pokeBattleSim.html

__PROJECT BACKGROUND:__
The project was done in the context of my "CSC 130: World Wide Web and Mobile Applications" class at the University of Victoria.
We were tasked to build a website that showcases our knowledge of making interactive websites
using JavaScript and jQuery while incorporating a web based RESTful API and JSON data parsing.

__HOW TO USE THE SITE:__
On the site, you are presented with two input fields where you can enter Pokemon names and two sliders to chose a level for the respective Pokemon.
NOTE: you can also click on the "Random Battle" button which will initiate a battle by selecting two random pokemon with random levels.

When a battle is initiated, the bottom half of the pokedex will display a scrolling narrative description of the battle which is influenced
by the levels, moves, items and abilities of the two battling Pokemon. If you wish to scroll through the narrative manually you can press
the "Turn On Manuall Scrolling" button and scroll line by line by clicking the "Next Line" button.

Present below the pokedex, you will find additional information on how to use the site.

__HOW IT WORKS:__
You'll find the html, css, JavaScript (js) and image files used for the site in their respective folders.

All buttons and inputs on the site are linked to interactive JavaScript functions which in turn either set variables to set up the Pokemon battle
or send requests to the API and then parses through the returned JSON data.
NOTE: This project uses PokeAPI. More details here: https://pokeapi.co/

When the user clicks on the "Battle" or "Random Battle" buttons, the battle() script is run which
finds the images, names, moves, abilities and items related to the given two Pokemon and uses
them in a fill in the blanks type of narrative that is also influenced by the Pokemon's level
and info found in the JSON data.

For those interested in seeing the JSON data associated with the chosen Pokemon, clicking the "Show Stats for Nerds" button
at the bottom of the site page will display the raw JSON data returned by PokeAPI for both Pokemon.

__DISCLAIMER:__
Images used in the project may be subject to copyright and are used under Fair Use for educational purposes. They are to be used for personal and non-commercial use only.

