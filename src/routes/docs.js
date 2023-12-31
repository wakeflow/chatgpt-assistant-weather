import { errorCatcher } from "../middleware/errorCatcher.js"

export const docs = errorCatcher(async(req,res) => {
  res.send({
    "name": `getWeather`,
    "example": `Show me current weather of London`,
    "description": `returns the weather data of the location the user asked for`,
    "parameters": {
      "type": `object`,
      "properties": {
        "location_type": {
          "type": `string`,
          "enum": [`city`,`postal_code`,`coordinates`],
          "description": `Parameter name to use for location`,
        },
        "location": {
          "type": `string`,
          "description": `location for which the weather is requested. Use lat,long format for coordinates.`,
        },
        "days": {
          "type": `integer`,
          "minimum": 1,
          "exclusiveMaximum": 7,
          "description": `No of days the weather forecast is required.`,
        },
      },
    },
  })
})