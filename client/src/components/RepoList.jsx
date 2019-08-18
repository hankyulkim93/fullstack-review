import React from 'react';

const RepoList = (props) => {

  let list = props.repos.slice(0, 25).map((repo) => {
    return (
      <div>
        <p><a href={repo.html_url}>{repo.name}</a>({repo.size})</p>
      </div>
    );
  });

  return (
  <div>
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    Here are the top 25 repos by size:
  </div>
  <div>
      {list}
  </div>
  </div>
  )
}

export default RepoList;