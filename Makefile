EXECUTABLES = \
				npm \
				sqlite3 \

FOUND := $(foreach exec,$(EXECUTABLES),\
        $(if $(shell which $(exec)),some string,$(error "No $(exec) in PATH")))

run: install 
	npm start 

init: install
	echo "Do stuff" 
	# Import init.sql into the database here

install: package.json
	npm install --save