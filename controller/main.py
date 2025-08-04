from ariadne.asgi import GraphQL

from starlette.applications import Starlette
from starlette.responses import Response
from starlette.routing import Route, Mount
from starlette.middleware.cors import CORSMiddleware

from .controller import Controller
from .schema import schema

controller = Controller.load()

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