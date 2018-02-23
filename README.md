## HamBot
A little discord bot I work on in my spare time.

## Installation
To run the application, you'll need the latest version of Node.js installed on your machine.
- [Node.js](https://nodejs.org/en/)

Then, in order to properly connect with your chosen discord server, you'll have to set up the application and get its application key from the official discord developers site. 
- [Discord Developers](https://discordapp.com/developers/docs/intro)

Finally, to be able to use the Google API functionality, you'll need to setup a google application and get its API key for the auth file, similar to how it was done for the discord API key.
- [Google Developers](https://developers.google.com/)

Once you have everything set up, open your command line and move to the bot's folder. From there, you can run it like any other Node.js application by running 'node bot.js'.

## Commands
~poke
  - Pokes the robot, and he responds in kind.
  
~yt <search term(s)>
  - Searches youtube for the most relevant video it can find. Will post first channel if no video is found.
  
 ~timeTest (WIP/TEST)
  - Sends a message from the past.
  
 ~dateFormatTest (WIP/TEST)
  - Tells the time locally.
