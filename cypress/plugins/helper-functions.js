import fs from 'fs'

module.exports = {
    list_downloaded_files(download_folder) {
        return fs.readdirSync(download_folder)
    },
}
