module.exports.getDailyIndex = function(arr) {
  let date = new Date(),
      days = date.getTime() / (1000*60*60*24), 
      idx = Math.floor(days) % arr.length;
      
  return idx
}