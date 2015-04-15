/**
  A module that can configure an object according to what `@type` it declares
  @module
*/

var protoUtils= require('./proto-utils')

function applyTypes(o, types, typeRepository){
	if(arguments.length < 3){
		typeRepository= types
		types= null
	}
	types= types? typeRepository.iterNames(types): typeRepository.iterObject(o)
	typeRepository= typeRepository|| this.typeRepository|| require('type-repository')

	//var known= require('./proto-utils').descriptors(o)
	var types= o['@types']
	if(types){
		o['@types']= []
	}
	for(var type of types){
		if(types.indexOf(type['@id'])){
			applyType(o, type)
		}
	}
}

function applyType(o, type){
	typeRepository= typeRepository|| this.typeRepository|| require('type-repository')
	//_known = _known || require('./proto-utils').getDescriptors(o)

	for(var proto of protoUtils.reverse(protoUtils.iterPrototypes(type))){
		for(var key of ownKeys(proto)){
			if(key === 'constructor'){
				proto.constructor.call(o)
			}else{
				o[key]= Object.getOwnPropertyDescriptor(proto, key)
			}
		}
		proto.call(o)
	}
}
