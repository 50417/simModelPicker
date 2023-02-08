/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGitHubProjects = /* GraphQL */ `
  query GetGitHubProjects($id: ID!) {
    getGitHubProjects(id: $id) {
      id
      repo_name
      owner_name
      is_private
      project_url
      Description
      is_forked
      api_url
      created_at
      updated_at
      pushed_at
      homepage_url
      size_in_kb
      stargazers_count
      watchers_count
      language
      forks_count
      open_issues_count
      master_branch
      default_branch
      Topics
      license
      model_files
      num_model_file
      version_sha
      repo_name_lower
      owner_name_lower
      Description_lower
      Topics_lower
      model_files_lower
      createdAt
      updatedAt
    }
  }
`;
export const listGitHubProjects = /* GraphQL */ `
  query ListGitHubProjects(
    $filter: ModelGitHubProjectsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGitHubProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        repo_name
        owner_name
        is_private
        project_url
        Description
        is_forked
        api_url
        created_at
        updated_at
        pushed_at
        homepage_url
        size_in_kb
        stargazers_count
        watchers_count
        language
        forks_count
        open_issues_count
        master_branch
        default_branch
        Topics
        license
        model_files
        num_model_file
        version_sha
        repo_name_lower
        owner_name_lower
        Description_lower
        Topics_lower
        model_files_lower
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
