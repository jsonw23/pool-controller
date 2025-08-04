from controller.controller import Controller


def test_pins():
    controller = Controller.load()
    pins = controller.pins()

    # there should be 28
    assert len(pins) == 28

    # they should be in order by number
    i = 0
    for pin in pins:
        assert pin.number == i
        i += 1