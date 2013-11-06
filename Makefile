REPORTER=spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha -R $(REPORTER)

lib-cov:
	jscoverage lib lib-cov

test-cov: lib-cov
	@MOMENTS_AWAY_COVERAGE=1 $(MAKE) test REPORTER=html-cov > coverage.html
	rm -fr lib-cov

test-coveralls: lib-cov
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@MOMENTS_AWAY_COVERAGE=1 $(MAKE) test REPORTER=mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js
	rm -fr lib-cov

.PHONY: test
