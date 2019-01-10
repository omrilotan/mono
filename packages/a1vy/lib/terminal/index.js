/**
* Resets the terimnal scroll state, without clearing history.
*/
module.exports = {
   clear: () => {
       process.stdout.write('\033c');
   }
};
