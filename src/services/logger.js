import Raven from 'raven-js';

function init() {
  Raven.config('https://fa52aeac1a044dd79b8c641a703d7b18@o468881.ingest.sentry.io/5497424', {
    release: '1.0.0',
    enviroment: process.env.NODE_ENV,
  }).install();
}

function log(error) {
  Raven.captureMessage(error);
}

export default {
  init,
  log,
};
