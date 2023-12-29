class Server {
  constructor(app, PORT = process.env.PORT) {
    this.app = app;
    this.port = PORT;
  }

  start(PORT) {
    this.app.listen(PORT, () => {
      console.log('Express Server Running on PORT :: ', PORT);
    });
  }
}

module.exports = Server;