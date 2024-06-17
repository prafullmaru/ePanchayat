import json2csv from 'json2csv';

export function exportToCsv(data: any[], fileName: string) {
  if (!data || !data.length) {
    return;
  }

  const fields = Object.keys(data[0]);
  const opts = { fields };
  const parser = new json2csv.Parser(opts);
  const csvContent = parser.parse(data);

  const elementHyperLink = document.createElement('a');
  const strMimeType = 'application/octet-stream;charset=utf-8';
  const exporterOlderExcelCompatibility = false;
  let rawFile;

  if ((navigator as any).msSaveBlob) {
    return (navigator as any).msSaveOrOpenBlob(
      new Blob([exporterOlderExcelCompatibility ? '\uFEEF' : '', csvContent], {
        type: strMimeType,
      }),
      fileName,
    );
  }
  if ('download' in elementHyperLink) {
    const blob = new Blob(
      [exporterOlderExcelCompatibility ? '\uFEEF' : '', csvContent],
      { type: strMimeType },
    );
    rawFile = URL.createObjectURL(blob);
    elementHyperLink.setAttribute('download', fileName + '.csv');
  } else {
    rawFile = 'data:' + strMimeType + ',' + encodeURIComponent(csvContent);
    (elementHyperLink as any).setAttribute('target', '_blank');
  }

  elementHyperLink.href = rawFile;
  elementHyperLink.setAttribute('style', 'display:none');
  document.body.appendChild(elementHyperLink);

  setTimeout(() => {
    if (elementHyperLink.click) {
      elementHyperLink.click();
    } else if (document.createEvent) {
      const eventObj = document.createEvent('MouseEvents');
      eventObj.initEvent('click', true, true);
      elementHyperLink.dispatchEvent(eventObj);
    }
    document.body.removeChild(elementHyperLink);
  }, 100);
}
