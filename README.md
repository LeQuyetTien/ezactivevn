# EZ Active Vietnam

## 1. Create new ExpressJS app

[Express application generator](https://expressjs.com/en/starter/generator.html)

```cmd
express --view=pug ezactivevn
cd ezactivevn
npm install
SET DEBUG=ezactivevn:* & npm start
```

## 2. Connect to Github

Create a new repository on [Github](https://github.com/new)

Commit
```
git add .
git commit -m "Create a new Express app"
```

Push code to Github
```cmd
$ git remote add origin git@github.com:LeQuyetTien/ezactivevn.git
$ git branch -M main
$ git push -u origin main
```

## 3. Deploy to Heroku

[Deploying Node.js Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)

### 3.1. Create a new account and login to [Heroku](https://dashboard.heroku.com/apps)

### 3.2. Click `New` -> `Create new app`

### 3.3. Open the app -> Select tab `Deploy` -> Select `Github` in `Deployment method` -> Connect to repository on Github -> Click `Deploy Branch` in `Manual deploy`

### 3.4. Open the app https://ezactivevn.herokuapp.com/
