/*
 * All utility functions goes here
 */

const doubleParseString = (serializedJsonString: string) => {
	console.log('input json', serializedJsonString);
	const stringifiedJson = JSON.parse(serializedJsonString);
	console.log('stringifiedJson', stringifiedJson);
	const parsedJson = JSON.parse(stringifiedJson);
	console.log('parsed JSON', parsedJson);
	return parsedJson;
};

export { doubleParseString };
