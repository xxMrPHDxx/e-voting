$.prototype.serializeJSON = function(){
  return this.serializeArray().reduce((obj, {name, value})=>{
    obj[name] = value;
    return obj;
  }, {});
}