

import json
from pathlib import Path


_pins = None

def get_pins():
    global _pins
    if _pins is None:
        with open(Path(__file__).parent / "raspberry-pi.json") as f:
            _pins = json.load(f)
    return _pins