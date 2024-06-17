export function tsvTolson(data: any) {
  const lines = data.split('\n');
  const jsonobject = [];

  const headers = lines[0].split('\t');

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split('\t');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].replace(/ /g, '')] = currentline[j];
    }
    jsonobject.push(obj);
  }
  return jsonobject;
}
