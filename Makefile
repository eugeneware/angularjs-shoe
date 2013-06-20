all: build/angularjs-shoe.min.js

build/angularjs-shoe.js: index.js
	./node_modules/.bin/browserify index.js -o build/angularjs-shoe.js

build/angularjs-shoe.min.js: build/angularjs-shoe.js
	./node_modules/.bin/uglifyjs build/angularjs-shoe.js > build/angularjs-shoe.min.js

clean:
	rm -f build/*
