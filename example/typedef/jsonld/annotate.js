/**
  @param oa:Selector selector - selector within post
  @param oa:hasBody body - content of the annotation
  @returns oa:Annotation - annotation on blog post
*/
module.exports= function(selector, body){
	if (typeof(body) === 'string') {
		body = {
			'@type': ['oa:EmbeddedContent', 'dctypes:Text']
			'value': body,
			'format': 'text/plain'
		}
	}

	return {
		// '@id': '', // implicitly formed
		'@type': 'oa:Annotation', // redundant if already specified, strike
		'body': body,
		'target': {
			//'@id': 'http://yoyodyne.net/target1', // computed value derived from base @id
			'@type': 'oa:SpecificResource',
			'source': this['@id'],
			'selector': selector
		}
	}
}
module.exports['@type'] = 'http://www.w3.org/ns/oa#'
