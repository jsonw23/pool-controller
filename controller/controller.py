from __future__ import annotations
from dataclasses import dataclass
from typing import Optional

from controller.errors import DuplicateLabelError, PinTakenError

class Controller:
    """
    Controller is the main hub for pool equipment operation.
    
    Accessed via a singleton instance, it manages the GPIO pins and relays,
    and supports a plugin architecture for the equipment.

    Attributes:
        pins (list[GPIOPin]): The GPIO pins for connections
    """
    _instance = None
    _initialized = False

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def __init__(self):
        if not self._initialized:
            self.pins: list[GPIOPin] = None
            self.relays: list[Relay] = {}
            self._initialized = True

    @classmethod
    def load(cls):
        """
        Builds and returns an instance of Controller with the Raspberry Pi GPIO pin configuration.
        """
        from pathlib import Path

        controller = cls()
        controller.pins = GPIOPin.load_pins(Path(__file__).parent / "raspberry-pi.json")
        return controller
    
    def add_relay(self, pin: int, label: str):
        """
        Adds a new relay to the controller.

        Parameters:
            pin (int): The GPIO # of the pin that the relay is connected to
            label (str): A unique label for the relay

        Raises:
            DuplicateLabelError - another relay already has the same label
            PinTakenError - something else is connected to that pin
        """
        if label in self.relays.keys():
            raise DuplicateLabelError(label)
        relay = Relay(label)
        try:
            relay.pin = pin
            self.relays[label] = relay
        except PinTakenError:
            raise


@dataclass
class GPIOPin:
    number: int
    physical_pin: int
    reserved_for: Optional[str] = None
    connected_to: Connectable = None

    @classmethod
    def from_dict(cls, data: dict) -> GPIOPin:
        return cls(**data)

    @classmethod
    def load_pins(cls, path: str) -> list[GPIOPin]:
        import json

        with open(path) as f:
            items = json.load(f)
        return [cls.from_dict(item) for item in items]

class Connectable:
    """
    Anything that connects to a pin in the controller needs to subclass this.

    Attributes:
        pin (int): Which pin it's connected to (GPIO #)
    """
    def __init__(self):
        self._pin = None

    @property
    def pin(self) -> int:
        return self._pin
    
    @pin.setter
    def pin(self, pin: int):
        """
        Sets the connected pin after validating that nothing else has taken that pin.

        This relay instance is immediately set as connnected to the given pin on the controller.
        """
        controller = Controller()
        if controller.pins[pin].connected_to is not None:
            raise PinTakenError(controller.pins[pin].number, controller.pins[pin].connected_to)
        self._pin = pin
        controller.pins[pin].connected_to = self


class Relay(Connectable):
    """
    Represents a relay switch which is connected to a pin

    Attributes:
        pin (int): The GPIO pin that the relay is conneted to.
        label (str): A unique label for the relay.
    """
    
    def __init__(self, label: str):
        self.label = label

    def __str__(self):
        return f"relay {self.label}"