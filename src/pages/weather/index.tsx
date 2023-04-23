import { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";
import { Box, Button, Grid, Input, Stack, Typography } from "@mui/material";
import WeatherButton from "../../components/weatherButton.component";
import { Links } from "../../constants";
import { IOpenWeatherMapResponse } from "../../interfaces";

const Weather = () => {
  const [cityName, setCityName] = useState<string>("");
  const [weatherData, setWeatherData] =
    useState<IOpenWeatherMapResponse | null>();
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);

  // pobieranie pogodny w zależności od wprowadzonego miasta
  async function getWheather() {
    setWeatherData(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=aa99f227ed4bdf24634b52e517efdcee&units=metric`
      );
      const data = await res.json();
      if (data?.cod === "404") throw data;
      setWeatherData(data);
    } catch (err) {
      console.log(err);
    }
  }

  // sprawdzanie dostępu do geolokalizacji i wczytanie miasta z api jeśli jest dostęp
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=aa99f227ed4bdf24634b52e517efdcee&units=metric`
          )
            .then((response) => response.json())
            .then((data) => setWeatherData(data))
            .catch((error) => console.log(error))
            .finally(() => setIsLoadingLocation(false));
        },
        (error) => {
          console.log(error);
          setIsLoadingLocation(false);
        }
      );
    }
  }, []);

  return (
    <Grid
      display={"flex"}
      alignContent={"center"}
      justifyContent={"center"}
      style={{
        height: "100vh",
        backgroundImage: `url('https://images.pexels.com/photos/681336/pexels-photo-681336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        backgroundSize: "cover",
      }}
      container
    >
      <Stack
        sx={{
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: 2,
          borderRadius: 3,
        }}
        width={{ xs: "90vw", md: "75vw", lg: "50vw" }}
        spacing={2}
      >
        <Typography variant="h4">Check weather in city</Typography>

        <Input
          placeholder="Write your city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <Stack direction={"row"} spacing={2} pb={4}>
          <Button
            variant="contained"
            disabled={cityName === ""}
            onClick={() => getWheather()}
          >
            Weather
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setCityName("");
              setWeatherData(null);
            }}
          >
            Clean
          </Button>
        </Stack>
        {weatherData && Object.keys(weatherData).length !== 0 ? (
          <Stack spacing={2} alignItems={"center"}>
            <Typography variant="h4">
              Current weather in {weatherData.name}
            </Typography>
            <Typography variant="h6">
              Temperature: {weatherData.main.temp}°C
            </Typography>
            <Typography variant="h6">
              Humidity: {weatherData.main.humidity}%{" "}
            </Typography>
            <Typography variant="h6">
              Wind speed: {weatherData.wind.speed} m/s{" "}
            </Typography>
          </Stack>
        ) : isLoadingLocation ? (
          <Typography>
            Wait a second, we are loading you current location.
          </Typography>
        ) : (
          <Box>The city has not been entered or its name is invalid.</Box>
        )}
        <Stack
          pt={10}
          direction={"row"}
          width="100%"
          justifyContent="space-between"
        >
          <WeatherButton link={Links.STARTING_PAGE} text={"Home page"} />
          <WeatherButton link={Links.ACTIVITY} text={"Activities"} />
        </Stack>
      </Stack>
    </Grid>
  );
};

export default Weather;
