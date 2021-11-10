var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const config = require('config');

/* GET issues listing */
router.get('/', function (req, res) {
  console.log(`GET all projects`);
  fetch('https://ezactivevn.atlassian.net/rest/api/3/project/search?', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(
        config.get('jiraUsername') + ':' + config.get('jiraPassword')
      ).toString('base64')}`,
      Accept: 'application/json',
    },
  })
    .then((response) => {
      console.log(
        '🚀 ~ file: projects.js ~ line 22 ~ .then ~ response',
        response
      );
      return response.json();
    })
    .then((text) => {
      res.render('projects/projects', {
        title: 'Projects',
        subTitle: 'All projects',
        data: text,
      });
    })
    .catch((err) => console.error(err));
});

/* GET version by project */
router.get('/:projectKey/versions', function (req, res) {
  console.log(`GET all versions by project`);
  fetch(`https://ezactivevn.atlassian.net/rest/api/2/project/${req.params.projectKey}/versions`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(
        config.get('jiraUsername') + ':' + config.get('jiraPassword')
      ).toString('base64')}`,
      Accept: 'application/json',
    },
  })
    .then((response) => {
      console.log(
        '🚀 ~ file: projects.js ~ line 22 ~ .then ~ response',
        response
      );
      return response.json();
    })
    .then((text) => {
      res.render('projects/versions', {
        title: 'Versions',
        subTitle: 'All versions',
        data: text,
        projectKey: req.params.projectKey,
      });
    })
    .catch((err) => console.error(err));
});

/* GET issues by version and project */
router.get('/:projectKey/versions/:versionId/issues', function (req, res) {
  console.log(`GET all issues by versions and project`);
  fetch(`https://ezactivevn.atlassian.net/rest/api/3/search?jql=fixVersion=${req.params.versionId} AND project = ${req.params.projectKey} ORDER BY project ASC`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(
        config.get('jiraUsername') + ':' + config.get('jiraPassword')
      ).toString('base64')}`,
      Accept: 'application/json',
    },
  })
    .then((response) => {
      console.log(
        '🚀 ~ file: projects.js ~ line 22 ~ .then ~ response',
        response
      );
      return response.json();
    })
    .then((text) => {
      res.render('sprint/issues', {
        title: `Version ${req.params.versionId}`,
        subTitle: 'Issues in version',
        data: text,
      });
    })
    .catch((err) => console.error(err));
});

module.exports = router;
