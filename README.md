# sm-twitch-alerts

A simple NodeJS daemon to integrate with a sourcemod server, to send alerts for when a Twitch channel goes live.

# Installation

Requirements
----------
 - Node (Written with 6.11.1)  

Installation
----------
```
git clone https://github.com/technoblazed/sm-twitch-alerts.git
cd sm-twitch-alerts
- Modify config as instructed below.
npm install
npm start
```

#### Configuration

An example configuration is provided with the software, however the following are required for this to function correctly. A Twitch Client-ID must be provided in order to access the Twitch API. This can be accessed by visiting
https://twitch.tv/settings/connections and generating a new application.

#### Advice

I suggest using something like [forever](https://github.com/foreverjs/forever) or [pm2](https://github.com/Unitech/pm2) to log, track restarts, and ensure the process stays running.
