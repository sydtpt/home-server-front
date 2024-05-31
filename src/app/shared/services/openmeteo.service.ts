import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';


const params = {
  "latitude": 50.8505,
  "longitude": 4.3488,
  "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "rain", "showers", "snowfall", "weather_code", "cloud_cover", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
  "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min", "sunrise", "sunset", "daylight_duration", "sunshine_duration"]
};

@Injectable({
  providedIn: 'root'
})
export class OpenmeteoService {
  private URL = "https://api.open-meteo.com/v1/forecast";
  constructor() { }

  async getForecast() {
    const responses = await fetchWeatherApi(this.URL, params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const daily = response.daily()!;

    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0)!.value(),
        relativeHumidity2m: current.variables(1)!.value(),
        apparentTemperature: current.variables(2)!.value(),
        isDay: current.variables(3)!.value(),
        precipitation: current.variables(4)!.value(),
        rain: current.variables(5)!.value(),
        showers: current.variables(6)!.value(),
        snowfall: current.variables(7)!.value(),
        weatherCode: current.variables(8)!.value(),
        cloudCover: current.variables(9)!.value(),
        windSpeed10m: current.variables(10)!.value(),
        windDirection10m: current.variables(11)!.value(),
        windGusts10m: current.variables(12)!.value(),
      },
      daily: {
        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        weatherCode: daily.variables(0)!.valuesArray()!,
        temperature2mMax: daily.variables(1)!.valuesArray()!,
        temperature2mMin: daily.variables(2)!.valuesArray()!,
        apparentTemperatureMax: daily.variables(3)!.valuesArray()!,
        apparentTemperatureMin: daily.variables(4)!.valuesArray()!,
        sunrise: daily.variables(5)!.valuesArray()!,
        sunset: daily.variables(6)!.valuesArray()!,
        daylightDuration: daily.variables(7)!.valuesArray()!,
        sunshineDuration: daily.variables(8)!.valuesArray()!,
      },
    }
    return weatherData;
  }
}
