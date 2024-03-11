<div align="center">
	<img src="docs/media/banner.svg" alt="Conventional Commits Lint"/>
	<br>
	<p>A light-weight module that ensure beautiful git commit history à la Conventional Commits.</p>
	<br>
</div>

---



# Conventional Commit Linter

The Conventional Commit Linter is a tool that helps enforce conventional commit message formats in your
Git repositories. [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) are a structured
way of writing commit messages, which helps in
automatic changelog generation, versioning, and semantic release.

## Installation

To install the Conventional Commit Linter, you can use npm:

```bash
npm install -g conventional-commit-linter
```

To run the linter (from a git repo):
```bash
conventional-commit-linter
```

Example output of valid commit format:
```
Evaluating commit "feat: add search button"
[OK] The last commit message follows the Conventional Commits style.
```

Example output with incorrect commit format:
```
Evaluating commit "Added search button"
[FAILED] The last commit message does not follow the Conventional Commits style.
 - Has inforrect type (prefix).
 - The first letter of the commit message should be lowercase.
```


### Use in Azure DevOps YAML pipeline

Example of validing the newest commit message (can be modified to validate all commits).

```yaml
steps:
  - task: NodeTool@0
    displayName: Setup Node
    inputs:
      versionSpec: '20.x'

  - task: PowerShell@2
    displayName: Lint git commit subject
    inputs:
      targetType: inline
      script: |
        # Fetch the source branch commit(s) using Azure DevOps REST API
        # Create a Personal Access Token (PAT) following this guide (set Build (read), Code (Read)),
        # https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows

        $organization = "YourOrganization"
        $project = "YourProject"
        $repositoryId = "YourRepository"
        $pullRequestId = $(System.PullRequest.PullRequestId)
        $pat = "$(PAT_VARIABLE_IN_DEVOPS)"
        $url = "https://dev.azure.com/$organization/_apis/git/repositories/$project/pullRequests/$pullRequestId/commits?api-version=7.1-preview.1"

        $response = Invoke-RestMethod -Uri $url -Headers @{Authorization = "Basic " + [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes(":$pat"))}

        if ($response.value.Count -gt 0) {
          $firstComment = $response.value[0].comment

          # Install conventional-coomits-lint and pass the subject as an argument
          npm install -g conventional-commits-lint
          conventional-commits-lint -s $firstComment
        } else {
            Write-Host "No commits found for pull request $pullRequestId"
        }
```

# Features
- Enforces conventional commit message formats
- Supports various configuration options
- Easily integrable with Git hooks or CI/CD pipelines

# Contributing
Contributions are welcome!

# References
- Conventional Commits Lint at [npmjs](https://www.npmjs.com/package/conventional-commits-lint)
- Conventional Commits Lint at [GitHub](https://github.com/the-mikael-johansson/conventional-commits-lint)

# License
This project is licensed under the MIT License.
