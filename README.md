# CaSMM

> Computation and Science Modeling through Making

Cloud-based programming interface

![Deploy Staging](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Staging/badge.svg)
![Deploy Production](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Production/badge.svg)

<br/>

## Updates

### List of all project features implemented and associated screenshots of features developed

- Assessment Editor

  - Description: Allows teachers and admin to edit existing assessments and specific problems in the assessment.
  - Images:
      <p align="center">
      <img src="https://github.com/UFGroup4b/Sapphire-Project03-4b/blob/develop/4b/READMEimgs/AssessmentEditor.png?raw=true" width="50%">
      <img src="https://github.com/UFGroup4b/Sapphire-Project03-4b/blob/develop/4b/READMEimgs/AssessmentEditor2.png?raw=true" height="300">
      </p>

    > Figure 1: Display of the assessment editor.

      <p align="center">
      <img src="https://github.com/UFGroup4b/Sapphire-Project03-4b/blob/develop/4b/READMEimgs/QuestionEditor.png?raw=true" width="50%">
      </p>

    > Figure 2: Display of the question editor.

- Assessment Preview Page

  - Description: Allows teachers to preview what the assessment will look like.
  - Images:

    <p align="center">
    <img src="https://github.com/UFGroup4b/Sapphire-Project03-4b/blob/develop/4b/READMEimgs/AssessmentPreview.png?raw=true" width="50%">
    </p>

    > Figure 3: Display of the assessment preview page.

- Assessments List Page

  - Description: There are two different displays: For teachers, it displays a list of the existing assessment that have been created. While the student's view shows all the assessments that they need to take or have already taken.
  - Images:

    <p align="center">
    <img src="https://github.com/UFGroup4b/Sapphire-Project03-4b/blob/develop/4b/READMEimgs/teacherAssessmentList.png?raw=true" width="50%">
    </p>

    > Figure 4: Display of the teacher view of the assessment list

    <p align="center">
    <img src="https://github.com/UFGroup4b/Sapphire-Project03-4b/blob/develop/4b/READMEimgs/studentAssessmentList.png?raw=true" width="50%">
    </p>

    > Figure 5: Display of the student view of the assessment list

- Take Assessment Page

  - Description: Allows students to take the assessment. However the submission button is not currently functionally because no database table to store student responses has been created yet.
  - Images:

    <p align="center">
    <img src="https://github.com/UFGroup4b/Sapphire-Project03-4b/blob/develop/4b/READMEimgs/teacherAssessmentDisplay.png?raw=true" width="50%">
    </p>

    > Figure 6: Display of the assessment page.

- Assessment Grading Page

  - Description: Allows teachers to view and grade student submissions for each specific assessment. Currently, this page is not linked to the database because a table to store student assessment submissions has not been created yet.
  - Images:

    <p align="center">
    <img src="https://github.com/UFGroup4b/Sapphire-Project03-4b/blob/develop/4b/READMEimgs/teacherAssessmentGrader.png?raw=true" width="50%">
    </p>

    > Figure 7: Display of the student assessment submissions page.

### Instructions for how to run the project locally

