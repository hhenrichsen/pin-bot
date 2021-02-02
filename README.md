# pin-bot

## Inviting
Invite my copy of the bot to your server by clicking 
[this link](https://discord.com/oauth2/authorize?client_id=806249847773462619&scope=bot&permissions=8192).

## Running it Yourself

### Using pm2 (Recommended)
1. Install node.js >12.
2. Install pm2. On Windows, run `npm install --global pm2 pm2-windows-service`. 
On any other operating system run `npm install pm2`. 
3. Clone this repo.
4. In this repo's directory, run `npm install`.
5. Run `pm2 start index.js --name "pinbot" --watch`
6. Run `pm2 save` to run the bot on startup.
7. Run `pm2 monit` to view logs. Run `pm2 delete pinbot` to stop the bot.

### Using Node
1. Install node.js >12.
2. Clone this repo.
3. In this repo's directory, run `npm install`.
4. Run `node index.js`
5. Use `Ctrl + C` to stop the process. Use screen, tmux, or some other option 
to keep it running in the background.

## Contributing
I'm open to contributions. Please follow the code style, and open an issue 
before writing code or opening a pull request.