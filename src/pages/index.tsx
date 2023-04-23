import { Box, Grid, Stack, Typography } from "@mui/material";
import WeatherButton from "../components/weatherButton.component";
import { Links } from "../constants";

export default function Home() {
  return (
    <Grid
      display={"flex"}
      alignContent={"center"}
      justifyContent={"center"}
      style={{
        height: "100vh",
        backgroundImage: `url('https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        backgroundSize: "cover",
      }}
      container
    >
      <Box
        sx={{
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: 2,
          borderRadius: 3,
        }}
      >
        <Stack
          direction={"row"}
          width={{ xs: "90vw", md: "75vw", lg: "50vw" }}
          spacing={2}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            sx={{
              width: "50%",
            }}
          >
            <Typography variant={"h6"} paddingBottom={3}>
              Weather in your city
            </Typography>
            <WeatherButton link={Links.WEATHER} />
          </Box>
          <Box
            sx={{ width: "50%" }}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography variant={"h6"} paddingBottom={3}>
              Activities in your city
            </Typography>
            <WeatherButton link={Links.ACTIVITY} />
          </Box>
        </Stack>
      </Box>
    </Grid>
  );
}
