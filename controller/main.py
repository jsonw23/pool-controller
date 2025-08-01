from gpiozero import LED, BadPinFactory

from ariadne import make_executable_schema
from ariadne.asgi import GraphQL

from starlette.applications import Starlette
from starlette.responses import Response
from starlette.routing import Route, Mount
from starlette.middleware.cors import CORSMiddleware

from .schema import type_defs
from .resolvers import resolvers

schema = make_executable_schema(type_defs, resolvers)


routes = [
    Route("/graphql", GraphQL(schema, debug=True))
]

app = Starlette(debug=True, routes=routes)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)