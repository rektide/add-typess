/**
  Create a context for a typedef
*/

/**
  @param fileMap - A hash of filenames -> modules
*/
function makeContext(fileMap, ns){
	var ctx= {},
	  termPrefix= ns+ ":"
	for(var name in fileMap){
		var mod= fileMap[i]
		if(name === 'index'){
			ctx[ns]= mod['@id']
		}else{
			ctx[termPrefix+name]= mod
		}
	}
	return ctx
}

module.exports= makeContext
exports= module.exports
