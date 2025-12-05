// cypress/e2e/fips.cy.js

describe('FIPS Status Check', () => {
  it('prints Node/OpenSSL FIPS status', () => {
    // This runs in Node (defined in cypress.config.js -> setupNodeEvents)
    cy.task('printFipsStatus').then(() => {
      // nothing to assert here, we just want log output
    });
  });

  it('runs the system openssl-fips-test binary', () => {
    cy.task('opensslFipsTest').then((result) => {
      // Make sure the FIPS test passed
      expect(result).to.have.property('success', true);
      // Optionally assert the output has something interesting:
      // expect(result.output || '').to.include('SUCCESS');
    });
  });
});