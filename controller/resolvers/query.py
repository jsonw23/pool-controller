from ariadne import QueryType

from ..gpio.pins import get_pins

query = QueryType()

@query.field("gpioPins")
def resolve_gpio_pins(_, info):
    return get_pins()