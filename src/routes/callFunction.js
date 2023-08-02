import { errorCatcher } from "../middleware/errorCatcher.js"
import axios from "axios"

export const callFunction = errorCatcher(
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async(req,res) => {
    const { postal_code } = req.body
    const apiKey = process.env.WEATHER_BIT_KEY
    const url = process.env.WEATHER_BIT_URL
    try{
      const resp = await axios.get(`${url}?key=${apiKey}&postal_code=${postal_code}`)
      const [data] = resp.data.data
      if(!data.temp || !data.city_name)
        res.send({ success: false })
      else
        res.send({
          success: true,
          data: {
            city: data.city_name,
            status: data.weather.description,
            unit: `Celsius`,
            temp: data.temp,
            feels_like: data.app_temp,
            air_quality: data.aqi,
            precipitation: data.precip,
            snowfall: data.snow,
            wind_dir: data.wind_cdir,
            wind_speed: data.wind_spd,
            visibility: data.vis,
          },
        })
    } catch(err){
      res.statusCode = 400
      res.send({ success: false,message: err.message })
    }
  })