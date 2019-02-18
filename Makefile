EXECUTABLES = \
		npm \

FOUND := $(foreach exec,$(EXECUTABLES),\
        $(if $(shell which $(exec)),some string,$(error "No $(exec) in PATH")))

run: install frontend
	npm start 

init: install
	node backend/init-db.js

demo: install
	node backend/demo-db.js

install: package.json 
	npm install --save

frontend-dev: frontend/package.json .FORCE
	$(MAKE) -C frontend dev

frontend: frontend/package.json .FORCE
	$(MAKE) -C frontend

.FORCE: 
