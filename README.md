# FSProduct

## installation
go to `server/` and open `.env.example` fill in the details. the database is postgresql. The host is your local IP address in order for react native app to hit request with. then rename the file to `.env`.
run
```bash
npm i
```
then migrate database with
```
npx prisma migrate deploy
```
and seed products
```
npx prisma db seed
```
then run 
```
npm run dev
```

go to `FSProduct` and open `.env` file and replace the value with your HOST ip address. You can also rename `.env.production` to `.env` and delete the old `.env`. then run
```
npm install
npm start
```
You can now open in either your physical device or emulator.
