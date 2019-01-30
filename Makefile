EXECUTABLES = \
		npm \
		sqlite3 \
		sed \
		md5 \

FOUND := $(foreach exec,$(EXECUTABLES),\
        $(if $(shell which $(exec)),some string,$(error "No $(exec) in PATH")))

run: install 
	npm start 

init: install
	cat init.sql | sqlite3 numhub.db

demo: init
	cat demo.sql | sqlite3 numhub.db

install: package.json
	npm install --save
	sed -i -e "s/const initHash = '[A-Za-f0-9]*';/const initHash = '`md5 -q init.sql`';/" routes/db.js
