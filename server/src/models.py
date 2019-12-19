from sqlalchemy import Column, Integer, ForeignKey, String, Float, Boolean, ARRAY
from sqlalchemy.orm import relationship
from src.database import Base, engine


class User(Base):
  __tablename__ = 'uuser'
  id = Column(Integer, primary_key=True)
  username = Column(String(150))
  password = Column(String, nullable=False)
  roles = Column(ARRAY(String))
  is_active = Column(Boolean, default=True)

  @property
  def rolenames(self):
    try:
      return self.roles
    except Exception:
      return []

  @classmethod
  def lookup(cls, username):
    return cls.query.filter_by(username=username).one_or_none()

  @classmethod
  def identify(cls, id):
    return cls.query.get(id)

  @property
  def identity(self):
    return self.id

  def is_valid(self):
    return self.is_active


class Comment(Base):
  __tablename__ = 'comment'
  id = Column(Integer, primary_key=True)


class Problem(Base):
  __tablename__ = 'problem'
  id = Column(Integer, primary_key=True)


# class Comment(Base):
# __tablename__ = ''

Base.prepare(engine)
