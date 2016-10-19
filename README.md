# CSE5335-mxf6133
## CSE5335- Web Data Management
### Project deployed on Heroku: [State-of-the-art client-server web application] (https://cse5335-mxf6133.herokuapp.com/)

The following refers to the approach of the project.

a. What server framework did you choose and why?  
I have chosen NodeJS server framework. JavaScript can be used accorss the stack which enables handling JSON objects easily. Express(embeddedjs) is another module with Node that was helpful for serving the main html page. Node.js is best suited for CPU-intensive operations and can handle multiple user requests flawlessly due to its ansychronous nature inherited from javascript.

b. What client framework did you choose and why?  
I chose AngularJS as it uses HTML to defines the user interface of the webpage with the help of JavaScript. It provides additional HTML attributes that will assist in manipulating the DOM. It supports the MVC paradigm, separating the code view from the data via directives makes development easier.  

c. What aspect of the implementation did you find easy, if any, and why?  
Fetching JSON data from relative and absolute locations were pretty strightforward. Furthermore, handling such objects in both Node and Angular can be done in few lines of code. 

d. What aspect of the implementation did you find hard, if any, and why?   
Implementing the d3.js was a challenge, as setting up the layout options with labels needed to be done accurately since it caused issues with rendering the data(distance) on the graph. It took a bit longer to code as expected.  
 
e. What components OTHER than your client and server framework did you install, if any, and if so, what is their purpose for your solution?  
1. Express: The following application and purpose:  
	Router object- it provides an isolated instance of middleware and routes. HTTP methods as get() is used to respond to the users request at root location(domain.com/), rendering the webpage. Certain information like description, title can be passed from node to html making, easiler to handle such info from one location. [used in index.js]   
2. 	request: Used to make API calls from Node to CDN for fetching JSON in Node. [used in index.js]  
3.  bootstrapcdn: To load css from their servers for better visuals on webpage. [used in index.ejs]  
4. Google API for google maps, resuable_charts.js for d3.js bar chart rendering.  	 
  
f. What Ubuntu commands are required to deploy and run your server?  
I have utilized TortiseSVN tool for subversioning and have linked my project folder to Github repo. TortiseSVN provides a GUI that enables committing code. Linked Github to Heroku as the deployment method and perform a manual deploy from heroku dashboard. Due to these reasons, I have not used any Unix commands to deploy and run on the server.
Alernate deployment using Heroku CLI:
$ heroku login  
$ heroku git:clone -a cse5335-mxf6133	//clone repo to local machine  
$ cd cse5335-mxf6133  

$ git add .  
$ git commit -am "make it better"  
$ git push heroku master				//deploy to Heroku after changes  
 

