# Checkpoint-Generator for all Turtlecoin forks

This NodeJS utility generates the current checkpoints.csv file from a daemon and saves it to an `.csv` file.

## Requirements
- [turtlecoin-rpc](https://github.com/brandonlehmann/turtlecoin-rpc)

## Setup

Open up a terminal and execute the following:

```bash
git clone https://github.com/Ionize-Project/Checkpoint-Generator
cd Checkpoint-Generator
npm install
npm start
```

Then it will fetch all block hashes and save it into checkpoints.csv.

## Forking

Forking is very easy. Open up `checkpoints_generator.js` and edit the `scanEver`, `host` and `port` value.