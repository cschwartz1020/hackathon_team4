# Protestr
## Add environment variables
### Frontend
Add a .env in the frontend folder containing your Auth0 client ID (REACT_APP_CLIENT_ID) and domain (REACT_APP_DOMAIN), and an API key (REACT_APP_API_KEY) for Google Maps.
### Backend
Add a .env in the backend folder containing your news API key (NEWS_API_KEY), MongoDB port (DB_PORT), DB_HOST = mongo, DB_TYPE = mongodb, database name (DB_NAME), the Auth0 jwks uri (AUTH0_JWKS_URI), Auth0 audience (AUTH0_AUDIENCE), and Auth0 issuer (AUTH0_ISSUER)
## Install Dependencies: <br /> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cd backend && npm install` <br /> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cd frontend && npm install` <br />
## To Run (From root directory): <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`docker-compose up` <br />
## To Bring Down: <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^C <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`docker-compose down` <br />
