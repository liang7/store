const fs = require('fs')
const path = require('path')
const folderPath = path.join(__dirname, './') // 文件夹路径
const folderName = folderPath.substr(folderPath.lastIndexOf('\\')+1) // 文件夹名称
const minSize = 0 // 要显示的最小的文件(kb)
const fileName = 'size.txt' // 生产的文件名称
let extname = ['jpg','png','js'] //遍历指定拓展名的文件

// 遍历所有文件夹，获取文件信息 
function geFileList(filePath) {
  let filesList = []
  try {
    readFile(filePath, filesList)
  } catch (error) {
    throw new Error(error)
  }
  // 文件大小排序
  return filesList.sort((a, b) => {
    return b.size - a.size
  })
}

//遍历读取文件 
function readFile(filePath, filesList) {
  let files = fs.readdirSync(filePath) //需要用到同步读取
  files.forEach(file => {
    let states = fs.statSync(filePath + '/' + file)
    // 文件夹
    if (states.isDirectory()) {
      readFile(filePath + '/' + file, filesList)
      return
    }
    // 后缀名
    let ext = path.extname(file).toLowerCase()
    // 过滤后缀名
    if (extname && (!ext || extname.indexOf(ext+'.') === -1)) return

    filesList.push({
      name: file, //文件名
      size: states.size, //文件大小，以字节为单位
      path: filePath + '/' + file //文件绝对路径
    })
  })
}

// 过滤数组
function filerList(list) {
  let data = '',
    count = 0
  for (let item of list) {
    let size = (item.size / 1024).toFixed(2)
    if (minSize && size < minSize) break;
    count++
    data += `size: ${size}/kb  path: ${folderName + item.path.replace(folderPath, '')} \n`
  }
  let totalStr = `文件路径：${folderPath}\n文件总数量：${list.length}\n`
  let minStr = minSize ?`>=${minSize}/kb文件数量：${count}\n`: ''
  return totalStr + minStr + data
}

// 写入文件utf-8格式
function writeFile(data) {
  fs.writeFile(fileName, data, 'utf-8', () => console.log(`生成${fileName}`))
}

(() => {

  extname = extname.map(item => {
    return `.${item.toLowerCase()}`
  }).join('') + '.'

  const filesList = geFileList(folderPath)
  // 过滤数组
  const filerData = filerList(filesList)
  // 写入文件
  writeFile(filerData)

})()
