EXECUTABLES = \
		npm \

FOUND := $(foreach exec,$(EXECUTABLES),\
        $(if $(shell which $(exec)),some string,$(error "No $(exec) in PATH")))

build: install
	npm run-script build

install: package.json 
	npm install --save

