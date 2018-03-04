// 单独处理 app.js 下的 debug 内容
fis.media('production').match('tools.js', {
  parser: fis.plugin('jdists', {
    remove: "debug"
  })
});

// fis.match('*.scss', {
//   rExt: '.css',
//   parser: fis.plugin('node-sass', {
//     // options...
//   })
// });

//发布的时候忽略以下目录或文件
fis.set('project.ignore', [
  'node_modules/**',
  // 'components/**',
  '.git/**',
  '.idea/**',
  'package.json',
  'package-lock.json',
  'yarn.lock',
  'README.md',
  'script/**',
  'fis-conf.js',
  'dist/**'
]);
