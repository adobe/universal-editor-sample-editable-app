const token = "admin:admin";
console.log(token.includes(':') ? "Basic " + Buffer.from(token).toString('base64') : "Bearer " + token);
