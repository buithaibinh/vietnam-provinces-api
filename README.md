# Vietnam Provinces api with lambda + http api gateway.

API to list Viet Nam administrative divisions. An implementation of npm lib [vietnam-provinces](https://www.npmjs.com/package/vietnam-provinces)

# Getting Started - Mac / Linux
## Pre-requisites

1. An AWS account https://aws.amazon.com/resources/create-account/
2. AWS CLI https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
3. Configure AWS CLI https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
4. Ensure you have the latest node and npm installed https://nodejs.org/en/download/

## Installation

1. Clone or fork this repo (e.g. `git clone git@github.com:buithaibinh/vietnam-provinces-api.git`)
2. Copy `env.sh.template` to `env.sh` (not recommended to be pushed to your git repo, it's in .gitignore as a protection)
3. Edit `env.sh` and set the values there based on your environment
4. Run `./install.sh` which does the following:
   - Installs all node dependencies (it runs `npm install` in all relevant sub-folders)
   - Builds the project (runs `tsc -b` in each relevant sub-folder - tsc is the TypeScript compiler)
   - Runs `cdk bootstrap` - which creates a stack named CDKToolkit (if it was not created already) that helps simplify managing assets.
     For more information about assets see [here](https://docs.aws.amazon.com/cdk/latest/guide/assets.html)

## Deploying / Updating the Backend Stack

- After installing. Run `./deploy.sh` to deploy the backend stack. (For the first time as well as after making changes)

## Other Commands

- Run `./diff.sh`   to compare deployed stack with current state
- Run `./synth.sh`  to display the generated CloudFormation script from the CDK code

- Run `./test.sh`   to run all tests
- Run `./build.sh`  to compile all packages
- Run `./clean.sh`  to clean compiled packages