import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "fe14cd5813babee88b77",
      clientSecret: "96c9a8264fcb6fffbae5284e6544d5f3bbb1dfd4",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          repos: data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      <div key={repo.id} className="ck-github">
        <div className="ck-profile__github-wrapper">
          <h2>
            <Link to={repo.html_url} target="_blank">
              {repo.name}
            </Link>
          </h2>
          <p>{repo.description}</p>
          <div className="ck-github__stats">
            <div className="stats">
              <i className="fas fa-star" /> <span>{repo.stargazers_count}</span>
            </div>
            <div className="stats">
              <i className="fas fa-eye" />
              <span>{repo.watchers_count}</span>
            </div>
            <div className="stats">
              <i className="fas fa-code-branch" />
              <span> {repo.forks_count}</span>
            </div>
          </div>
        </div>
      </div>
    ));
    return (
      <div className="ck-profile__github">
        <h3>Latest Github repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
