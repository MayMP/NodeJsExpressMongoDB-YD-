const checkJson = function checkJson(requiredArr, json){
  var missingValue = [], correctValue = [];

  for( var attributeName in json ){
    if( json[attributeName] === null || json[attributeName] === undefined || json[attributeName] === "" ){
      if( requiredArr.indexOf(attributeName) > -1 ){
        missingValue.push(attributeName);
      }
    }else{
      if( requiredArr.indexOf(attributeName) > -1 ){
        let Arr = [];
        Arr.push(attributeName);
        correctValue = [...new Set([...correctValue, ...Arr])];
      }
    }
  }

  let totalLength = parseInt(missingValue.length + correctValue.length);

  if( requiredArr.length > totalLength ){
    let totalArray = missingValue.concat(correctValue);
    let unique     = requiredArr.filter( o => totalArray.indexOf(o) === -1 );
    missingValue   = [...new Set([...missingValue, ...unique])];
  }

  return missingValue;
}

const emailValidation = function emailValidation(email){
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const returnResult = function returnResult(success, message, data){
  if( success === true ){
    var result = {
      success: success,
      message: message,
      data: data
    }
  }else{
    var result = {
      success: success,
      message: message,
      reason: data
    }
  }
  return result;
}

/** 
 * Defind all exports function here
 */
module.exports = {
  checkJson: checkJson,
  emailValidation: emailValidation,
  returnResult: returnResult
}