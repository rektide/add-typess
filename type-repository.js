var global= this

/**
  @typedef typeRepository
*/
function typeRepository(){
	if(this === global){
		return new typeRepository()
	}
}

typeRepository.prototype.iterName= function*(type){
	var types= this[type]
	if(!types){
		throw new Error('no types declared')
	}
	if (types instanceof Array){
		for(var t of types){
			if(typeof t === 'string'){
				// alias
				yield* this.iterName(t)
			}else{
				yield t
			}
		}
	}else{
		if(typeof types === 'string'){
			yield* this.iterName(types)
		}else{
			yield types
		}
	}
}

typeRepository.prototype.iterNames= function*(names){
	for(var name of names){
		yield* this.iterName(name)
	}
}

typeRepository.prototype.iterObject= function*(o){
	var type= o&& o['@type']
	yield* this.iterNames(type)
}

/**
  @type {typeRepository}
  @global
*/
exports.defaultTypeRepository= typeRepository()
