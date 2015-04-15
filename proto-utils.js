var base= [
	Object.prototype,
	Array.prototype,
	Function.prototype,
	String.prototype,
	Number.prototype
]

exports.ownKeys= function*ownKeys(o){
	yield* Object.getOwnPropertyNames(o)
	yield* Object.getOwnPropertySymbols(o)
}

exports.ownDescriptors= function*ownDescriptors(o){
	for(var key of ownKeys(o)){
		yield Object.getOwnPropertyDescriptor(o, key)
	}
}

/**
  @param o - object to recurse through
  @param [fn] - 
*/
exports.iterPrototypes= function*iterPrototypes(o, fn){
	var proto= o
	while(proto && base.indexOf(proto) !== -1){
		if(fn){
			var computed= fn(proto)
			if(computed && computed[Symbol.iterator]){
				yield* computed
			}else if(computed !== undefined){
				yield computed
			}
		}else{
			yield o
		}
		proto= proto.__proto__
	}
}

exports.reverse= function*reverse(g){
	var hold= []
	for(var i of g){
		hold.push(i)
	}
	for(var i= hold.length- 1; i >= 0; --i){
		yield hold[i]
	}
}

exports.descriptors= function descriptors(o){
	var result= {}
	for(var proto of reverse(iterPrototypes(o))){
		for(var key of ownKeys(proto)){
			result[key]= Object.getOwnPropertyDescriptor(proto, key)
		}
	}
	return results
}
