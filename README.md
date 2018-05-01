Author: Junjie Jiang, Haipu Sun
Date: 04/11/2018
Project Name: Bbay

Architecture:
Frontend: The connection between client and server is protected with Let's Encrypt Certificate and https.
Backend: The cloud host chosen is AWS EC2 instance. The database used is mongoDB. A mongoDB instance is running on the server.
Database: There are 3 data sheets/collections, user for collecting normal user info, userSecret for collecting user login realted info, item for collecting items posted.

To deploy on EC2:
1. Clone the git repository.
2. Create an EC2 instance with rules that allows access from the world.
3. In the EC2 instance, download the packages needed: apache2 npm
4. Go to Duckdns.org to set up domain transition for the EC2 instance, according to instructions on the website.
5. Go to Let's Encrypt to set up https certificate for the domain.
6. Set up configuration files in the EC2 instance with reverse proxy.
7. In the cloned repository, set up 2 config.json files for the EC2 instance. The file in the src directory should be the url of proxy in the configuration file of apache2, like the following:

{
	"url": "https://csci379-bbay.duckdns.org/server/"
}

The file in the server directory should be like the following:

{
  "dburl": "mongodb://localhost/BBay"
}

8. Run "react run-script build" in the repository directory and copy the build folder to the server.
9. Use sudo to delete the folder in /var/www/ and then make a soft link of the build folder to /var/www/.
10. Copy the server folder in the repository separately to the server.
11. Run a mongoDB service on the server with the name of database as BBay.
12. In the server, go to server folder copied just now. Run screen command, install node/nodejs. Then run "npm install --save express cors mongoose".
13. Then in the screen, run "nodejs Server.js" and ctrl-a-d to detach the screen.

Now, everything is set up and you can go to the website you set to run the application.