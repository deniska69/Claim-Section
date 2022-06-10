const config = require('config')
const fs = require('fs')

class FileController {

    async uploadAttachment(req, res) {
        try {
            const file = req.files.file
            const attachmentName = req.files.file.name
            file.mv(config.get('staticPath') + "\\attachments\\" + attachmentName)
            return res.json({ attachmentName: attachmentName })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Ошибка загрузки вложения.' })
        }
    }
}

module.exports = new FileController()