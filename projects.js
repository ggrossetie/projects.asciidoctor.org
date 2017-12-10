Vue.component('project', {
  template: '\
    <div class="card">\
      <header class="card-header">\
        <p class="card-header-title">\
          {{name}}\
        </p>\
      </header>\
      <div class="card-content">\
        <div class="content">\
          {{description}}\
        </div>\
      </div>\
      <footer class="card-footer">\
        <p class="card-footer-item">\
          <span>\
            <i class="fas fa-circle" v-bind:style="{ color: languageColor }"></i> {{language}}\
          </span>\
        </p>\
        <p class="card-footer-item">\
          <span>\
            <i class="fas fa-star"></i> {{stargazersCount}}\
          </span>\
        </p>\
        <p class="card-footer-item">\
          <span>\
            <i class="fab fa-github-alt"></i> <a href="{{homePageURL}}">Source</a>\
          </span>\
        </p>\
        <p class="card-footer-item">\
          <span>\
            <i class="fas fa-book"></i> <a href="{{documentationURL}}">Doc</a>\
          </span>\
        </p>\
      </footer>\
    </div>\
    ',
  props: ['name'],
  data: function () {
    for (var i = 0; i < projectsVue.projects.length; i++) {
      var project = projectsVue.projects[i];
      if (project.name === this.name) {
        return project;
      }
    }
    return {};
  }
});

var projectsVue = new Vue({
  el: '#projects',
  data: {
    projects: []
  }
});

var languagesVue = new Vue({
  el: '#languages',
  data: {
    languages: []
  }
});

var projectNames = ['asciidoctor', 'asciidoctor.js', 'asciidoctorj'];

var gh = new GitHub();

function getLanguageColor(language) {
  if (language ===  'Java') {
    return '#b07219';
  }
  if (language ===  'Javascript') {
    return '#f1e05a';
  }
  if (language ===  'Ruby') {
   return '#701516'
  }
  return "Tomato";
}

gh.getOrganization('asciidoctor').getRepos(function (error, repos) {
  var projects = [];
  var languages = new Set();
  for (var i = 0; i < projectNames.length; i++) {
    var projectName = projectNames[i];
    for (var j = 0; j < repos.length; j++) {
      var repo = repos[j];
      if (repo.name === projectName) {
        var languageColor = getLanguageColor(repo.language);
        projects.push({
          name: projectName,
          description: repo.description,
          stargazersCount: repo.stargazers_count,
          homePageURL: repo.html_url,
          documentationURL: '',
          languageColor: languageColor,
          language: repo.language
        });
        languages.add({name: repo.language, color: languageColor});
      }
    }
  }
  projectsVue.projects = projects;
  languagesVue.languages =  Array.from(languages);
});
