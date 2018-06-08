import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="ck-profile__header">
        <div className="ck-profile__avatar">
          <img
            src={`/uploads/${profile.user.avatar}`}
            alt={profile.user.name}
          />
        </div>
        <div className="ck-profile__name">
          <h2>{profile.user.name}</h2>
        </div>
        <div className="ck-profile__socials">
          <p>
            {isEmpty(profile.website) ? null : (
              <a
                href={profile.website}
                className="ck-profile__social-icon"
                target="_blank"
              >
                <i className="fas fa-globe" />
              </a>
            )}
            {isEmpty(profile.social && profile.social.facebook) ? null : (
              <a
                href={profile.social.facebook}
                className="ck-profile__social-icon"
                target="_blank"
              >
                <i className="fab fa-facebook-square" />
              </a>
            )}
            {isEmpty(profile.social && profile.social.twitter) ? null : (
              <a
                href={profile.social.twitter}
                className="ck-profile__social-icon"
                target="_blank"
              >
                <i className="fab fa-twitter-square" />
              </a>
            )}
            {isEmpty(profile.social && profile.social.instagram) ? null : (
              <a
                href={profile.social.instagram}
                className="ck-profile__social-icon"
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </a>
            )}
            {isEmpty(profile.social && profile.social.youtube) ? null : (
              <a
                href={profile.social.youtube}
                className="ck-profile__social-icon"
                target="_blank"
              >
                <i className="fab fa-youtube-square" />
              </a>
            )}
            {isEmpty(profile.social && profile.social.linkedin) ? null : (
              <a
                href={profile.social.linkedin}
                className="ck-profile__social-icon"
                target="_blank"
              >
                <i className="fab fa-linkedin" />
              </a>
            )}
          </p>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
