var express = require('express');
var router = express.Router();
var https = require('https');
const app = require('../app');
const fetch = require('node-fetch');
const config = require('config');

/* GET issues listing */
router.get('/issues', function (req, res) {
  fetch(
    'https://ezactivevn.atlassian.net/rest/api/3/search?jql=sprint in openSprints() ORDER BY project ASC',
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(
          config.get('jiraUsername') + ':' + config.get('jiraPassword')
        ).toString('base64')}`,
        Accept: 'application/json',
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((text) => {
      res.render('jira/issues', { title: 'Sprint Backlog', subTitle: 'All issues in this sprint', data: text });
    })
    .catch((err) => console.error(err));
});

/* GET issues by assignee. */
router.get('/issues/assignee/:accountId', function (req, res) {
  console.log(`GET issues by assignee: req.params.accountId`);
  fetch(
    `https://ezactivevn.atlassian.net/rest/api/3/search?jql=sprint in openSprints() AND assignee = ${req.params.accountId} ORDER BY project ASC`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(
          config.get('jira_username') + ':' + config.get('jira_password')
        ).toString('base64')}`,
        Accept: 'application/json',
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((text) => {
      res.render('jira/issues', { title: 'Sprint Backlog', subTitle: 'Filter by assignee', data: text });
    })
    .catch((err) => console.error(err));
});

/* GET issues by project. */
router.get('/issues/project/:id', function (req, res) {
  console.log(`GET issues by project: req.params.id`);
  fetch(
    `https://ezactivevn.atlassian.net/rest/api/3/search?jql=sprint in openSprints() AND project = ${req.params.id} ORDER BY project ASC`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(
          config.get('jira_username') + ':' + config.get('jira_password')
        ).toString('base64')}`,
        Accept: 'application/json',
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((text) => {
      res.render('jira/issues', { title: 'Sprint Backlog', subTitle: 'Filter by project', data: text });
    })
    .catch((err) => console.error(err));
});

/* GET issues by status. */
router.get('/issues/status/:name', function (req, res) {
  console.log(`GET issues by status: req.params.name`);
  fetch(
    `https://ezactivevn.atlassian.net/rest/api/3/search?jql=sprint in openSprints() AND status = '${req.params.name}' ORDER BY project ASC`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(
          config.get('jira_username') + ':' + config.get('jira_password')
        ).toString('base64')}`,
        Accept: 'application/json',
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((text) => {
      res.render('jira/issues', { title: 'Sprint Backlog', subTitle: 'Filter by status', data: text });
    })
    .catch((err) => console.error(err));
});

module.exports = router;
