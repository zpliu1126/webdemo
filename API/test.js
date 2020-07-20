var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty') //处理上传的文件
var fs = require('fs')
var tmp = require('tmp')
var multipartMiddleware = multipart()
var callfile = require('child_process')
var parseBlastText = require('./parseBlastText.js')
router.post('/test', multipartMiddleware, function (req, rep) {
  // tmpFilePath = req.files.fastafile.path
  // console.log(req.files)
  // var fasta = fs.readFileSync(tmpFilePath, 'utf-8')
  var queryFile = tmp.fileSync()
  var BlastOutFile = tmp.fileSync()
  console.log(req.body)
  console.log(BlastOutFile.name)
  console.log(queryFile.name)
  fs.writeFileSync(queryFile.name, req.body.sequence, 'utf-8')
  callfile.execFile(
    '/var/www/html/webdemo/API/blast.sh',
    [
      queryFile.name,
      BlastOutFile.name,
      req.body.blastType,
      req.body.database,
      req.body.evalue
    ],
    (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        rep.send('error')
        return
      }
      BlastText = fs.readFileSync(BlastOutFile.name, 'utf-8')
      BlastJson = parseBlastText(BlastText)
      BlastOutFile.removeCallback()
      queryFile.removeCallback()
      rep.send(BlastJson)
    }
  )
})
router.get('/blast/database', function (req, rep) {
  rep.json({
    protein: [
      {
        label: 'Gh',
        key: 'dsaddsa'
      }
    ],
    nucle: [
      {
        label: 'Gb',
        key: 'dsaddsa1'
      }
    ]
  })
})

module.exports = router
