'use strict'
const SendBird = require("sendbird");

const appId = '7E74714F-262C-47D3-9772-71F5EBC61D18';
const masterApiToken = '542cd3465c8f5d4c6b7529b91c624d2cfa004b78';
const userId = 'u123'


async function main() {
    let res;
    try {
        const sb = new SendBird({ appId });

        //--------------------------------------------
        // connect
        //--------------------------------------------
        const user = await sb.connect(
            userId,
            "http://localtest.me:9800/api",
            "ws://localtest.me:9700");
        console.log('user', user);

        //--------------------------------------------
        // createChannel
        //--------------------------------------------
        const openChannel = await sb.OpenChannel.createChannel();
        console.log('createChannel', openChannel);

        //--------------------------------------------
        // getChannel
        //--------------------------------------------
        const channelUrl = openChannel.url;
        const channel = await sb.OpenChannel.getChannel(channelUrl)
        console.log('getChannel', channel);

        //--------------------------------------------
        // enter
        //--------------------------------------------
        await channel.enter();
        console.log('enter');

        //--------------------------------------------
        // sendUserMessage
        //--------------------------------------------
        const params = new sb.UserMessageParams();
        params.message = 'TEXT_MESSAGE';
        params.data = 'DATA';
        params.customType = 'CUSTOM_TYPE';
        res = channel.sendUserMessage(params, (message, error) => {
            console.log('sendUserMessageCB', { message, error });
        });
        console.log('sendUserMessage', res);
    }
    catch (e) {
        console.log('e', e)

    }
}


main()
