# Project Page Description
#### Submitted Friday, February 8, 2018

## Authentication
- Login page
- Registration page
    - Get account username, password, and password confirmation. Consult the backend API to check that the username is unique. Check that the password meets complexity requirements.
    - Get remaining information such as full name, email address, security question and answer, etc.
- Forgot password page
    - Prompt the user for their username.
    - Given a username, query the backend API to get the security question that this user answered. Check their answer.
    - If the answer is correct (send to the backend API and have it return true or false) then let the user reset their password.


## Homepage
- Will, by default, display most-recent questions posted to the site.
- Browsing for questions will happen on this page through filters.
- On this page, questions displayed in an "accordion"-like fashion with expandable nodes.
- Expanding nodes gives a short preview of the question.
- Clicking on "See More..." within the preview will go to that question's page which shows the full question, as well as any answer(s) to the question.
- Beside the results there will be a floating widget that enables filtering of results on the screen (think of a filter on the side when you're online shopping and want to pick a sub-category of products) by category (_i.e.,_ geometry, number theory, trigonometry, etc.) within the current level, by difficulty, etc.
- See Layout section for more information about manipulating the results.

## Post Creation Page
- Will maintain site layout with the top app bar and left-hand drawer.
- Contains a large text input for the title of the new question to be posted.
- Below the title, include a textarea-like field to type the body of the question.
- Below this, allow the user to specify the level of the question (_i.e.,_ primary, elementary, high school, undergrad, graduate) using a select drop-down.
- Given the input for the level of the question, populate another select drop-down menu with categories for the level chosen (_i.e.,_ for undergrad allow calculus, linear algebra, number theory, set theory, abstract algebra, etc.)
- Allow the user to add tags to their question to even further classify it (_i.e.,_ a calculus question may be categorised as differential calculus).
- A submit button to post the question.

## Profile Page
- Will allow the user to update their personal information and perhaps add a profile picture.
- Includes text fields for all personal information (given name, surname, location, etc.) pre-populated with the information given at registration.
- A submit button to commit any edits to the backend database.
- Display to the user their "reputation" based on their questions being upvoted, answers marked as useful, etc.

## General Page Layout
- All pages will adhere to a single page layout.
- All pages will attempt to not "stray" far from the homepage since its a single page app.
- A menu bar at the top which spans the full width should include a search bar to search for specific questions by keywords, links to profile, sign-out, messages, etc., and the NumHub logo in the top left-hand corner.
- A "drawer" slide-out menu on the left-hand side of the screen will allow the user to switch between different levels (_i.e.,_ primary, elementary, high school, undergrad, etc.) as these will each have their own distinct "site". That is, no questions from one level will appear at all on another level one may think of each level as it's own sub-website. 



