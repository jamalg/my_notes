# My Notes: Notes sharing app

Flask/Reactjs dockerized app to serve markdown notes. I built this app as a side project/demo to practice React stack.
You can see it live on [personal site](http://notes.jgourinda.com/).

## Generalities
### Python backend:
- **Flask** app to RESTfully serve resources
- **SQLAlchemy** + **Postgres** as a database
- **Alembic** to handle migration
- **Marshamallow** for serialization/deserialization
- Some patterns:
    - As recommended by the *Twelve Factor App* config is stored in environment variables. The conlig class in `back.utils.config_class.config::BaseConfig` leverages the power of Python descriptors to make declaring and managing configuration easier. See `back.config.py`
    - Minimal checkout pattern for database operation : Try to open the connection at last moment and close it as soon as possible. See usage of `utils.sqlalchemy.helpers::session_manager` in `models.helper::add_one`
    - The scope of the session is tied to the request cycle. The usage of `scopefunc=_app_ctx_stack.__ident_func__` in `models.db::session` and the callback attached to `app.teardown_request` in `back.models.__init__::init_app` makes the API sustain a much larger charge load. You get all these benefits and more by using **FlaskSQLALchemy** but sometimes it's also good to be aware of what is happening
    - When possible functions and helpers are written to promote intention and make reading application code easier. The philosophy is that application code in API routes or scripts should do `helper.add_user(user_data)` rather than `helper.add_one(user_data, UserSchema)`

### Reactjs frontend:
- **Redux** for state management : some of the opinionated best practices proposed in the documentation are followed
    - central definition of action types `front/src/defs.js`
    - helper is used to make writing of simple action creators simpler `front/src/redux/actions/utils.js::makeCreators`
    - reducers composition
- **Immutable.js** as support for the state :
    - Guaranteed immutabily, leveraging full potential of shallow equality test
    - Usage of [withImmutablePropsToJS](https://github.com/tophat/with-immutable-props-to-js) to keep dump components as dump as possible. See containers in `front/src/containers`
- **Normalizr**: this really is a productivity boost
    - A single action is dispatched to handle all entities. Adding other resources should only require three main steps + some caution
        - define a new schema in `front/src/schemas.js`
        - add a reducer that handles `defs.ADD_ENTITIES` and that's it
        - write the async function that make the API call like `front/src/redux/async.js::fetchFolder`
        - *Noted that some caution needs to be observed because the state is an immutable object*. If the merge is done not properly it can lead (and it did) to some unexpected behavior e.g. `state.mergeWith((o,n) =>; o.merge(n) ,fromJS(action.payload.entities.folders))` in `front/src/redux/reducers/folders`
- When needed Higher Order Components are used :
    - Example with `withStatusBouncer` in `front/src/containers/statusBouncer.js`
    - Then most components that need some kind of data which is fetched are wrapped with it `export default withStatusBouncer(Note)` in `front/src/components/note/index.js`
    - The containers simply give a `status` prop and display is updated consistently across the views of the app. See `front/src/containers/note.js` for an example
- TOC :
    - I used [markdown-toc](https://github.com/jonschlinkert/markdown-toc) to generate table of contents for the notes. As it turns out there is an issue with how the package dependencies are easy loaded [issue](https://github.com/jonschlinkert/markdown-toc/issues/102). I ended up forking the project and following the changes proposed in the discussion (notable like [here](https://github.com/jonschlinkert/markdown-toc/issues/102#issuecomment-341881368))

### Cross concerns:
- Both service lack testing. For the back in other private projects or during previous experience I am attached to writing comprehensive test suites. Here because the back API is simple I didn't do it. The fact that I used a skeleton from another private project which is tested might have made me a bit overconfident. For Front this is more a lack of knowledge. I am not familiar yet with frontend test suites
- In general I use very little comments. The idea is that the intention of the code should be made easy to understand through good naming and other best practices

## How to boot up the app
### Notes data
Example of note data is made available in `back.data`. Simply add as many categories, folders or notes as you want.

### Environment variables
The app expects a `.env` and `prod.env` files with environment variables. A comprehensive example with default values is given in `env.example`.

### Build, Up, Bootup
These commands should get you up and running for dev. The production `docker-compose` uses Dockerfiles that are optimized (no install of dev dependencies, different nginx configuration, `npm build` rather then `npm start` )
```bash
make build
docker-compose -f docker-compose.yml up -d
make upgrade # Create model tables
make load-notes # Load data in db
```
Check that the back API is working well at `http://localhost/api/categories`. Front should be served at `http://localhost`.

**Note that for production build and deploy** you need to update the value of `REACT_APP_API_URL` directly in `docker-compose-prod.yml` as it's needed at built time.