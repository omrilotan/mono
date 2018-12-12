# create-git-alias [![](https://img.shields.io/npm/v/create-git-alias.svg)](https://www.npmjs.com/package/create-git-alias) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/create-git-alias)

## CLI tool to apply some useful git aliases
This is an interactive process. You get to choose what you want

```sh
npm create git-alias
```

### options

#### `--all`
Show all choices - even ones that are identical to the ones I have

```
npm create git-alias -a
```

<img src="https://user-images.githubusercontent.com/516342/48844024-713ada00-eda1-11e8-9eb3-5b2d0b4bdeb8.png" width="600">

## aliases

| alias | Description
| - | -
| aliases | print all git aliases
| far | fetch from remote master and rebase
| feature | Create a branch starting with today's date
| fix | add, ammend the current commit and push some fixes
| from | how many commit since <commit id>
| get | start a repo by remote URL
| l | pretty log
| merged | After remote merge, trash current branch and pull from master
| please | git push <this_branch> --force-with-lease
| pruner | prune aggressive
| purge | remove local and remote branches (accepts many)
| s | Short status with branch name
| sum | Generate a summary of pending changes
| trash | Move to master and delete current local branch
| whereami | What branch am I on?
| wip | a wip commit with a random commit message
| yolo | a commit with a random commit message from whatthecommit
