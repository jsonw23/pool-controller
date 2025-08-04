from ariadne import graphql_sync
from controller.schema import schema

def test_pin_query():
    query = "{ gpioPins { number physicalPin reservedFor } }"
    (success, result) = graphql_sync(schema, { "query": query })
    assert success        
    assert len(result["data"]["gpioPins"]) == 28