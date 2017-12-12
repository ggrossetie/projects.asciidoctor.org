'use strict';
const fs = require('fs');
const GitHub = require('github-api');

const projectNames = ['asciidoctor', 'asciidoctor.js', 'asciidoctorj'];
const gh = new GitHub();

function getLanguageColor(language) {
  if (language === 'Java') {
    return '#b07219';
  }
  if (language === 'Javascript') {
    return '#f1e05a';
  }
  if (language === 'Ruby') {
    return '#701516'
  }
  return "Tomato";
}

function buildCatalog(callback) {
  const catalog = {};
  gh.getOrganization('asciidoctor').getRepos(function (error, repos) {
    if (error) {
      console.log(error);
      return callback({});
    }
    const projects = [];
    const languages = new Set();
    for (let i = 0; i < projectNames.length; i++) {
      const projectName = projectNames[i];
      for (let j = 0; j < repos.length; j++) {
        const repo = repos[j];
        if (repo.name === projectName) {
          const languageColor = getLanguageColor(repo.language);
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
    catalog.projects = projects;
    catalog.projectLanguages = Array.from(languages);
    callback(catalog);
  });
}

function mergeTemplate(catalog) {

}

const parseTemplate = function (templateFile, templateModel) {
  return fs.readFileSync(templateFile, 'utf8')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => {
      if (line in templateModel) {
        return templateModel[line];
      } else {
        return line;
      }
    })
    .join('\n');
};

buildCatalog(function (catalog) {
  const templateModel = {
    '//#{catalogProjectLanguages}': `languagesVue.languages = ${JSON.stringify(catalog.projectLanguages)};`,
    '//#{catalogProjects}': `projectsVue.projects = ${JSON.stringify(catalog.projects)};`
  };
  const content = parseTemplate('template/init.js',templateModel);
  fs.writeFileSync('build/init.js', content, 'utf8');
});
