/**
  A module that can configure an object from just knowing what `@types` it has
  @module
*/


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


/**
  @type {jsonld:id}
  @global
*/
exports.idField= '@id'

/**
  Add a type into the repository
  @param {prototype} proto - a prototype for a type
  @param {Function} proto.constructor - optional .constructor field
  @param {typeRepository} [typeRepository=exports.defaultTypeRepository] - a collection of known types to add into
*/
function learnType(proto, typeRepository){
	var id= fn[exports.idField]
	if(typeof id !== 'string'){
		throw new TypeError('no proto-type.id to learn')
	}
	_learn(null, id, fn, typeRepository)
}

/**
  Add an alias for a type-id to mean something else
  @param {string} id - id to register
  @param {string} pointsTo - what type to point to
  @param {typeRepository} [typeRepository=exports.defaultTypeRepository]
*/
function learnAlias(id, pointsTo, typeRepository){
	if(typeof id !== 'string'){
		throw new TypeError('no id to alias from')
	}
	if(typeof pointsTo !== 'string'){
		throw new TypeError('no pointer to target')
	}
	_learn(null, id, pointsTo, typeRepository)
}

/**
  @protected
*/
function _learn(blank, id, thing, typeRepository){
	if(blank){
		throw new Error()
	}
	if(!id) {
		throw new Error('Need an id')
	}

	var repo= typeRepository|| exports.defaultTypeRepository,
	  theseTypes= repo[id]

	if(theseTypes && theseTypes instanceof Array){
		theseTypes.push(thing)
	}else if(theseTypes){
		repo[id]= [theseTypes, thing]
	}else{
		repo[id]
	}
}
