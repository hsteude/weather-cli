import { getWeather } from '@hsteude/weather-client-js';

console.log('Fetching weather for Frankfurt...\n');
try {
  const weather = await getWeather('Frankfurt');
  console.log(`\n${weather.city}\nTemperature: ${weather.temperature}°C\nConditions: ${weather.condition}`);
  console.log('\nWeather information retrieved successfully.');
} catch (error) {
  console.error(`Weather lookup failed: ${error.message}`);
  process.exitCode = 1;
}
