import graphene
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType

from src.models import *
from src.database import db_session
from flask_praetorian import Praetorian

guard = Praetorian()


class CreateUser(graphene.Mutation):
  username = graphene.String()
  rolenames = graphene.String()
  is_active = graphene.Boolean()

  class Arguments:
    username = graphene.String()
    password = graphene.String()
    rolenames = graphene.String()
    is_active = graphene.Boolean()

  def mutate(self, info, username, rolenames, password, is_active):
    user = User(username=username,
                password=guard.hash_password(password),
                rolenames=rolenames,
                is_active=is_active)
    session = db_session()
    session.add(user)
    session.commit()

    return CreateUser(username=username,
                      rolenames=rolenames,
                      is_active=is_active)


class GetUserToken(graphene.Mutation):
  access_token = graphene.String()

  class Arguments:
    username = graphene.String()
    password = graphene.String()

  def mutate(self, info, username, password):
    user = guard.authenticate(username, password)
    access_token = guard.encode_jwt_token(user)
    return GetUserToken(access_token=access_token)


# Type
class UserType(SQLAlchemyObjectType):

  class Meta:
    model = User


class ProblemType(SQLAlchemyObjectType):

  class Meta:
    model = Problem


class CommentType(SQLAlchemyObjectType):

  class Meta:
    model = Comment


# Query
class Query(graphene.ObjectType):

  users = graphene.List(UserType)
  problems = graphene.List(ProblemType)
  comments = graphene.List(CommentType)

  # problems = graphene.List()

  def resolve_users(self, context):
    query = UserType.get_query(context)
    return query.all()

  def resolve_problems(self, content):
    query = ProblemType.get_query(content)
    return query.all()

  def resolve_comments(self, content):
    query = CommentType.get_query(content)
    return query.all()


class Mutation(graphene.ObjectType):
  create_user = CreateUser.Field()
  get_user_token = GetUserToken.Field()


schema = graphene.Schema(query=Query, mutation=Mutation, types=[UserType])
