EXECUTABLES = \
		npm \

FOUND := $(foreach exec,$(EXECUTABLES),\
        $(if $(shell which $(exec)),some string,$(error "No $(exec) in PATH")))

build: audit
	npm run-script build

dev: install
	npm start

install: package.json 
	npm install

audit: install 
	npm audit fix