1. Install [Node](https://nodejs.org/en/) and [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable) and clone this repository
2. Run `yarn` to install project dependencies
3. Run `yarn start` from `/client` to startup the client
4. Install [docker](https://docs.docker.com/get-docker/)
5. Run `docker compose up` from `/`

   > Grant permission to the **scripts** and **server** directories if you are prompted

### How to update database and server connections

To update the database and server connections, you will need to connect to your docker and restart it after making the necessary changes to the database. You will need to set the access permissions for the assessments through the Strapi backend. Note that all changes that were made by Group 4b were consistent with the existing database, so there is no extra work to be done.

### Outstanding work

### Built Upon

- Bootstrap
- Ant Design

## Application

### `client`

[client](/client#client) is the frontend of the application. It is powered by [React](https://reactjs.org/) and [Blockly](https://developers.google.com/blockly).

### `server`

[server](/server#server) is the web server and application server. It is powered by [Node](https://nodejs.org/en/) and [Strapi](https://docs-v3.strapi.io/developer-docs/latest/getting-started/introduction.html).

### `compile`

[compile](/compile#compile) is an arduino compiler service. It is an unofficial fork of [Chromeduino](https://github.com/spaceneedle/Chromeduino).

<br/>

## Environments

> The project is divided into three conceptual environments.

### Development

#### Structure

The development environment is composed of five servers. The first one is run with the [Create React App](https://create-react-app.dev/docs/getting-started/) dev server. The later four are containerized with docker and run with [docker compose](https://docs.docker.com/compose/).

- `casmm-client-dev` - localhost:3000

- `casmm-server-dev` - localhost:1337/admin

- `casmm-compile-dev`

- `casmm-db-dev` - localhost:5432

  > The first time the db is started, the [init_db.sh](/scripts/init_db.sh) script will run and seed the database with an environment specific dump. Read about Postgres initialization scripts [here](https://github.com/docker-library/docs/blob/master/postgres/README.md#initialization-scripts). To see how to create this dump, look [here](https://github.com/DavidMagda/CaSMM_fork_2023/blob/develop/scripts/readme.md).

- `casmm-compile_queue-dev`

#### Running

`casmm-client-dev`

1. Follow the [client](/client#setup) setup
2. Run `yarn start` from `/client`

`casmm-server-dev`, `casmm-compile-dev`, `casmm-db-dev`, and `casmm-compile_queue-dev`

1. Install [docker](https://docs.docker.com/get-docker/)

2. Run `docker compose up` from `/`

   > Grant permission to the **scripts** and **server** directories if you are prompted

### Staging

#### Structure

The staging environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

- `casmm-staging` - [casmm-staging.herokuapp.com](https://casmm-staging.herokuapp.com/)
  - The web dyno runs `server`
  - The compile dyno runs `compile`

#### Running

`casmm-staging` is automatically built from the latest commits to branches matching `release/v[0-9].[0-9]`. Heroku runs the container orchestration from there.

### Production

#### Structure

The production environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

- `casmm` - [www.casmm.org](https://www.casmm.org/)
  - The web dyno runs `server`
  - The compile dyno runs `compile`

#### Running

`casmm` is automatically built from the latest commits to `master`. Heroku runs the container orchestration from there.

<br/>

## Maintenance

All three components of the application have their own dependencies managed in their respective `package.json` files. Run `npm outdated` in each folder to see what packages have new releases. Before updating a package (especially new major versions), ensure that there are no breaking changes. Avoid updating all of the packages at once by running `npm update` because it could lead to breaking changes.

### Strapi

This is by far the largest and most important dependency we have. Staying up to date with its [releases](https://github.com/strapi/strapi/releases) is important for bug/security fixes and new features. When it comes to actually upgrading Strapi make sure to follow the [migration guides](https://docs-v3.strapi.io/developer-docs/latest/update-migration-guides/migration-guides.html#v3-guides)!

<br/>

## CI/CD

All of the deployments and releases are handled automatically with [GitHub Actions](https://docs.github.com/en/actions). The workflows implement custom [Actions](https://github.com/STEM-C/CaSMM/actions) that live in the [auto](https://github.com/STEM-C/auto) repo.

<br/>

## Contributing

### Git Flow

> We will follow this git flow for the most part — instead of individual release branches, we will have one to streamline staging deployment

![Git Flow](https://nvie.com/img/git-model@2x.png)

### Branches

#### Protected

> Locked for direct commits — all commits must be made from a non-protected branch and submitted via a pull request with one approving review

- **master** - Production application

#### Non-protected

> Commits can be made directly to the branch

- **release** - Staging application
- **develop** - Working version of the application
- **feature/<`scaffold`>-<`feature-name`>** - Based off of develop
  - ex. **feature/cms-strapi**
- **hotfix/<`scaffold`>-<`fix-name`>** - Based off of master
  - ex. **hotfix/client-cors**

### Pull Requests

Before submitting a pull request, rebase the feature branch into the target branch to resolve any merge conflicts.

- PRs to **master** should squash and merge
- PRs to all other branches should create a merge commit
