var projectsVue = new Vue({
  el: '#projects',
  data: {
    projects: [],
    projectsPristine: []
  }
});

var languagesVue = new Vue({
  el: '#languages',
  data: {
    languages: []
  },
  methods: {
    filterByLanguage: function (language) {
      document.getElementById('clear-filter').classList.remove('is-invisible');
      projectsVue.projects = projectsVue.projectsPristine.filter(function (project) {
        return project.language === language;
      });
    },
    clearFilter: function () {
      // unchecked all
      var languageEl = document.getElementsByName("language");
      for (var i = 0; i < languageEl.length; i++) {
        languageEl[i].checked = false;
      }
      document.getElementById('clear-filter').classList.add('is-invisible');
      projectsVue.projects = projectsVue.projectsPristine;
    }
  }
});
