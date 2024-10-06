## Usage
To use this compiler you currently you will need a g++ compiler setup in your local machine also you will require Node.js and npm. 
You can clone the project as it is. 
Run npm install.
Then you can run it on localhost using npm run dev command.

## Video presentation 
Check out the video here :-
https://drive.google.com/file/d/1OyVDN2tSQt6ni3N3rh0jSTdGr3AQtxI8/view?usp=drive_link

## What is coming up
- Deployment for online access by anywhere.

## How to do it
- The main issue with its service is that we cannot requests come to our personal system where the g++ compiler resides.
- So, we can set up an EC2 instance where we can install required packages including the compiler.
- We can then use docker image of the app to deploy it on AWS using kubernetes.
