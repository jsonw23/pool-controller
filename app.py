from gpiozero import LED, BadPinFactory

try:
    led = LED(5)

    led.on()
    led.off()
except BadPinFactory as e:
    print(f"{e} Use GPIOZERO_PIN_FACTORY=mock to mock the GPIO pins.")