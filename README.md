# User-login and Registration in Angular

## steps to Host Angular application in IIS Server

01. Please clone or download the source code via this url (https://github.com/dhananjaya85/Angular-user-login.git) 
To run the app locally, do 'npm install' and then execute 'ng serve' command. You can now open the browser and browse the url http://localhost:4200/ 

 Angular application Build artifacts (dist folder and it's content) are included with the source control under the 
'Angular-user-login\dist\user-login-and-registration\' folder.

02. We’ll be hosting the build artifacts from this folder in IIS in the subsequent steps.

03. Create a Web application in IIS
Create new folder called 'LoginApp' under C:\inetpub\wwwroot\ folder and copy the above angular artifacts into this folder.
Create a new web site or web application or virtual directory in IIS to host the Angular application (The Login App). 
In this case you can create a new website SPA and create new web application LoginApp under it. Set the C:\inetpub\wwwroot\LoginApp as the physical path of the web site. 

04. Install URL rewrite module in IIS (If already not installed)
This step is required to support deep-linking. Deep-linking is the capability for the user to navigate directly to a page by typing the route into the address bar 
instead of using the Angular routing. Deep-linking causes a problem for IIS because the URL that the user attempts to 
access is not known to the server and therefore the user receives a 404 response. 
The solution is for the server to always return the root of the application, 
even if the user requests a path within the application.
Install the URL rewrite module from this link - https://www.iis.net/downloads/microsoft/url-rewrite

05. Add web.config with a URL rewrite rule (This file already added and available under artifacts)
This web.config created in src folder and to ensure that this file gets copied to dist folder each time a build is generated 
we also made an entry in the assets section in angular.json.

06. With this you can now browse the url http://localhost/LoginApp/ from the browser. This should load initial Login page.

07. If you want to re-build the artifacts you can use this command   "ng build --base-href "/LoginApp/" --prod" and you can use them to host the app in IIS server.
