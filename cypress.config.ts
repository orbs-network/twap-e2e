import { defineConfig } from 'cypress';
import { config } from 'dotenv';
import axios, { AxiosError } from 'axios';

config();

type TestResults = {
  totalTests: number;
  totalPassed: number;
  totalFailed: number;
  totalPending: number;
  totalSkipper: number;
  runs: {
    tests: {
      title: string[];
      state: string;
    }[];
  }[];
};

async function postResults(results: TestResults) {
  try {
    await axios.post('https://bi.orbs.network/putes/twap-e2e', JSON.stringify(results), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('Results posted to Kibana successfully ✅');
  } catch (err) {
    console.error('Error posting results to Kibana:', (err as AxiosError).message, err);
  }

  try {
    let message = results.runs
      .map((run) => {
        return run.tests
          .map((test) => {
            let emoji = '';
            switch (test.state) {
              case 'passed':
                emoji = '✅';
                break;
              case 'failed':
                emoji = '❌';
                break;
              case 'pending':
                emoji = '⏭️';
                break;
              case 'skipped':
                emoji = '⚠️';
                break;
            }
            return `*${test.title[0]}*: ${emoji}`;
          })
          .join('\n');
      })
      .join('\n');

    message += `\n\nTotal tests: ${results.totalTests}\nTotal passed: ${results.totalPassed}\nTotal failed: ${results.totalFailed}\nTotal skipped: ${results.totalSkipper}\nTotal pending: ${results.totalPending}`;
    console.log(message);

    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      JSON.stringify({
        chat_id: process.env.CHAT_ID,
        parse_mode: 'MarkdownV2',
        text: message,
      }),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Results posted to Telegram successfully ✅');
  } catch (err) {
    console.error('Error posting results to Telegram:', (err as AxiosError).message, err);
  }
}

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('after:run', async (results) => {
        if ('totalTests' in results) {
          const output = {
            totalTests: results.totalTests,
            totalPassed: results.totalPassed,
            totalFailed: results.totalFailed,
            totalPending: results.totalPending,
            totalSkipper: results.totalSkipped,
            runs: results.runs.map((run) => {
              return {
                tests: run.tests.map((test) => {
                  return {
                    title: test.title,
                    state: test.state,
                  };
                }),
              };
            }),
          };

          await postResults(output);
        }
      });
    },
    supportFile: false,
  },
});
