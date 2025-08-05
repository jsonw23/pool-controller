import { render, screen, waitFor } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { GpioPinsDocument } from '../generated/graphql'
import Pins from "./Pins";

const mocks = [
    {
        request: {
            query: GpioPinsDocument,
        },
        result: {
            data: {
                gpioPins: [
                    {
                        "number": 0,
                        "physicalPin": 27,
                        "reservedFor": "EEPROM SDA",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 1,
                        "physicalPin": 28,
                        "reservedFor": "EEPROM SCL",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 2,
                        "physicalPin": 3,
                        "reservedFor": "I2C1 SDA",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 3,
                        "physicalPin": 5,
                        "reservedFor": "I2C1 SCL",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 4,
                        "physicalPin": 7,
                        "reservedFor": null,
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 5,
                        "physicalPin": 29,
                        "reservedFor": null,
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 6,
                        "physicalPin": 31,
                        "reservedFor": null,
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 7,
                        "physicalPin": 26,
                        "reservedFor": "SPI0 CE1",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 8,
                        "physicalPin": 24,
                        "reservedFor": "SPI0 CE0",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 9,
                        "physicalPin": 21,
                        "reservedFor": "SPI0 MISO",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 10,
                        "physicalPin": 19,
                        "reservedFor": "SPI0 MOSI",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 11,
                        "physicalPin": 23,
                        "reservedFor": "SPI0 SCLK",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 12,
                        "physicalPin": 32,
                        "reservedFor": null,
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 13,
                        "physicalPin": 33,
                        "reservedFor": null,
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 14,
                        "physicalPin": 8,
                        "reservedFor": "UART TX",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 15,
                        "physicalPin": 10,
                        "reservedFor": "UART RX",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 16,
                        "physicalPin": 36,
                        "reservedFor": null,
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 17,
                        "physicalPin": 11,
                        "reservedFor": null,
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 18,
                        "physicalPin": 12,
                        "reservedFor": "PCM CLK",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 19,
                        "physicalPin": 35,
                        "reservedFor": "PCM FS",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 20,
                        "physicalPin": 38,
                        "reservedFor": "PCM DIN",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 21,
                        "physicalPin": 40,
                        "reservedFor": "PCM DOUT",
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 22,
                        "physicalPin": 15,
                        "reservedFor": null,
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 23,
                        "physicalPin": 16,
                        "reservedFor": null,
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 24,
                        "physicalPin": 18,
                        "reservedFor": null,
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 25,
                        "physicalPin": 22,
                        "reservedFor": null,
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 26,
                        "physicalPin": 37,
                        "reservedFor": null,
                        "__typename": "GPIOPin"
                    },
                    {
                        "number": 27,
                        "physicalPin": 13,
                        "reservedFor": null,
                        "__typename": "GPIOPin"
                    }
                ]
            }
        }
    }
]

test('renders gpio pins', async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Pins />
        </MockedProvider>
    )

    expect(screen.getByText(/Loading/i)).toBeInTheDocument()

    await waitFor(() => {
        expect(screen.getByText('GPIO 23')).toBeInTheDocument()
    })
})