import app from './server';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});

process.on('uncaughtException', (err) => {
    console.error({ error: { name: err.name, stack: `${err.stack}` } }, "Uncaught Exception - Exit Process with code:1!");
    process.exit(1); // exit application 
});
process.on('unhandledRejection', (err, promise) => {
    console.error({ error: { name: err['name'], stack: `${err['stack']}` } }, "Unhandled promise rejection - Exit Process with code:1!");
    process.exit(1); // exit application 
});