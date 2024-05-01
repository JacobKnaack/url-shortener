require('dotenv').config();
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

// Set up AWS credentials and region
const configuration = {
  region: process.env.AWS_REGION || 'us-west-2',
}
if (process.env.AWS_ACCESS_KEY && process.env.AWS_ACCESS_SECRET) {
  configuration.accessKeyId = process.env.AWS_ACCESS_KEY;
  configuration.secretAccessKey = process.env.AWS_ACCESS_SECRET
}

const snsClient = new SNSClient(configuration);

const attributeCreator = (type, value) => {
  return {
    DataType: type,
    [`${type}Value`]: value,
  }
}

async function webTraffic(notification) {
  let params = {
    TopicArn: 'arn:aws:sns:us-west-2:275199309843:traffic',
    Message: notification.user_agent,
    MessageAttributes: {
      "link_encoding": attributeCreator('String', notification.encoding),
      "referrer": attributeCreator('String', notification.referrer),
      "ip_address": attributeCreator('String', notification.ip_address),
      "response_code": attributeCreator('String', notification.response_code),
      "request_method": attributeCreator('String', notification.request_method),
      "timestamp": attributeCreator('String', notification.timestamp),
    }
  }

  try {
    let results = await snsClient.send(new PublishCommand(params));
    return results;
  } catch (e) {
    console.error('Unable to send notification', e);
    Promise.reject(e);
  }
}

module.exports = webTraffic;