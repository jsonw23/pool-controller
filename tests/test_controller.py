import pytest
from controller.controller import Controller
from controller.errors import DuplicateLabelError, PinTakenError


def test_pins():
    controller = Controller.load()
    pins = controller.pins

    # there should be 28
    assert len(pins) == 28

    # they should be in order by number
    i = 0
    for pin in pins:
        assert pin.number == i
        i += 1

def test_relays():
    controller = Controller.load()
    controller.add_relay(23, "CH8")

    assert len(controller.relays) == 1
    assert str(controller.pins[23].connected_to) == "relay CH8"

    with pytest.raises(PinTakenError):
        controller.add_relay(23, "CH9")
    
    with pytest.raises(DuplicateLabelError):
        controller.add_relay(24, "CH8")