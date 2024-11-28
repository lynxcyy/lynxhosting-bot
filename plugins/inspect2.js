const { getUrlFromDirectPath } = require('@whiskeysockets/baileys');
const _ = require('lodash');

let handler = async (m, { conn, text }) => {
  try {
    let groupData = text ? null : await conn.groupMetadata(m.chat);

    const getCaption = (data, type) => {
      if (!data) return "";
      let caption = `*${type} Link Inspector*\n- ${data.id || ""}\n*Judul:* ${data.subject || ""}\n*Dibuat* oleh @${data.owner?.split("@")[0] || ""} pada *${formatDate(1e3 * data.creation) || ""}*`;
      if (data.subjectOwner) caption += `\n*Judul diubah* oleh @${data.subjectOwner?.split("@")[0]} pada *${formatDate(1e3 * data.subjectTime)}*`;
      if (data.descOwner) caption += `\n*Deskripsi diubah* oleh @${data.descOwner?.split("@")[0]} pada *${formatDate(1e3 * data.descTime)}*`;
      caption += `\n*Jumlah Member:* ${data.size || ""}\n*Member teratas:* ${data.participants ? "\n" + data.participants.slice(0, 5).map((user, i) => `${i + 1}. @${user.id?.split("@")[0]}${user.admin === "superadmin" ? " (superadmin)" : user.admin === "admin" ? " (admin)" : ""}`).join("\n").trim() : "Tidak ada"}${data.participants?.length > 5 ? `\nDan ${data.participants?.length - 5} member lainnya.` : ""}\n${data.desc ? `*Deskripsi:*\n${data.desc}` : "*Tidak ada Deskripsi*"}\n\n*Detail Lengkap Grup*\n\n*Restrict:* ${data.restrict ? "Ya" : "Tidak"}\n*Announce:* ${data.announce ? "Ya" : "Tidak"}\n*Is Community:* ${data.isCommunity ? "Ya" : "Tidak"}\n*Is Community Announce:* ${data.isCommunityAnnounce ? "Ya" : "Tidak"}\n*Join Approval Mode:* ${data.joinApprovalMode ? "Ya" : "Tidak"}\n*Member Add Mode:* ${data.memberAddMode ? "Ya" : "Tidak"}\n*Ephemeral Duration:* ${data.ephemeralDuration !== undefined ? data.ephemeralDuration + " detik" : "Tidak diketahui"}`;

      return caption.trim();
    };

    const sendMessageWithImage = async (chat, data, type) => {
      let pp;
      try {
        pp = await conn.profilePictureUrl(data?.id);
      } catch {
        pp = thumb;
      }
      if (pp) {
        await conn.sendMessage(chat, {
          image: { url: pp },
          caption: getCaption(data, type),
          contextInfo: { mentionedJid: conn.parseMention(getCaption(data, type)) }
        }, { quoted: m });
      }
    };

    if (groupData) {
      await sendMessageWithImage(m.chat, groupData, "Group");
    } else {
      const inviteUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:invite\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1];
      const channelUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:channel\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1];

      if (inviteUrl) {
        let inviteInfo = await conn.groupGetInviteInfo(inviteUrl);
        if (!inviteInfo) throw "Group tidak ditemukan.";
        await sendMessageWithImage(m.chat, inviteInfo, "Group");
      } else if (channelUrl) {
        let newsletterInfo = await conn.newsletterMetadata("invite", channelUrl);
        if (!newsletterInfo) throw "Newsletter tidak ditemukan.";
        
        let caption = "*Newsletter Link Inspector*\n";
        const formatValue = (key, value) => {
          switch (key) {
            case "subscribers_count":
              return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Tidak ada";
            case "creation_time":
            case "nameTime":
            case "descriptionTime":
              return formatDate(value);
            case "description":
            case "name":
              return value ? value.text : "Tidak ada";
            default:
              return value !== null && value !== undefined ? value.toString() : "Tidak ada";
          }
        };
        
        const processObject = (obj, prefix = "") => {
          Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (typeof value === "object" && value !== null) {
              if (Object.keys(value).length > 0) {
                const sectionName = _.startCase(prefix + key.replace(/_/g, " "));
                caption += `\n*\`${sectionName}\`*\n`;
                processObject(value, `${prefix}${key}_`);
              }
            } else {
              const shortKey = prefix ? prefix.split("_").pop() + "_" + key : key;
              const displayValue = formatValue(shortKey, value);
              caption += `- *${_.startCase(shortKey.replace(/_/g, " "))}:* ${displayValue}\n`;
            }
          });
        };
        
        processObject(newsletterInfo);
        caption = caption.trim();

        let pp;
        try {
          pp = getUrlFromDirectPath(newsletterInfo?.thread_metadata.preview.direct_path);
        } catch {
          pp = thumb;
        }
        if (pp) {
          await conn.sendMessage(m.chat, {
            image: { url: pp },
            caption: caption,
            contextInfo: { mentionedJid: conn.parseMention(caption) }
          }, { quoted: m });
        }
      }
    }
  } catch (e) {
    console.error(e);
    await m.reply(e);
  }
};

handler.help = ["inspect"];
handler.tags = ["tools"];
handler.command = /^(inspect)$/i;

module.exports = handler;

function formatDate(n, locale = "id", includeTime = true) {
  const date = new Date(n);
  if (isNaN(date)) throw new Error("Tanggal tidak valid");
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...includeTime && {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    }
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
}