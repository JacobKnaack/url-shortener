module.exports = {
  SNSClient: jest.fn().mockImplementation(() => {
    return {
      send: jest.fn()
    }
  }),
  PublishCommand: jest.fn()
}