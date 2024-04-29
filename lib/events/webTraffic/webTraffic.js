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

async function webTraffic(request) {
  let params = {
    TopicArn: 'arn:aws:sns:us-west-2:275199309843:traffic',
    Message: request.user_agent,
    MessageAttributes: {
      "referrer": attributeCreator('String', request.referrer),
      "ip_address": attributeCreator('String', request.ip_address),
      "response_code": attributeCreator('String', request.response_code),
      "request_method": attributeCreator('String', request.request_method),
      "timestamp": attributeCreator('String', request.timestamp),
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