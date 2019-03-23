EXECUTABLES = \
		npm \
		node \

FOUND := $(foreach exec,$(EXECUTABLES),\
        $(if $(shell which $(exec)),some string,$(error "No $(exec) in PATH")))

build: install frontend 

run: install frontend
	npm start 

init: install
	node backend/init-db.js

demo: install
	node backend/demo-db.js

audit: install 
	npm audit fix 

install: package.json 
	npm install
	$(MAKE) -C frontend install

frontend-dev: frontend/package.json .FORCE
	$(MAKE) -C frontend dev

frontend: frontend/package.json .FORCE
	$(MAKE) -C frontend build

clean:
	rm -rf node_modules
	$(MAKE) -C frontend clean 

.FORCE: 
