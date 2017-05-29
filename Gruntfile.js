module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: {
      baseurl: 'ryoko-headers',
      app: '_site'
    },
    buildcontrol: {
      options: {
        dir: '_site',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:disjfa/ryoko-headers.git',
          branch: 'gh-pages'
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-build-control')

  grunt.registerTask('push', ['buildcontrol:pages'])
}
