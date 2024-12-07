const EXPIRES_AT_PROPERTY_NAME = "expires_at";
const EXPIRES_IN_PROPERTY_NAME = "expires_in";

export class OAuth2Provider {
  static typeName = "oauth2";
  static label = "OAuth2";
  static fields = [
    {
      name: "url",
      label: "URL",
      type: "text",
      required: true,
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
    },
    {
      name: "scope",
      label: "Scope",
      type: "text",
    },
  ];

  currentSettings = null;
  tokenProperties = null;

  constructor(settings) {
    this.settings = settings;
  }

  set settings(settings) {
    this.currentSettings = settings;
    this.tokenProperties = null;
  }

  get settings() {
    return this.currentSettings;
  }

  getAccessToken() {
    if (
      this.tokenProperties &&
      this.tokenProperties[EXPIRES_AT_PROPERTY_NAME] > new Date()
    ) {
      return this.tokenProperties.token.access_token;
    } else if (this.tokenProperties[EXPIRES_AT_PROPERTY_NAME] >= new Date()) {
      return fetch(this.currentSettings.url, {
        body: {
          refresh_token: this.tokenProperties.token.refresh_token,
        },
        method: "POST",
      })
        .then((response) => ({
          ...response.json(),
          refresh_token: this.tokenProperties.token.refresh_token,
        }))
        .then((d) => (this.tokenProperties = this.parseToken(d)))
        .then((p) => p.token.access_token);
    } else {
      return fetch(this.currentSettings.url, {
        body: {
          username: this.currentSettings.username,
          password: this.currentSettings.password,
          scope: this.currentSettings.scope,
        },
        method: "POST",
      })
        .then((response) => response.json())
        .then((d) => (this.tokenProperties = this.parseToken(d)))
        .then((p) => p.token.access_token);
    }
  }

  parseToken(token) {
    const tokenProperties = {};

    if (EXPIRES_AT_PROPERTY_NAME in token) {
      tokenProperties[EXPIRES_AT_PROPERTY_NAME] = parseExpirationDate(
        token[EXPIRES_AT_PROPERTY_NAME],
      );
    } else if (EXPIRES_IN_PROPERTY_NAME in token) {
      tokenProperties[EXPIRES_AT_PROPERTY_NAME] = getExpirationDate(
        token[EXPIRES_IN_PROPERTY_NAME],
      );
    } else {
      throw new Error(
        "No token expiration property was found. Ignoring date parsing",
      );
    }

    return {
      ...token,
      ...tokenProperties,
    };
  }

  parseExpirationDate(expirationDate) {
    if (expirationDate instanceof Date) {
      return expirationDate;
    }

    // UNIX timestamp
    if (typeof expirationDate === "number") {
      return new Date(expirationDate * 1000);
    }

    // ISO 8601 string
    return new Date(expirationDate);
  }

  getExpirationDate(expiresIn) {
    return new Date(Date.now() + Number.parseInt(expiresIn, 10) * 1000);
  }

  createRequest = async () => {
    const token = await this.getAccessToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
}
