const fs = require('fs')

var giSearch = require('google-image-search');
giSearch('logo google').pipe(fs.createWriteStream('google.jpg'));