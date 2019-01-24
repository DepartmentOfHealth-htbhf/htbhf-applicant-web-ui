/* eslint-disable filenames/match-regex */
'use strict'

/**
 * The following Grunt packages are used to run browser compatibility tests in parallel:
 *
 * - grunt-shell: execute shell commands to set environment variables and trigger test runs
 * - grunt-parallel: run multiple tasks in parallel
 */

/* See https://mochajs.org/#usage for options calling mocha. */
const TEST_COMMAND = 'cucumber-js src/test/compatibility/features/ --require \'src/test/common/steps/*.js\' --require \'src/test/compatibility/config\' -f json:build/reports/compatibility-report.json'

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-shell')
  grunt.loadNpmTasks('grunt-parallel')

  grunt.initConfig({
    shell: {
      options: {
        stderr: false
      },
      testDesktop: {
        command: (os, osVersion, browser, browserVersion) =>
          `BROWSER_STACK_OS=${os} BROWSER_STACK_OS_VERSION=${osVersion} BROWSER_STACK_BROWSER=${browser} BROWSER_STACK_BROWSER_VERSION=${browserVersion} ${TEST_COMMAND}`
      },
      testMobile: {
        command: (device, osVersion, browser) =>
          `BROWSER_STACK_DEVICE=${device} BROWSER_STACK_OS_VERSION=${osVersion} BROWSER_STACK_BROWSER=${browser} ${TEST_COMMAND}`
      }
    },
    parallel: {
      assets: {
        options: {
          grunt: true
        },
        tasks: [
          'windows_10_ie11',
          'windows_10_edge_latest',
          'windows_10_chrome_latest',
          'windows_10_firefox_latest',
          // 'osx_safari_latest',
          'osx_chrome_latest',
          'osx_firefox_latest',
          'ios_safari_latest',
          'android_chrome_latest'
          // 'samsung_internet_latest'
        ]
      }
    }
  })

  grunt.registerTask('default', 'parallel')
  grunt.registerTask('compatibility', 'parallel')

  /**
   * Selenium browser / OS capabilities
   * https://www.gov.uk/service-manual/technology/designing-for-different-browsers-and-devices
   */

  // Windows Internet Explorer 11
  grunt.registerTask('windows_10_ie11', ['shell:testDesktop:"Windows":10:IE:11.0'])

  // Windows Edge (latest versions)
  /**
   * Edge compatibility currently broken. JIRA bug raised:
   * https://helptobuyhealthyfood.atlassian.net/browse/HTBHFB-95
   */
  grunt.registerTask('windows_10_edge_latest', ['shell:testDesktop:"Windows":10:Edge:18.0'])

  // Windows Google Chrome (latest versions)
  grunt.registerTask('windows_10_chrome_latest', ['shell:testDesktop:"Windows":10:Chrome:71.0'])

  // Windows Mozilla Firefox (latest versions)
  grunt.registerTask('windows_10_firefox_latest', ['shell:testDesktop:"Windows":10:Firefox:63.0'])

  // macOS Safari 9 and later
  /**
   * Safari 12 compatibility currently broken. JIRA bug raised:
   * https://helptobuyhealthyfood.atlassian.net/browse/HTBHFB-96
   */
  // grunt.registerTask('osx_safari_latest', ['shell:testDesktop:"OS X":Mojave:Safari:12.0'])

  // macOS Google Chrome (latest versions)
  grunt.registerTask('osx_chrome_latest', ['shell:testDesktop:"Windows":10:Chrome:71.0'])

  // macOS Mozilla Firefox (latest versions)
  grunt.registerTask('osx_firefox_latest', ['shell:testDesktop:"OS X":Mojave:Firefox:63.0'])

  // iOS Safari for iOS 9.3 and later
  /**
   * iOS Safari compatibility currently broken. JIRA bug raised:
   * https://helptobuyhealthyfood.atlassian.net/browse/HTBHFB-96
   */
  grunt.registerTask('ios_safari_latest', ['shell:testMobile:"iPhone XS":12.1:iPhone'])

  // Android Google Chrome (latest versions)
  grunt.registerTask('android_chrome_latest', ['shell:testMobile:"Google Pixel 3":9.0:android'])

  // Samsung Internet (latest versions)
  grunt.registerTask('samsung_internet_latest', ['shell:testMobile:"Samsung Galaxy S9":8.0:android'])
}
