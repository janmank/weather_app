import { Grid, Stack, Typography, Input, Button, Box } from "@mui/material";
import { useState } from "react";
import WeatherButton from "../../components/weatherButton.component";
import { Links } from "../../constants";

const ActivityPage = () => {
  const [city, setCity] = useState<string>("");
  const [activity, setActivity] = useState<string>("");

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleGetActivityClick = async () => {
    try {
      // pobieranie danych pogodowych dla wprowadzonego miasta
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa99f227ed4bdf24634b52e517efdcee`
      );
      const weatherData = await weatherResponse.json();
      const {
        weather,
        main: { temp },
      } = weatherData;
      const weatherCondition = weather[0].main;

      // określenie typu aktywności na podstawie pogody
      let activityType;
      if (
        weatherCondition.includes("rain") ||
        weatherCondition.includes("drizzle") ||
        weatherCondition.includes("storm")
      ) {
        activityType = "relaxation";
      } else if (temp >= 20) {
        activityType = "recreational";
      } else if (temp < 20 && temp > 0) {
        activityType = "education";
      } else {
        activityType = "diy";
      }

      // pobieranie losowej aktywności dla określonego typu aktywności
      const activityResponse = await fetch(
        `https://www.boredapi.com/api/activity?type=${activityType}`
      );
      const activityData = await activityResponse.json();
      const { activity } = activityData;

      setActivity(activity);
    } catch (error) {
      console.error(error);
    }
  };

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
        width={{ xs: "90vw", md: "75vw", lg: "65vw" }}
        spacing={2}
      >
        <Typography variant="h4">
          Find a random activity based on weather and city
        </Typography>
        <Input
          placeholder="Write your city"
          value={city}
          onChange={handleCityChange}
        />
        <Stack direction={"row"} spacing={2} pb={4}>
          <Button
            variant="contained"
            disabled={city === ""}
            onClick={handleGetActivityClick}
          >
            Activity
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setCity("");
              setActivity("");
            }}
          >
            Clean
          </Button>
        </Stack>
        {activity ? (
          <Stack spacing={2} alignItems={"center"}>
            <Typography variant="h4">Your random activity:</Typography>
            <Typography variant="h6">{activity}</Typography>
          </Stack>
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
          <WeatherButton link={Links.WEATHER} text={"Weather"} />
        </Stack>
      </Stack>
    </Grid>
  );
};

export default ActivityPage;
