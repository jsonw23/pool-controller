from __future__ import annotations
from dataclasses import dataclass
from typing import Optional

class Controller:
    """
    Controller is the main hub for pool equipment operation.
    
    Accessed via a singleton instance, it manages the GPIO pins and relays,
    and supports a plugin architecture for the equipment.
    """
    _instance = None
    _initialized = False

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def __init__(self):
        if not self._initialized:
            self._pins: list[GPIOPin] = None
            self._initialized = True

    @classmethod
    def load(cls):
        """
        Builds and returns an instance of Controller with the Raspberry Pi GPIO pin configuration.
        """
        from pathlib import Path

        controller = cls()
        controller._pins = GPIOPin.load_pins(Path(__file__).parent / "raspberry-pi.json")
        return controller
    
    def pins(self) -> list[GPIOPin]:
        """
        Returns the pins
        """
        return self._pins


@dataclass
class GPIOPin:
    number: int
    physicalPin: int
    reservedFor: Optional[str] = None

    @classmethod
    def from_dict(cls, data: dict) -> GPIOPin:
        return cls(**data)

    @classmethod
    def load_pins(cls, path: str) -> list[GPIOPin]:
        import json

        with open(path) as f:
            items = json.load(f)
        return [cls.from_dict(item) for item in items]