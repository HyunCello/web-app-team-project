from flask_restplus import Api, Resource
from config import config
from .main import ns

api = Api(version=config['version'], title=config['title'], description=config['description'])

api.add_namespace(ns)
