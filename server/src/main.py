from flask_restplus import Resource, Namespace
from flask import request
from src.search import search

ns = Namespace(name='api', description='')


@ns.route('/')
class Route(Resource):

  @ns.doc('', params={'msg': 'message'})
  def get(self):
    msg = request.args.get('msg')
    ret = search(msg)
    return {'data': ret}
