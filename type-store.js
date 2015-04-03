var global= this

/**
  @typedef typeRepository
*/
function typeRepository(){
	if(this === global){
		return new typeRepository
	}
}

/**
  @type {typeRepository}
  @global
*/
exports.defaultTypeRepository= typeRepository()
