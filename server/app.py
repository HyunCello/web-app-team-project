from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView

from config import config
from src import api
from src.database import db_session
from src.models import User
from src.schema import schema, guard

app = Flask(__name__)
app.debug = True

app.config['SECRET_KEY'] = 'SECRET_KEY'
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 1}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 1}

guard.init_app(app, User)
CORS(app)

app.add_url_rule('/graphql',
                 view_func=GraphQLView.as_view('graphql',
                                               schema=schema,
                                               graphiql=True,
                                               context={'session': db_session}))


@app.teardown_appcontext
def shutdown_session(exception=None):
  db_session.remove()


if __name__ == "__main__":

  api.init_app(app)
  app.run(host=config['host'], port=config['port'], debug=config['debug'])
