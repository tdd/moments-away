REPORTER=spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha -b --require blanket -R $(REPORTER)

test-cov:
	$(MAKE) test REPORTER=html-cov > coverage.html

test-coveralls:
	$(MAKE) test REPORTER=mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js

.PHONY: test
