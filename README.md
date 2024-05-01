# url-shortener

Web Service for virtual resource sharing and analytics.

## Features

![UML](./public/assets/images/uml)

### Profiles

User profiles are managed by Auth0.  Client Applications are responsible for authenticating with the Auth0 user database and assigning tokens for user sessions.

### Links

Given a valid url, the url-shortener will create a shortened link to the provided resource.

#### Time Limits

By default all links created will be temporary, lasting 1 week, after that time and data associated with the links will be removed.  If a user creates an account, Links will exist Indefinitely.

#### QR Codes

QR codes can be generated for users with authentication credentials.

#### Customization

Authenticated users are allowed to 

### Analytics

Analytics data represents information regarding link usage.  As links are assigned attributes and context, these data collections will be used to build a platform to allow users insights into link activity.

#### Visits

#### Locations
