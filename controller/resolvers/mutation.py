from ariadne import MutationType

mutation = MutationType()

@mutation.field("createRelay")
def resolve_create_relay(_, info, relay):
    return None

@mutation.field("connectDevice")
def resolve_connect_device(_, info, connection):
    return None

@mutation.field("disconnectDevice")
def resolve_disconnect_device(_, info, device):
    return None

@mutation.field("turnOnRelay")
def resolve_turn_on_relay(_, info, relay):
    return None

@mutation.field("turnOffRelay")
def resolve_turn_off_relay(_, info, relay):
    return None