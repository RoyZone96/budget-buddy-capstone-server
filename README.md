# Budget Buddy
A better way to plan your daily shopping or hobbyist needs

## Working Prototype???
You can access a working prototype of the React app here: https://your-app-client.herokuapp.com/ and Node app here: https://your-app-server.herokuapp.com/


## User Stories
This app is for a logged-in user

#### Landing Page
* as a visitor
* I want to understand what I can do with this app (or sign up, or log in)
* so I can decide if I want to use it

#### Login Page
* as a visitor
* I want to log into this application 
* so I can use the application

#### Registration Page
* as a visitor
* I want to register a secure account
* so I can use the application

#### Home Page
* as a user
* I want a place to create and store my list of budgets
* so I can update them with my planned budgets and observer where or not I am within budget range

#### New Budget Page
* as a user
* I want to create and save my new budget 
* so that I can go in and edit it as I see fit

#### Budget Editting Page
* as a user
* I want a responsive and dynamic way of adding purchases and my income
* so I can properly calculate my budget.

#### Support Page
* as a user
* I want a place to report errors in the page
* so I can get a part of my application working and improve the service



### Wireframes
Landing/Login Page
:-------------------------:
![Landing/Login Page](/github-images/wireframes/login.png)
Landing/Register Page
![Landing/Register Page](/github-images/Wireframes/registration.png)
Main Page
![Main Page](/github-images/Wireframes/homepage.png)
Main Page/Add Budget
![Main Page/Add Budget](/github-images/Wireframes/new-budget.png)
Main Page/Question Submission
![Main Page/Edit Budget](/github-images/Wireframes/edit-budget.png)
Support Page
![Support Page](/github-images/Wireframes/support.png)

## Screenshots???
Landing/Login Page
:-------------------------:
![Landing Page](/github-images/screenshots/login-page-screenshot.png)
Landing/Register Page
![Register Page](/github-images/screenshots/login-page-screenshot.png)

## Functionality
The app's functionality includes:
* Every User has the ability to create an account
* Every User has the ability to create a list of my budgets ranging for vacations or hobbies
* Every User has the ability to calculate the remaining money you have and add money based on your income


## Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
* Development Environment: Heroku, DBeaver


## Front-end Structure - React Components Map
* __Index.js__ (stateless)
    * __App.js__ (stateful)
        * __LandingPage.js__ (stateful) - gets the _"prop name"_ and the _"callback prop name"_ from the __App.js__
            * __LoginForm.js__ (stateful) -
            * __RegistrationForm.js__ (stateful) -
        * __Homepage.js__(stateless) -
            * __NewBudgetButton.js__(stateful)
                *__NewBudget.js__(stateful)
            * __BudgetList.js__(stateless)
                * __Budget.js__(stateless)
                * __EditBudget.js__(stateless)
            * __Support.js__(stateless) -
                * __SupportForm.js__(stateful)


## Back-end Structure - Business Objects???
* Users (database table)
    * id (auto-generated)
    * email (email validation)
    * username (at least 8 chars, special characters, alphanumerical)
    * password (at least 8 chars, at least one alpha and a special character validation)
* Budgets
    * id (auto-generated)
    * user_id (auto-generated)
    * board_title (25 chars maximum, alphabetical)
    * available_money (integer, default 0)
    * date_created ( date-time )
* Supports
    * id (auto-generated)
    * user_id (auto-generated)
    * content
## API Documentation???
API Documentation details:
* get all users

## Responsive
App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap???
This is v1.0 of the app, but future enhancements are expected to include:
* add more functionality

## How to run it
Use command line to navigate into the project folder and run the following in terminal

### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test

### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test