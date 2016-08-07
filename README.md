#BouncyBouncy

##A software product to create random trajectory balls that bounce (in pretty colours)


##Usage:

(With npm installed...)

`npm install`

`gulp`

##Notes

- esLint failOnError is disabled because there appears to be an issue with the linter
and ES6 classes not being detected as used within the project which causes the build to fail.

- I've used Symbols for private variables instead of Weakmaps. Although Weakmaps provide a better
solution they make the code less readable in places where variables need to be changed a lot. 
There are proposals for properly implemented private variables in future releases of ECMA.

- The background image used is free for commercial use and no attribution is required. 
See - https://pixabay.com/en/san-francisco-california-city-210230/ for details.

- The `npm install` step is just to provide dev dependencies for the linting and transpile 
stages of the gulp build process. The function code was hand rolled by me without libraries

###Improvements

- Use SASS instead of pure CSS. Somewhat unecessary for the limited amount of styling included in
this project but if the project were to grow this would be advantageous

- `Ball` should inherit from a `Drawable` class. As we're only drawing one type of object in this
project it's not really an issue. If we were rendering different types of sprites then moving
some of the common code out to a base class would help keep things DRY.

- Minification and uglification of the codebase would be a necessary step if this were a production
product. I haven't applied these stages to the gulp build process because it seemed a bit unecessary.