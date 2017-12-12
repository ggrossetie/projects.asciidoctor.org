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
    languages: [],
    selectedLanguage: ''
  },
  computed: {
    isFilterActive: function () {
      return this.selectedLanguage !== '';
    }
  },
  methods: {
    filterByLanguage: function (language) {
      this.selectedLanguage = language;
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
      this.selectedLanguage = '';
      projectsVue.projects = projectsVue.projectsPristine;
    }
  }
});
