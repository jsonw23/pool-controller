class ControllerError(Exception):
    """
    Base class for Controller errors
    """
    pass

class PinTakenError(ControllerError):
    """
    Raised when something else is already connected to a GPIO pin.
    """
    def __init__(self, pin: int, already_connected: str):
        self.pin = pin
        super().__init__(f"Can't use pin {pin}, {already_connected} is already using it")

class DuplicateLabelError(ControllerError):
    """
    Raised when something else already has the same label.
    """
    def __init__(self, label: str):
        self.label = label
        super().__init__(f"Duplicate label: {label}")