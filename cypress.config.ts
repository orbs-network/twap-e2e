import { defineConfig } from 'cypress';

async function postResults(results) {
  try {
    await fetch('https://bi.orbs.network/putes/twap-e2e', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(results),
    });
    console.log('Results posted successfully');
  } catch (err) {
    console.log('Error posting results', err);
  }
}

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('after:run', (results) => {
        if ('totalTests' in results) {
          const output = {
            _id: '', // random id
            totalTests: results.totalTests,
            totalPassed: results.totalPassed,
            totalFailed: results.totalFailed,
            totalPending: results.totalPending,
            totalSkipper: results.totalSkipped,
            tests: results.runs.map((run) => {
              return {
                tests: run.tests.map((test) => {
                  return {
                    title: test.title.join(' - '),
                    state: test.state,
                  };
                }),
              };
            }),
          };

          postResults(output);
        }
      });
    },
    supportFile: false,
  },
});
