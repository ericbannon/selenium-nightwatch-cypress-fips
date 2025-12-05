# Overview

This repository contains a FIPS-enabled end-to-end (E2E) test environment for chrome and firefox using:

1. Nightwatch.js running on a Chainguard JDK-FIPS image
2. Cypress running on a Chainguard Node-FIPS image
3. A full Selenium Grid using Chainguard private images
4. Automated FIPS self-tests that validate cryptographic provider status before running any tests

## Two test runners:

### Nightwatch
* Uses WebDriver to drive Chrome and Firefox
* Java-side crypto uses BouncyCastle FIPS

### Cypress
* Node runtime uses OpenSSL FIPS provider
* Runs system openssl-fips-test

## IMPORTANT NOTE

Browsers do not use the system cryptographic providers and may be out of scope for FIPS validation for any js code that executes on the browser side

**TL:DR**

Chromium: Uses BoringSSL (Google's OpenSSL fork) - not FIPS validated, deeply integrated into browser networking stack

Firefox: Uses NSS (Network Security Services) - FIPS mode exists 

WebKit: Custom crypto implementation - not FIPS validated, no FIPS mode available

**BUT all runtime crypto performed in Java and NodeJS flows through the underlying FIPS-approved cryptographic modules**

i.e...

* HTTPS requests
* verifying certificates
* generating random numbers
* hashing values
* any Node crypto API (crypto.createHash, randomBytes, etc.)

## Summary

This environment provides:

* Full Selenium Grid on Chainguard FIPS-enabled images
* Nightwatch for multi-browser testing
* Cypress on Node-FIPS with system crypto self-tests
* Automatic FIPS verification before test execution
* A clean, reproducible, fully containerized E2E testing pipeline


## USAGE

```
docker compose down --remove-orphans
docker compose up --build e2e-nightwatch cypress
```

Running only Nightwatch 
```
docker compose up --build e2e-nightwatch
```

Running only Cypress
```
docker compose up --build cypress
```
If FIPS validation or openssl-fips-test fails, Cypress will exit with a non-zero status and show the details in the test output.

Nightwatch Output:
```
nightwatch-runner/tests_output/nightwatch-html-report/index.html
```