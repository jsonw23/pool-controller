from ariadne import make_executable_schema
from .schema import type_defs
from .resolvers import resolvers

schema = make_executable_schema(type_defs, resolvers)