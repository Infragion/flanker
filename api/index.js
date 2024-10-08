const express = require("express");
const path = require("path");

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')))

app.get("/LICENSE", async function(req, res){
  try {
    res.set('Content-type', 'text/plain');
    res.status(200).send(
      `MIT License\n\nCopyright (c) ${new Date().getFullYear()} Egor Chernov\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.
    `);
  }
  catch {
    res.status(500).json( {code: 500, message: "Internal Server Error"} );
  }
});

app.get("/data/:userid?", async function(req, res){
  const userid = req.params['userid'];
  if (!userid) {
    res.json({ error: 400 });
  }
  else {
    res.json({ userid });
  }
});

/*
  ! The asterisk route should be always at the bottom of all the routes 
  * the asterisk route is a 404 page route
*/

app.get("*", async function(req, res){
  res.status(404).json( {code: 404, message: "Not Found"} ); /* this is 404 route if you dum */
});

app.listen(1337, () => console.log("Server ready on port 1337."));

module.exports = app;
