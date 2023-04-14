const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
    //   url: 'http://localhost',
      url: 'https://lucas-lemos-assessment.000webhostapp.com/',
      show: true,
      windowSize: '1200x900'
    }
  },
  plugins:{
    eachElement: {
        enabled: true
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'fullstack-php-react-test'
}