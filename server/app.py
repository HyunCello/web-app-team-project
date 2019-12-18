from flask import Flask
from src import api
from src import ns
from config import config
from flask_cors import CORS

if __name__ == "__main__":
  app = Flask(__name__)
  CORS(app)

  api.init_app(app)
  app.run(host=config['host'], port=config['port'], debug=config['debug'])
