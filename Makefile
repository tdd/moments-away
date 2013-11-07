REPORTER=spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha -b --require blanket -R $(REPORTER)

test-cov: test
	$(MAKE) test REPORTER=html-cov > coverage.html

test-coveralls: test
	$(MAKE) test REPORTER=mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js
	rm -fr lib-cov

.PHONY: test
