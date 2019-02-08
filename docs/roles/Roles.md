# Breakdown of Tasks and Roles

## Objectives
1. Frontend using Material UI
2. Backend using NodeJS
3. Single page application with a default HTML page; all else returned from the server's `/api` URL using AJAX.

## Granular Breakdown of Objectives
### Frontend
1. Wireframe of layouts for different pages
	- Home page (Jay)
	- Post create page (Jacob)
	- Profile page (Gillian)
	- Register page (Gillian)
	- Login page(Gillian, Jay)
,
2. Front end features 
	- Continuous pagination of results (see `/api/pages`) (Jay)
	- Back to top button (Jay)

3. Markdown rendering and MathJax support (Jacob)

### Backend
1. Support for pagination (Jacob)
2. `/api` URL for single-page app support
3. Shareable short links (generate short URL, store mapping to long URL in MySQL) (Jacob)
4. SQLite3 (Jacob, Gillian, Jay)
	- Tables
		- Users table
		- Password history table
		- Questions table
		- Answers table
		- Categories table
		- URL shortener table


### Miscellaneous
1. Use a Makefile to initialize the database with `init.sql` file to create a sample user with past activity for the demonstration in class (_i.e.,_ demonstrate the password history, etc.) (Jacob)

