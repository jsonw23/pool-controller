from ariadne import QueryType

from controller import Controller

query = QueryType()

@query.field("gpioPins")
def resolve_gpio_pins(_, info):
    controller = Controller()
    return controller.pins

@query.field("relays")
def resolve_relays(_, info):
    return None