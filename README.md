# README

View a demo of this app here: https://share.vidyard.com/watch/FGEa8FY7CHLqs6ahon3KG8?

To run this app locally, pull the develop branch, and from the root directory run `foreman start`

How did you approach this challenge?

I tried to imagine how a user would interact with an app like this, and under what circumstances. Through this process I created some basic user stories that helped guide my process and also helped me determine what restrictions/ validations would need to be put in place. Specifically, I imagined that an app like this would most likely be used to track an employee's work shifts or a visitor's or hours of visitation. Therefore, from my past experience using time-tracking apps for past jobs or from signing in/out when visiting an office, I determined that if a user has checked-in but hasn't checked-out yet, they won't be able to check-in again without first checking-out. I enforced this in my app by conditionally presenting either a Check In button who's onClick handler will create a new time, or a Check Out button who's onClick handler will update the already incomplete time log, based on whether or not the given user's most recent time log has yet to be completed. Other design decisions included: the "update" button will be disabled if no updates or changes have been made to a time-log, and all time logs will be returned from the api in order of date, and then in order or check-in time. This will help keep visibility on the most recent time logs by bringng them to the top.

Personally, when creating applications from scratch, I've found that it can often be beneficial to first build the front-end (mocking data in the state as needed) in order to get a stronger sense of exactly what data will be needed and in what form. This is roughly how I approached building this app, by creating the UI needed for the specific task at hand, then scaffolding the rails api, and then shifting between UI and fetching data as needed with Axios.

In order to ensure the app looked as good as possible in the shortest amount of time so I could focus on the functionality, I used the MaterialUI component library to create a balanced, clean, cohesive, and intuitive interface for the user to interact with. I also used the ruby gem bcrypt to help with storing user sessions and authenticating users.

What schema design did you choose and why?

My schema is very simple, it has 2 tables: Users, and Logs, where there's a one-to-many relationship between the two (Users -> Logs). Each Log contains: date, check_in time, check_out time, user_id. I chose to store the clock events in this manner (as opposed to each one individually) after coming up with a few user stories and determining a design. I felt that a single check_in or check_out event has virtually no meaning without the context of a check_in time, and date, and user. As I mention in my answer to question #3, there is possibly more felds I could add to the schema, such as a "status" column to the Logs table that would show if the time log is "active" (user hasn't checked out yet) or maybe "timed-out" if the user did not check_out within an alotted time frame.

If you were given another day to work on this, how would you spend it? What if you were
given a month?

If I had another day to work on this, I would try to move some of the logic from the frontend to the backend. Being more confident with React and Javascript and with Ruby on Rails (admittedly a bit rusty!), I leaned on the frontend a little too much for some of the logic. An example of this would be the method I used to return the list of time logs for the active user: instead of creating a method such as get_all_logs_by_active_user, I send the user_id as a paramter to the get logs method from the frontend. There are also some other validations I would enforce that would be essential for an app like this to work, such as: not allowing the user to edit a check-out date that is less than (occurs before) the chekc-in date (and also not allow the user to edit a check-in date to occur past the check-out date). Perhaps I would also add a date for when the user checks-out, or at least enforce at time limit for when the user must check-out by.

If I had another month, I would first have some users test the app and gather feedback to improve the current functionality and determine what is missing/ most important. However, I personally think it would be interesting to create some sort of data visualization to display the time logs over time, and I also think it would be important to create an Admin view, where Administrators could see logs for multiple "employees", filter by employee, filter by date, etc.
