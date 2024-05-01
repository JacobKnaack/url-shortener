const webTraffic = require('./index.js');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

describe('Web Traffic event notification', () => {
  test('Should send a notification if all request details are present', () => {
    let requestData = {
      user_agent: 'test',
      ip_address: 'test',
      referrer: 'test',
      response_code: 'test',
      request_method: 'test',
      timestamp: 'test',
      encoding: "test"
    }
    let expectedProperties = ['TopicArn', 'Message', 'MessageAttributes'];

    webTraffic(requestData);
    
    expect(SNSClient).toHaveBeenCalled();
    expect(PublishCommand).toHaveBeenCalledWith(expect.objectContaining(
      expectedProperties.reduce((acc, prop) => ({ ...acc, [prop]: expect.anything() }), {})
    ));
  });
});