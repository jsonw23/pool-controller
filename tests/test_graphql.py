from ariadne import graphql_sync
from controller.schema import schema

def test_pin_query():
    query = "{ gpioPins { number physicalPin reservedFor } }"
    (success, result) = graphql_sync(schema, { "query": query })
    assert success        
    assert len(result["data"]["gpioPins"]) == 28

    i = 0
    for pin in result["data"]["gpioPins"]:
        assert pin["number"] == i
        i += 1