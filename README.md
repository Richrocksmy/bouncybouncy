#BouncyBouncy

##A software product to create random trajectory balls that bounce


##Usage:

`npm install`

`gulp`

##Notes

esLint failOnError disabled because there appears to be an issue with the linter
and ES6 classes not being detected as used causing a build failure.

TODO

- Auto resize canvas on window resize - Need to repaint the ball's y coord
  when the canvas gets resized.

- Weakmap or symbols for private members? can' do this[_symbol].prop

- Minify / uglify code

- SASS

- Sometimes the browser needs a refresh on start to display...dunno why - maybe
  caused by the watcher, remove this from the gulp task

- Change canvas colour - add background image?

- Sometimes balls randomly change color

