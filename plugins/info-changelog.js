let fs = require('fs')
let path = require('path')

// Helper function to format date to dd-mm-yyyy (no longer used but kept for reference)
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

let handler = async (m, { usedPrefix: _p, command, text, args }) => {
  try {
    const changelogFile = path.join(__dirname, '../changelog.json')
    let changelogData = {}

    if (fs.existsSync(changelogFile)) {
      changelogData = JSON.parse(fs.readFileSync(changelogFile, 'utf-8'))
    }

    // Extract the subcommand from args[0]
    let subcommand = args[0]?.toLowerCase()
    let version = args[1]
    let changelogText = args.slice(2).join(' ')

    switch (subcommand) {
      case 'add': {
        if (!version || !changelogText) {
          return m.reply('Please provide both version and changelog description.')
        }
        
        if (!changelogData[version]) {
          changelogData[version] = []
        }
        
        // Reformat existing entries to remove timestamps
        changelogData[version] = changelogData[version].map(log => ({ log: log.log }))
        
        changelogData[version].push({ log: changelogText })
        
        fs.writeFileSync(changelogFile, JSON.stringify(changelogData, null, 2))
        m.reply('Changelog added successfully.')
        break
      }

      case 'del': {
        if (!version || !args[2]) {
          return m.reply('Please provide both version and the number of the changelog to delete.')
        }
        
        let entryNumber = parseInt(args[2]) - 1
        
        if (!changelogData[version] || entryNumber < 0 || entryNumber >= changelogData[version].length) {
          return m.reply('Invalid version or changelog number.')
        }
        
        changelogData[version].splice(entryNumber, 1)
        
        if (changelogData[version].length === 0) {
          delete changelogData[version]
        }
        
        fs.writeFileSync(changelogFile, JSON.stringify(changelogData, null, 2))
        m.reply('Changelog deleted successfully.')
        break
      }

      case 'list': {
        if (version === 'all') {
          let allChangelog = Object.entries(changelogData)
            .map(([version, logs]) => {
              let formattedLogs = logs
                .map((log, index) => `${index + 1}. ${log.log}`)
                .join('\n\n')
              return `Version ${version}:\n${formattedLogs}`
            })
            .join('\n\n')

          if (!allChangelog) allChangelog = 'No changelog found.'
          m.reply(`All Changelogs:\n${allChangelog}`)
        } else {
          if (!version) {
            return m.reply('Please provide the version to list or use "all" to list all changelogs.')
          }

          if (!changelogData[version]) {
            return m.reply('No changelog found for this version.')
          }

          let changelogList = changelogData[version]
            .map((log, index) => `${index + 1}. ${log.log}`)
            .join('\n\n')

          m.reply(`Changelog for version ${version}:\n${changelogList}`)
        }
        break
      }

      default:
        m.reply('Unknown command. Use *add*, *del*, or *list* as a subcommand after `.changelog`.')
    }
  } catch (e) {
    console.error(e)
    m.reply('An error occurred.')
  }
}

handler.help = ['changelog']
handler.tags = ['info']
handler.command = /^changelog$/i

module.exports = handler