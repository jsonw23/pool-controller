from ariadne import make_executable_schema, snake_case_fallback_resolvers
from .schema import type_defs
from .resolvers import resolvers

schema = make_executable_schema(
    type_defs, 
    resolvers,
    snake_case_fallback_resolvers
)