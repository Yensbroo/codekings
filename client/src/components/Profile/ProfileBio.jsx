import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileBio extends Component {
  render() {
    const { profile } = this.props;

    //Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    //List skills
    const skills = profile.skills.map((skill, index) => (
      <li key={index}>
        <i className="fas fa-check" />
        {skill}
      </li>
    ));

    return (
      <div className="ck-profile__bio-container">
        <div className="ck-profile__bio-wrapper">
          <div className="ck-profile__bio">
            <h3>About {firstName}</h3>
            {isEmpty(profile.bio) ? (
              <p>This user has no bio</p>
            ) : (
              <p>{profile.bio}</p>
            )}
          </div>
          <div className="ck-profile__skills">
            <h3>Skills</h3>
            <ul>{skills}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileBio;
