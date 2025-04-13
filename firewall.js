const process = require('node:process');
var fw = require('firewall');


var opts = { bin: __dirname+"fileShare.exe", desc: 'fileShare' };
fw.add_rule(opts, function (err, out) {
  if (!err) console.log('Successfully added.');
})



process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
  var opts = { bin: __dirname+"fileShare.exe", desc: 'fileShare' };
  fw.remove_rule(opts, function (err, out) {
    if (!err) console.log('Successfully removed.');
  })
});
