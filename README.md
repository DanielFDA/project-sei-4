# sei project 4 - BugBuster

## Index
* [Overview](#overview)
* [Installation](#installation)
* [Technologies Used](#technologies-used)
* [Conclusion](#conclusion)
	* [Wins and Challenges](#wins-and-challenges)
	* [Some Learnings](#some-learnings)


## Overview 

For my last project at General Assembly's Software Engineering course the task was to develop a full-stack website, this time we had the option to choose between going solo or choosing a duo, I chose the latter and we had a timeframe of 7 days.

In this project we switched the back-end from node to python and used Django to speed up things, for the database we went for PostgreSQL and we stood with React for the front-end.

This project is designed to be a Bug Tracker (sort of a simplified jira) with the basic functionality of it. Every user being able to create a project (or team) and being able to add other users to it with defined roles for that project. Every user being able to have different roles depending on the project, then depending on your role wether or not you can create a ticket, work on it, change the status and close it.

This project is still being worked on by both me and my [duo](https://github.com/albertocerrone)
<!-- 
For my third project in General Assembly's Software Engineering course the task was to, in groups of 3 and in a timeframe of 9 days, develop a full-stack website, making our own back-end using a mongo database and express to handle the data and React for the front-end (using the MERN stack)

For this project we were given green light to choose what we wanted to build, in our case we went for an e-commerce website which after lots of thought and discussing with the team we chose to clone Amazon but Pokémon-themed.

This project was half-way into the course and was the biggest one in terms of time and work, a lot of work was put into it and its still being updated by all the members involved in order to improve some features and fix some details. -->


## Installation

First we need to download the repository into our own machine for which we have to input the following line into our terminal or command line:
```bash 
git clone https://github.com/DanielFDA/sei-project-4.git
```

then we need to make sure both [python](https://www.python.org/downloads/mac-osx/) & [pipenv](https://www.codingforentrepreneurs.com/blog/install-django-on-mac-or-linux) is installed.

Then you'll need to install dependencies in the command line or terminal, making sure you're inside the root of the project. The address on the terminal should look something like this
```bash 
~/GA/development/PROJECTS/sei-project-4
``` 
to install back-end dependencies, in the root of the project (folder) run `pipenv`

then you have to enter the shell for the project: `pipenv shell`

afterwards we have to make migrations for which you run `python manage.py makemigrations`, followed by `python manage.py migrate``

then we need to seed the database by running the following commands one by one in the following order</br>
`python manage.py loaddata jwt_auth/seeds.json`</br>
`python manage.py loaddata projects/seeds.json`</br>
`python manage.py loaddata group_members/seeds.json`</br>
`python manage.py loaddata tickets/seeds.json`</br>
`python manage.py loaddata comments/seeds.json`

now we can start the back-end: `python manage.py runserver`

then we are only missing 2 steps, 1. Install dependencies for the front-end for which we: 
```bash 
cd client && yarn
``` 
and 2. start the front-end: `yarn start`

## Technologies Used
* CSS
* JavaScript (ES6)
* HTML5
* Python
* Django
* Material-UI
* React
* Insomnia
* Trello
* GitHub
* Git
* Heroku
* Google Sheets
* VSCode
## Conclusion

### Wins and Challenges

Most of the wins for this project revolved around learning lots of different things like Material-UI which Alberto had a special interest for using, learning Python as we had just learned the basics and we were learning more as we went and developing more complex functions to deal with the logic we wanted to implement in order to achieve all the relationships shown in our diagram.

The diagram was very tricky but useful for a lot of things we had set out to do like being able to change roles depending on the project, this complexity played a huge role, limiting the amount of features that we were able to implement but it's something that we both agreed on mainly because the scope is very big but we alredy have done the back-end side of things which is the most complicated part and now we can focus on improving what we alredy made and add features that we wanted to have.

<!-- The biggest win for me was learning how to work as a team, not only communicating efficiently, being on the same page and sharing a common goal but also learning to use git commands and getting more used to sharing thoughts about ongoing work and to-be added features.

The biggest challenges I encountered were mainly code related, stuff that I wanted to implement but had to research and try to do it and sometimes having to ask for help because time was of the essence, which helped me learn a lot of new stuff and kept us as a cohesive team.  -->


### Some Learnings

Using Django made us realize how impactful a technologie can be, mainly because with Django there's a lot stuff that's alredy made and implemented without having to do anything, where as with mongo you have to set everything up from scratch, this can be both very useful and frustating (in case you want to edit or make your own customized validations for example.) but it will always depend on the project, how complex, how much time and manpower there is for it. Showing us that choosing a technologie in the beggining of a project is a very useful tool, and being versatile will most often than not help you/your team, develop a much more stable and efficient app.

Once again I had the luck of having a teammate that was very enjoyable to work with and that made the experience of developing this project one to remember going forward. We are both very proud of what we did and we look forward to working with each other in the future.
<!-- 
This being the biggest project I worked on during the course meant that it's the one where I learned the most about the front-end side of things which is where I spent the majority of my time.

Being up to date with our daily standups and meeting played a big role in order for me to be aware of how things were working in the back-end side of things (in case they changed from one day to another) and made everything go smoother coding wise, also teached me a lot about how and what to communicate in order for the best approach to be taken about a certain matter.

This being the first time working on a full-stack app meant that the beggining was very tough, having to set up everything and being able to run it in all of our computers and update with regular commits so we could see the improvements of everyone involved was a huge learning process that was well worth it in the end because we all felt very comfortable using git at the end of it.

All the process that took part in this project was very unique and special, we were very ambitious with the amount of functionality we wanted for the website but at the same time everyone was working very hard to achieve everything that we set up to do, due to the amount of work some of the features weren't completely polished and had to be left out of the deployed website but I feel like my teammates and I are very happy about the outcome of this project and I'm certainly very grateful of being part of it, it was a tiring but very enjoyable experience. -->


[Index](#index)