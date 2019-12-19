import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


class Config(object):

  version = '0.1'
  title = 'title'
  description = 'template'
  host = '0.0.0.0'
  port = '5000'
  debug = True

  def __getitem__(self, item):
    return self.__getattribute__(item)


config = Config()
